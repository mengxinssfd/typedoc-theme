import type { ReleaseType } from 'semver';
import { prompt } from 'enquirer';
import * as semver from 'semver';
import { execa } from 'execa';
import * as path from 'path';
import chalk from 'chalk';
import * as fs from 'fs';
import PkgJson from '../package.json';
import minimist from 'minimist';
import fse from 'fs-extra';

const rootDir = path.resolve(__dirname, '..');
const args = minimist(process.argv.slice(2));

const npmTool = 'pnpm';
const step = (msg: string) => console.log(chalk.cyan(msg));

/**
 * @param {string} bin
 * @param {string[]} args
 * @param {{}} opts
 */
const exec = (
  bin: string,
  args: string[],
  opts: Record<string, any> = {
    /*execPath: path.resolve(__dirname, '../')*/
  },
) => execa(bin, args, { stdio: 'inherit', ...opts });

const actions = {
  async release(config: Config) {
    async function publishPkg(pkgPath: string) {
      const json = JSON.parse(fs.readFileSync(path.resolve(pkgPath, 'package.json'), 'utf-8'));
      if (json.private) return;

      /*let releaseTag = null;
      if (config.tag) {
        releaseTag = config.tag;
      } else if (config.targetVersion.includes('alpha')) {
        releaseTag = 'alpha';
      } else if (config.targetVersion.includes('beta')) {
        releaseTag = 'beta';
      } else if (config.targetVersion.includes('rc')) {
        releaseTag = 'rc';
      }*/

      step(`Publishing ${json.name}...`);
      try {
        await exec('npm', ['publish', '--access=public'], { stdio: 'pipe', cwd: pkgPath });
        console.log(chalk.green`Successfully published ${json.name}@${config.targetVersion}`);
      } catch (e: any) {
        if (e.stderr.match(/previously published/)) {
          console.log(chalk.red`Skipping already published: ${json.name}`);
        } else {
          throw e;
        }
      }
    }
    await publishPkg(rootDir);
  },
  updateVersions(version: string) {
    function updatePackage(pkgPath: string, version: string) {
      const file = fs.readFileSync(pkgPath).toString();
      const json = JSON.parse(file);
      json.version = version;
      fs.writeFileSync(pkgPath, JSON.stringify(json, null, 2));
    }
    updatePackage(path.resolve(rootDir, 'example/package.json'), version);
    updatePackage(path.resolve(rootDir, 'package.json'), version);
  },
  async gitCommit(targetVersion: string) {
    const { stdout } = await exec('git', ['diff'], { stdio: 'pipe' });
    if (stdout) {
      step('\nCommitting changes...');
      await exec('git', ['add', '-A']);
      await exec('git', ['commit', '-m', `release: v${targetVersion}`]);
    } else {
      console.log('No changes to commit.');
    }
  },
  async gitPush(targetVersion: string) {
    // push to GitHub
    await exec('git', ['tag', `v${targetVersion}`]);
    await exec('git', ['push', 'origin', `refs/tags/v${targetVersion}`]);
    await exec('git', ['push']);
  },
  genChangeLog: () => exec(npmTool, ['changelog']),
  checkTS: () => exec(npmTool, ['ts-check']),
  build: () => exec(npmTool, ['build']),
};

interface Config {
  skippedPackages: string[];
  currentVersion: string;
  targetVersion: string;
  skipBuild: boolean;
  skipTest: boolean;
  preId: string;
  tag: string;
}
const baseConfig: Config = {
  // semver.prerelease('1.2.3-alpha.3') -> [ 'alpha', 3 ]
  preId: args.preid || semver.prerelease(PkgJson.version)?.[0],
  currentVersion: PkgJson.version,
  skipBuild: args.skipBuild,
  targetVersion: args._[0],
  skipTest: args.skipTest,
  skippedPackages: [],
  tag: args.tag,
};

const inc = (i: ReleaseType) => semver.inc(baseConfig.currentVersion, i, baseConfig.preId);

async function getVersion(preId: string, currentVersion: string) {
  let targetVersion;
  const versionIncrements: ReleaseType[] = [
    'patch',
    'minor',
    'major',
    ...(preId ? (['prepatch', 'preminor', 'premajor', 'prerelease'] as const) : []),
  ];
  const { release } = await prompt<{ release: string }>([
    {
      choices: versionIncrements
        .map<{ message: string; name: string; hint: string }>((i) => {
          const version = inc(i) as string;
          return {
            hint: 'v' + version,
            name: version,
            message: i,
          };
        })
        .concat([{ message: `custom`, name: 'custom', hint: '' }]),
      message: `选择发布版本(当前v${PkgJson.version})`,
      name: 'release',
      type: 'select',
    },
  ]);
  if (release === 'custom') {
    ({ version: targetVersion } = await prompt<{ version: string }>({
      validate(value) {
        // 校验版本号
        if (!semver.valid(value)) return `invalid version: ${value}`;
        if (semver.gte(PkgJson.version, value)) return '新版本号必须大于旧版本号';

        return true;
      },
      message: `Input custom version, cur(v${PkgJson.version}):`,
      initial: currentVersion,
      name: 'version',
      type: 'input',
    }));
  } else {
    targetVersion = release;
  }

  const { yes } = await prompt<{ yes: boolean }>({
    message: `Releasing v${targetVersion}. Confirm?`,
    type: 'confirm',
    name: 'yes',
  });

  if (!yes) {
    throw new Error(`select NO`);
  }
  return targetVersion;
}

async function getConfig() {
  const config = {
    ...baseConfig,
  };

  config.targetVersion ||= await getVersion(config.preId, config.currentVersion);

  return config;
}

async function setup() {
  console.log('start');

  const config = await getConfig();

  step('\nRunning tests...');
  if (!config.skipTest) {
    await actions.checkTS();
  } else {
    console.log(`(skipped)`);
  }

  step('\nRunning update versions...');
  await actions.updateVersions(config.targetVersion);

  step('\nRunning rm dist...');
  fse.removeSync(path.resolve(rootDir, 'dist'));

  step('\nRunning build...');
  await actions.build();

  // generate changelog
  step('\nGenerating changelog...');
  await actions.genChangeLog();

  step('\ngit commit...');
  await actions.gitCommit(config.targetVersion);

  // publish packages
  step('\nPublishing packages...');
  await actions.release(config);
  console.log(config);

  return config;
}

setup().then(
  async (config) => {
    // push to GitHub
    step('\nPushing to GitHub...');
    await actions.gitPush(config.targetVersion);
    console.log('end');
  },
  (e) => {
    console.log('error', e);
    actions.updateVersions(baseConfig.currentVersion);
  },
);

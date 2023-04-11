import { DeclarationReflection, JSX, ProjectReflection, Reflection } from 'typedoc';

/**
 * Insert word break tags ``<wbr>`` into the given string.
 *
 * Breaks the given string at ``_``, ``-`` and capital letters.
 *
 * @param str The string that should be split.
 * @return The original string containing ``<wbr>`` tags where possible.
 */
export function wbr(str: string): (string | JSX.Element)[] {
  // TODO surely there is a better way to do this, but I'm tired.
  const ret: (string | JSX.Element)[] = [];
  const re = /[\s\S]*?(?:[^_-][_-](?=[^_-])|[^A-Z](?=[A-Z][^A-Z]))/g;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = re.exec(str))) {
    ret.push(match[0], <wbr />);
    i += match[0].length;
  }
  ret.push(str.slice(i));

  return ret;
}

export function classNames(names: Record<string, boolean | null | undefined>, extraCss?: string) {
  const css = Object.keys(names)
    .filter((key) => names[key])
    .concat(extraCss || '')
    .join(' ')
    .trim()
    .replace(/\s+/g, ' ');
  return css.length ? css : undefined;
}

export function getComment(model: DeclarationReflection) {
  const comment = model.comment || model.signatures?.[0].comment;
  const summary = comment?.summary;
  if (!summary || !summary.length) return '';

  const content = [];
  for (const line of summary) {
    const lineText = line.text;
    content.push(lineText.trim());
  }
  const textContent = content.join(' ');
  const commentContent = textContent.split(/[\r\n]/)[0] ?? textContent;
  const parsedCommentContent = commentContent
    .replace(/\s,\s/g, ', ')
    .replace(/\s\./g, '.')
    .replace(/(:\s?)?```(tsx?)?$/, '')
    .replace(/^#\s*/, '')
    .replace(/^\[([^\]]+)$/, '$1');
  return parsedCommentContent
    ? JSX.createElement('div', { class: 'menu-item-desc' }, parsedCommentContent)
    : '';
}

export function getReadme(model: DeclarationReflection) {
  const readme = model.readme?.[0]?.text.split(/(\r?\n)+/)[0].replace(/#+\s*/, '');
  return readme ? <div class="menu-item-desc">{readme}</div> : '';
}

export function getDisplayName(refl: Reflection) {
  let version = '';
  if (
    (refl instanceof DeclarationReflection || refl instanceof ProjectReflection) &&
    refl.packageVersion
  ) {
    version = ` - v${refl.packageVersion}`;
  }

  return `${refl.name}${version}`;
}

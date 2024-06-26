import { cpSync } from 'fs';
import { resolve } from 'path';
import { MyTheme } from './MyTheme';
import { Application, JSX, RendererEvent } from 'typedoc';

/**
 * Called by TypeDoc when loading this theme as a plugin. Should be used to define themes which
 * can be selected by the user.
 */
export function load(app: Application) {
  // Hooks can be used to inject some HTML without fully overwriting the theme.
  app.renderer.hooks.on('body.begin', (_) => (
    <script>
      <JSX.Raw html="console.log(`Loaded ${location.href}`)" />
    </script>
  ));
  app.renderer.on(RendererEvent.END, () => {
    const from = resolve(__dirname, '../assets/style.css');
    const to = resolve(app.options.getValue('out'), 'assets/my-theme.css');
    cpSync(from, to);
  });
  app.renderer.defineTheme('my-theme', MyTheme);
}

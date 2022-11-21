import { Application, JSX } from 'typedoc';
import { MyTheme } from './MyTheme';

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
  app.renderer.defineTheme('my-theme', MyTheme);
}

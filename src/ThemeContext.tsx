import { DefaultTheme, DefaultThemeRenderContext, JSX, Options } from 'typedoc';
import * as templates from './templates';

type Template = (context: DefaultThemeRenderContext, model: any) => JSX.Element | void;

function bind<T>(template: Template, context: ThemeContext) {
  return (model: any) => template(context, model);
}

export class ThemeContext extends DefaultThemeRenderContext {
  constructor(theme: DefaultTheme, options: Options) {
    super(theme, options);

    for (const [key, tpl] of Object.entries(templates)) {
      this[key as keyof ThemeContext] = bind(tpl, this) as any;
    }
  }
}

import { DefaultThemeRenderContext, JSX, PageEvent, Reflection } from 'typedoc';
import * as Fs from 'fs';
import * as Path from 'path';
const style = Fs.readFileSync(Path.resolve(__dirname, '../../assets/style.css')).toString();

export const defaultLayout = (context: DefaultThemeRenderContext, props: PageEvent<Reflection>) => (
  <html class="default" lang={context.options.getValue('htmlLang')}>
    <head>
      <meta charSet="utf-8" />
      {context.hook('head.begin')}
      <meta http-equiv="x-ua-compatible" content="IE=edge" />
      <title>
        {props.model.name === props.project.name
          ? props.project.name
          : `${props.model.name} | ${props.project.name}`}
      </title>
      <meta name="description" content={'Documentation for ' + props.project.name} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="stylesheet" href={context.relativeURL('assets/style.css')} />
      <link rel="stylesheet" href={context.relativeURL('assets/highlight.css')} />
      {context.options.getValue('customCss') && (
        <link rel="stylesheet" href={context.relativeURL('assets/custom.css')} />
      )}
      <style>
        <JSX.Raw html={style} />
      </style>
      <script async src={context.relativeURL('assets/search.js')} id="search-script"></script>
      {context.hook('head.end')}
    </head>
    <body>
      {context.hook('body.begin')}
      <script>
        <JSX.Raw html='document.documentElement.dataset.theme = localStorage.getItem("tsd-theme") || "os"' />
      </script>
      {context.toolbar(props)}

      <div class="container container-main">
        <div class="col-menu menu-sticky-wrap menu-highlight">
          {context.hook('navigation.begin')}
          {context.navigation(props)}
          {context.hook('navigation.end')}
        </div>
        <div class="col-content">
          {context.hook('content.begin')}
          {context.header(props)}
          {props.template(props)}
          {context.hook('content.end')}
        </div>
      </div>

      {/*{context.footer()}*/}

      <div class="overlay"></div>
      <script src={context.relativeURL('assets/main.js')}></script>

      {context.analytics()}
      {context.hook('body.end')}
    </body>
  </html>
);

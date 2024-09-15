import {
  ContainerReflection,
  DefaultThemeRenderContext,
  JSX,
  PageEvent,
  Reflection,
  RenderTemplate,
} from 'typedoc';
import { classNames, getDisplayName } from './utils';

export const defaultLayout = (
  context: DefaultThemeRenderContext,
  template: RenderTemplate<PageEvent<Reflection>>,
  props: PageEvent<ContainerReflection>,
) => {
  return (
    <html class="default" lang={context.options.getValue('lang')}>
      <head>
        <meta charset="utf-8" />
        {context.hook('head.begin', context)}
        <meta http-equiv="x-ua-compatible" content="IE=edge" />
        <title>
          {props.model.isProject()
            ? getDisplayName(props.model)
            : `${getDisplayName(props.model)} | ${getDisplayName(props.project)}`}
        </title>
        <meta name="description" content={'Documentation for ' + props.project.name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="stylesheet" href={context.relativeURL('assets/style.css', true)} />
        <link rel="stylesheet" href={context.relativeURL('assets/highlight.css', true)} />
        <link rel="stylesheet" href={context.relativeURL('assets/my-theme.css')} />
        {context.options.getValue('customCss') && (
          <link rel="stylesheet" href={context.relativeURL('assets/custom.css', true)} />
        )}
        <script defer src={context.relativeURL('assets/main.js', true)}></script>
        <script
          async
          src={context.relativeURL('assets/icons.js', true)}
          id="tsd-icons-script"
        ></script>
        <script
          async
          src={context.relativeURL('assets/search.js', true)}
          id="tsd-search-script"
        ></script>
        <script
          async
          src={context.relativeURL('assets/navigation.js', true)}
          id="tsd-nav-script"
        ></script>
        {context.hook('head.end', context)}
      </head>
      <body>
        {context.hook('body.begin', context)}
        <script>
          <JSX.Raw html='document.documentElement.dataset.theme = localStorage.getItem("tsd-theme") || "os"' />
        </script>
        {context.toolbar(props)}

        <div
          class={classNames({
            container: true,
            'container-main': true,
          })}
        >
          <div class="col-content">
            {context.hook('content.begin', context)}
            {context.header(props)}
            {template(props)}
            {context.hook('content.end', context)}
          </div>
          <div class="col-sidebar">
            <div class="page-menu">
              {context.hook('pageSidebar.begin', context)}
              {context.pageSidebar(props)}
              {context.hook('pageSidebar.end', context)}
            </div>
            <div class="site-menu">
              {context.hook('sidebar.begin', context)}
              {context.sidebar(props)}
              {context.hook('sidebar.end', context)}
            </div>
          </div>
        </div>

        {context.footer()}

        <div class="overlay"></div>

        {/*{context.analytics()}*/}
        {/*{context.iconsCache()}*/}
        {context.hook('body.end', context)}
      </body>
    </html>
  );
};

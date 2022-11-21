import { DefaultThemeRenderContext, JSX } from 'typedoc';

export function sidebarLinks(context: DefaultThemeRenderContext) {
  const links = Object.entries(context.options.getValue('sidebarLinks'));
  if (!links.length) return null;
  console.log('ccccc', context);
  return (
    <nav id="tsd-sidebar-links" class="tsd-navigation">
      {links.map(([label, url]) => (
        <a href={url} target="_blank">
          {label}
        </a>
      ))}
    </nav>
  );
}

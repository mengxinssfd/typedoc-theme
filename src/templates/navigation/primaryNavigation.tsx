import {
  DeclarationReflection,
  DefaultThemeRenderContext,
  JSX,
  PageEvent,
  Reflection,
  ReflectionKind,
} from 'typedoc';
import { classNames, inPath, wbr, partition, getComment, getReadme } from './utils';
export function primaryNavigation(
  context: DefaultThemeRenderContext,
  props: PageEvent<DeclarationReflection>,
) {
  // Create the navigation for the current page

  const modules = props.model.project.getChildrenByKind(ReflectionKind.SomeModule);
  const [ext, int] = partition(modules, (m) => m.flags.isExternal);

  const selected = props.model.isProject();
  const current = selected || int.some((mod) => inPath(mod, props.model));

  function link(mod: DeclarationReflection, fn: typeof getReadme | typeof getComment = getComment) {
    const current = inPath(mod, props.model);
    const selected = mod.name === props.model.name;
    let childNav: JSX.Element | undefined;
    const childModules = mod.children?.filter((m) => m.kindOf(ReflectionKind.SomeModule));
    if (childModules?.length) {
      childNav = <ul>{childModules.map((it) => link(it))}</ul>;
    }

    return (
      <li class={classNames({ current, selected, deprecated: mod.isDeprecated() }, mod.cssClasses)}>
        <a href={context.urlTo(mod)}>
          <div>
            {wbr(`${mod.name}${mod.version !== undefined ? ` - v${mod.version}` : ''}`)}
            {fn(mod)}
          </div>
        </a>
        {childNav}
      </li>
    );
  }

  // const comment = props.model.comment || props.model.signatures?.[0].comment
  // console.log(child.comment?.summary?.[0]?.text.split(/(\r\n)+/));
  // const commentContent = comment?.summary?.[0]?.text.split(/(\r\n)+/)[0];

  return (
    <nav class="tsd-navigation primary">
      <details class="tsd-index-accordion" open={true}>
        <summary class="tsd-accordion-summary">
          <h3>{context.icons.chevronDown()} Modules</h3>
        </summary>
        <div class="tsd-accordion-details">
          <ul class="modules">
            <li class={classNames({ current, selected }) + 'module'}>
              <a href={context.urlTo(props.model.project)}>{wbr(props.project.name)}</a>
              <ul>{int.map((i) => link(i, getReadme))}</ul>
            </li>
            {ext.map((i) => link(i))}
          </ul>
        </div>
      </details>
    </nav>
  );
}

import {
  DeclarationReflection,
  DefaultThemeRenderContext,
  JSX,
  PageEvent,
  ProjectReflection,
  Reflection,
  ReflectionKind,
} from 'typedoc';

import { classNames, getComment, getDisplayName, getReadme, wbr } from '../utils';

export function navigation(context: DefaultThemeRenderContext, props: PageEvent<Reflection>) {
  // Create the navigation for the current page
  // Recurse to children if the parent is some kind of module

  return (
    <nav class="tsd-navigation">
      {link(props.project)}
      <ul class="tsd-small-nested-navigation">
        {props.project.children?.map((c) => <li>{links(c)}</li>)}
      </ul>
    </nav>
  );

  function links(mod: DeclarationReflection) {
    const children =
      (mod.kindOf(ReflectionKind.SomeModule | ReflectionKind.Project) && mod.children) || [];

    const nameClasses = classNames(
      { deprecated: mod.isDeprecated() },
      mod.isProject() ? void 0 : context.getReflectionClasses(mod),
    );

    if (!children.length) {
      return link(mod, getComment, nameClasses);
    }

    return (
      <details
        class={classNames({ 'tsd-index-accordion': true }, nameClasses)}
        open={inPath(mod)}
        data-key={mod.getFullName()}
      >
        <summary class="tsd-accordion-summary">
          {context.icons.chevronDown()}
          {link(mod)}
        </summary>
        <div class="tsd-accordion-details">
          <ul class="tsd-nested-navigation">
            {children.map((c) => (
              <li>{links(c)}</li>
            ))}
          </ul>
        </div>
      </details>
    );
  }

  function link(
    child: DeclarationReflection | ProjectReflection,
    fn: typeof getReadme | typeof getComment = getComment,
    nameClasses?: string,
  ) {
    let sectionName: string;
    if (child.kind === ReflectionKind.Module) {
      const splitPath = getDisplayName(child).split('/');
      sectionName = KebabToCamel(splitPath[splitPath.length - 1]);
    } else {
      sectionName = getDisplayName(child);
    }

    return (
      <a
        href={context.urlTo(child)}
        class={classNames({ current: child === props.model }, nameClasses)}
      >
        {context.icons[child.kind]()}
        <div>
          {wbr(sectionName)}
          {fn(child as DeclarationReflection)}
        </div>
      </a>
    );
  }

  function inPath(mod: DeclarationReflection | ProjectReflection) {
    let iter: Reflection | undefined = props.model;
    do {
      if (iter == mod) return true;
      iter = iter.parent;
    } while (iter);
    return false;
  }

  function KebabToCamel(str: string): string {
    let arr = str.split('-');
    let capital = arr.map((item, index) =>
      index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase(),
    );
    // ^-- change here.
    let capitalString = capital.join('');

    return capitalString[0].toUpperCase() + capitalString.slice(1);
  }
}

import {
  ContainerReflection,
  DefaultThemeRenderContext,
  PageEvent,
  DeclarationReflection,
  ReflectionKind,
  JSX,
} from 'typedoc';
import { classNames, renderName, getComment } from './utils';

export function secondaryNavigation(
  context: DefaultThemeRenderContext,
  props: PageEvent<DeclarationReflection>,
) {
  // Multiple entry points, and on main project page.
  if (props.model.isProject() && props.model.getChildrenByKind(ReflectionKind.Module).length) {
    return;
  }

  const effectivePageParent =
    (props.model instanceof ContainerReflection && props.model.children?.length) ||
    props.model.isProject()
      ? props.model
      : props.model.parent!;

  const children = (effectivePageParent as ContainerReflection).children || [];

  const pageNavigation = children
    .filter((child) => !child.kindOf(ReflectionKind.SomeModule))
    .map((child) => {
      return (
        <li
          class={classNames(
            { deprecated: child.isDeprecated(), current: props.model === child },
            child.cssClasses,
          )}
        >
          <a href={context.urlTo(child)} class="tsd-index-link">
            {context.icons[child.kind]()}
            <div>
              {renderName(child)}
              {getComment(child)}
            </div>
          </a>
        </li>
      );
    });

  if (effectivePageParent.kindOf(ReflectionKind.SomeModule | ReflectionKind.Project)) {
    return (
      <nav class="tsd-navigation secondary menu-sticky">
        {!!pageNavigation.length && <ul>{pageNavigation}</ul>}
      </nav>
    );
  }

  return (
    <nav class="tsd-navigation secondary menu-sticky">
      <ul>
        <li
          class={classNames(
            {
              deprecated: effectivePageParent.isDeprecated(),
              current: effectivePageParent === props.model,
            },
            effectivePageParent.cssClasses,
          )}
        >
          <a href={context.urlTo(effectivePageParent)} class="tsd-index-link">
            {context.icons[effectivePageParent.kind]()}
            <div>
              {renderName(effectivePageParent)}
              {getComment(props.model)}
            </div>
          </a>
          {!!pageNavigation.length && <ul>{pageNavigation}</ul>}
        </li>
      </ul>
    </nav>
  );
}

import { DefaultThemeRenderContext, JSX, PageEvent, Reflection } from 'typedoc';
import { wbr } from '../utils';

export function pageNavigation(context: DefaultThemeRenderContext, props: PageEvent<Reflection>) {
  const levels: JSX.Element[][] = [[]];

  function finalizeLevel() {
    const built = (
      <ul>
        {levels.pop()!.map((l) => (
          <li>{l}</li>
        ))}
      </ul>
    );
    levels[levels.length - 1].push(built);
  }

  for (const heading of props.pageHeadings) {
    const inferredLevel = heading.level ? heading.level + 1 : 1;
    while (inferredLevel < levels.length) {
      finalizeLevel();
    }
    if (inferredLevel > levels.length) {
      // Lower level than before
      levels.push([]);
    }

    levels[levels.length - 1].push(
      <a href={heading.link} class={heading.classes}>
        {heading.kind && context.icons[heading.kind]()}
        <span>{wbr(heading.text)}</span>
      </a>
    );
  }

  while (levels.length > 1) {
    finalizeLevel();
  }

  if (!levels[0].length) {
    return <></>;
  }

  return (
    <details open={true} class="tsd-index-accordion tsd-page-navigation">
      <summary class="tsd-accordion-summary">
        <h3>
          {context.icons.chevronDown()}
          On This Page
        </h3>
      </summary>
      <div class="tsd-accordion-details">
        <ul>
          {levels[0].map((l) => (
            <li>{l}</li>
          ))}
        </ul>
      </div>
    </details>
  );
}

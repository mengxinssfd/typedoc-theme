import {
  DefaultThemeRenderContext,
  JSX
} from 'typedoc'

function camelToTitleCase(text: string) {
  return (
    text.substring(0, 1).toUpperCase() +
    text.substring(1).replace(/[a-z][A-Z]/g, (x) => `${x[0]} ${x[1]}`)
  );
}
function buildFilterItem(
  context: DefaultThemeRenderContext,
  name: string,
  displayName: string,
  defaultValue: boolean,
) {
  return (
    <li class="tsd-filter-item">
      <label class="tsd-filter-input">
        <input type="checkbox" id={`tsd-filter-${name}`} name={name} checked={defaultValue} />
        {context.icons.checkbox()}
        <span>{displayName}</span>
      </label>
    </li>
  );
}
export function settings(context: DefaultThemeRenderContext) {
  const defaultFilters = context.options.getValue('visibilityFilters') as Record<string, boolean>;

  const visibilityOptions: JSX.Element[] = [];

  for (const key of Object.keys(defaultFilters)) {
    if (key.startsWith('@')) {
      const filterName = key
        .substring(1)
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase();

      visibilityOptions.push(
        buildFilterItem(
          context,
          filterName,
          camelToTitleCase(key.substring(1)),
          defaultFilters[key],
        ),
      );
    } else if (
      (key === 'protected' && !context.options.getValue('excludeProtected')) ||
      (key === 'private' && !context.options.getValue('excludePrivate')) ||
      (key === 'external' && !context.options.getValue('excludeExternals')) ||
      key === 'inherited'
    ) {
      visibilityOptions.push(
        buildFilterItem(context, key, camelToTitleCase(key), defaultFilters[key]),
      );
    }
  }

  // Settings panel above navigation

  return (
    <div class="tsd-navigation settings">
      <details class="tsd-index-accordion" open={false}>
        <summary class="tsd-accordion-summary">
          <h3>
            {context.icons.chevronDown()}
            SET
          </h3>
        </summary>
        <div class="tsd-accordion-details">
          {visibilityOptions.length && (
            <div class="tsd-filter-visibility">
              <h4 class="uppercase">Member Visibility</h4>
              <form>
                <ul id="tsd-filter-options">{...visibilityOptions}</ul>
              </form>
            </div>
          )}
          <div class="tsd-theme-toggle">
            <h4 class="uppercase">Theme</h4>
            <select id="tsd-theme">
              <option value="os">OS</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </details>
    </div>
  );
}

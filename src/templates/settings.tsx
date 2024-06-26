import { DefaultThemeRenderContext, JSX, ReflectionFlag } from 'typedoc';

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
const flagOptionNameToReflectionFlag = {
  protected: ReflectionFlag.Protected,
  private: ReflectionFlag.Private,
  external: ReflectionFlag.External,
  inherited: ReflectionFlag.Inherited,
};

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
          context.internationalization.translateTagName(key as `@${string}`),
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
        buildFilterItem(
          context,
          key,
          context.internationalization.flagString(flagOptionNameToReflectionFlag[key]),
          defaultFilters[key],
        ),
      );
    }
  }

  // Settings panel above navigation

  return (
    <div class="tsd-navigation settings">
      <details class="tsd-accordion" open={false}>
        <summary class="tsd-accordion-summary">
          <h3>
            {context.i18n.theme_settings()}
            {context.icons.chevronDown()}
          </h3>
        </summary>
        <div class="tsd-accordion-details">
          {visibilityOptions.length && (
            <div class="tsd-filter-visibility">
              <span class="settings-label">{context.i18n.theme_member_visibility()}</span>
              <ul id="tsd-filter-options">{...visibilityOptions}</ul>
            </div>
          )}
          <div class="tsd-theme-toggle">
            <label class="settings-label" for="tsd-theme">
              {context.i18n.theme_theme()}
            </label>
            <select id="tsd-theme">
              <option value="os">{context.i18n.theme_os()}</option>
              <option value="light">{context.i18n.theme_light()}</option>
              <option value="dark">{context.i18n.theme_dark()}</option>
            </select>
          </div>
        </div>
      </details>
    </div>
  );
}

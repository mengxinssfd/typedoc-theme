import {DefaultThemeRenderContext, JSX, PageEvent, Reflection} from "typedoc";

export function navigation(context: DefaultThemeRenderContext, props: PageEvent<Reflection>) {
    return (
        <>
            {context.sidebarLinks()}
            {/*{context.settings()}*/}
            {context.primaryNavigation(props)}
            {context.secondaryNavigation(props)}
        </>
    );
}
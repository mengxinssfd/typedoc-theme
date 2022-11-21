export const style = `
@media (min-width: 1024px) {
  .col-menu {
    border-left: 0;
    border-right: 1px solid var(--color-accent);
  }
}
.container {
  padding: 0 2rem;
}
.col-menu {
  flex: 0 0 14rem;
}
.container-main {
  padding: 2.5rem 0 0;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
}
.menu-sticky-wrap {

}
.tsd-navigation.settings
.tsd-accordion-details {
  padding: 1rem;
  background: var(--color-background);
}
.tsd-navigation.settings {
  display: inline-block;
  vertical-align: top;
}
.tsd-navigation.settings
.tsd-index-accordion {
  position: relative;
}
.tsd-navigation.settings
.tsd-accordion-summary {
  display: inline-flex;
  vertical-align: top;
  align-items: center;
  margin-left: 1rem;
}
.col-menu,.col-content  {
  margin-top: 0;
}
.col-content {
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  overflow-x: hidden;
  flex: 1;
}
.menu-item-desc {
  color: #5d5d5d;
  font-size: 12px;
  line-height: 1.26;
  font-weight: normal;
}

:root[data-theme="dark"] .menu-item-desc {
  color: #989898;
}

a.tsd-index-link {
  align-items: flex-start;
}
`;

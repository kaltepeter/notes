# Notes — Project Guide

## Tech Stack

- **Framework**: Gatsby 5 (SSG/SSR)
- **UI**: MUI (Material UI) v9
- **Styling**: MUI `styled` from `@mui/material/styles`
- **Language**: TypeScript (strict mode)
- **Content**: Markdown via `gatsby-transformer-remark`

## Decision: Styling with MUI `styled`

All component styles use MUI's `styled` utility. The `sx` prop is reserved for
simple one-off overrides that don't merit a name.

### Why `styled` over `sx`

The `sx` prop inlines style objects directly on JSX elements, which makes
components hard to read at a glance — the structure and the presentation are
mixed together. `styled` keeps styles defined separately at the top of the file
under descriptive names, which reads closer to how CSS is written.

### Rules

**Use `styled` for:**
- Any block of styles with 2+ properties
- Styles that depend on the MUI theme (`theme.spacing`, `theme.palette`, `theme.breakpoints`)
- Styles that depend on component props (use `shouldForwardProp` to prevent custom props from reaching the DOM)
- Any style that deserves a semantic name

**Use `sx` only for:**
- Truly one-off single-property overrides (e.g. `sx={{ marginRight: 2 }}` on an icon button)

**Never use:**
- Inline `style={{}}` for anything theme-dependent
- The `tss-react` package (removed — incompatible with MUI v9)

### Patterns

**Basic:**
```tsx
const NoteHeader = styled(Box)({
  display: "flex",
  flexDirection: "column",
});
```

**With theme access:**
```tsx
const Footer = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    marginLeft: `${DRAWER_WIDTH}px`,
  },
}));
```

**With component props** — use `shouldForwardProp` to keep custom props out of the DOM:
```tsx
const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "drawerWidth" && prop !== "scrolled",
})<{ drawerWidth: number; scrolled: boolean }>(({ theme, drawerWidth, scrolled }) => ({
  [theme.breakpoints.up("sm")]: {
    marginLeft: `${drawerWidth}px`,
    width: scrolled ? "200px" : `calc(100% - ${drawerWidth}px)`,
  },
}));
```

**Semantic HTML elements** — style `"nav"`, `"main"`, `"footer"`, `"ul"` etc. directly
rather than using `Box` with a `component` prop. This avoids a TypeScript conflict
between MUI styled component types and the polymorphic `component` prop:
```tsx
// Prefer this:
const NavContainer = styled("nav")(({ theme }) => ({ ... }));

// Over this (causes TS errors with custom props):
const NavContainer = styled(Box)(...);
<NavContainer component="nav" />
```

**Baking in a `component` prop** — when you need a MUI component to render as a
different element and also need custom styling, wrap it in a functional component
to bake in the `component` prop before styling:
```tsx
const TagChip = styled((props: React.ComponentProps<typeof Chip>) => (
  <Chip component="span" {...props} />
))({ border: "none", borderRadius: 0 });
```

## Dependency Notes

- **`tss-react` is removed.** It does not support MUI v9. Do not re-add it.
- **`npm install` may show peer dependency warnings** from Gatsby's internal
  dependencies (e.g. `@gatsbyjs/reach-router` declaring `react@18.x`). These are
  auto-overridden by npm and do not indicate a real problem — Gatsby 5.16+ supports
  React 19.
- **Do not add an `.npmrc` with `legacy-peer-deps`.** The warnings above are not
  errors. If a true peer conflict blocks install, fix the dependency, don't mask it.

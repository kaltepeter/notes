import { Theme } from "@mui/material/styles"

declare module "*css" {
  const content: { [className: string]: string }
  export default content
}

declare module "*.svg" {
  import React = require("react")
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module "*.ttf" {
  const content: { [className: string]: string }
  export default content
}

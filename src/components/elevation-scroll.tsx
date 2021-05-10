import { useScrollTrigger } from "@material-ui/core"
import React, { ReactElement } from "react"

interface ElevationScrollProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
  children: React.ReactElement
}

// https://material-ui.com/components/app-bar/#elevate-app-bar
const ElevationScroll = ({ children, window }: ElevationScrollProps): ReactElement => {
  const trigger = useScrollTrigger({
    disableHysteresis: false,
    threshold: 40,
    target: window ? window() : undefined,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

export default ElevationScroll

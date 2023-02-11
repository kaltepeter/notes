import { red, grey } from "@mui/material/colors"
import { createTheme, alpha, responsiveFontSizes, adaptV4Theme } from "@mui/material/styles";

const merriweatherBase = {
  fontFamily: "'Merriweather', serif",
}

const merriweather = {
  blackItalic: {
    ...merriweatherBase,
    fontWeight: 900,
    fontStyle: "italic",
  },
  boldItalic: {
    ...merriweatherBase,
    fontWeight: 700,
    fontStyle: "italic",
  },
  regular: {
    ...merriweatherBase,
    fontWeight: 400,
  },
}

const libreFranklinBase = {
  fontFamily: "'Libre Franklin', sans-serif",
}

const libreFranklin = {
  light: {
    ...libreFranklinBase,
    fontWeight: 300,
  },
  regular: {
    ...libreFranklinBase,
    fontWeight: 400,
  },
  medium: {
    ...libreFranklinBase,
    fontWeight: 500,
  },
  bold: {
    ...libreFranklinBase,
    fontWeight: 700,
  },
}

const bodyBase = {
  ...merriweather.regular,
  fontSize: "16px",
}

const typography = {
  h1: {
    ...merriweather.blackItalic,
    fontSize: "6rem",
  },
  h2: {
    ...libreFranklin.light,
    fontSize: "3.75rem",
  },
  h3: {
    ...merriweather.blackItalic,
    fontSize: "3rem",
  },
  h4: {
    ...libreFranklin.regular,
    fontSize: "2.125rem",
  },
  h5: {
    ...libreFranklin.regular,
    fontSize: "1.5rem",
  },
  h6: {
    ...merriweather.boldItalic,
    fontSize: "1.25rem",
  },
  body1: {
    ...bodyBase,
  },
  body2: {
    ...libreFranklin.regular,
    fontSize: ".875rem",
  },
  subtitle1: {
    ...libreFranklin.medium,
    fontSize: "1rem",
  },
  subtitle2: {
    ...merriweather.regular,
    fontSize: ".875rem",
  },
  button: {
    ...libreFranklin.bold,
    fontSize: ".875rem",
  },
  caption: {
    ...merriweather.regular,
    fontSize: ".75rem",
    fontStyle: "italic",
  },
  overline: {
    ...libreFranklin.bold,
    fontSize: ".625rem",
  },
}

const baseSpacing = createTheme();

const labOverrides = {
  MuiTreeItem: {
    content: {
      padding: baseSpacing.spacing(1)
    },
    label: {
      ...typography.h5,
      color: grey[900]
    },
    group: {
      '& .MuiTreeItem-label': {
      color: grey[700]
      }
    }
  },
};

// A custom theme for this app
const baseTheme = createTheme(adaptV4Theme({
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      main: "#6b38fb",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    }
  },
  overrides: {
    // TODO: why both Typography and global css baseline override needed?
    MuiTypography: {
      ...typography,
    },
    MuiCssBaseline: {
      "@global": {
        body: {
          ...bodyBase,
        },
        ...typography,
      },
    },
    MuiButton: {
      root: {
        ...typography.button,
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: alpha(grey[50], .5),
      },
    },
    ...labOverrides,
  },

}));

const theme = responsiveFontSizes(baseTheme)

export default theme

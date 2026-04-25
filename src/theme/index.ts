import { alpha, createTheme } from "@mui/material/styles";

// Palette from frontend.md
const palette = {
  primary: "#6366F1",
  primaryHover: "#4F46E5",
  secondary: "#10B981",
  error: "#EF4444",
  background: "#FFFFFF",
  surface: "#F9FAFB",
  border: "#E5E7EB",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
};

declare module "@mui/material/styles" {
  interface Palette {
    surface: Palette["primary"];
  }
  interface PaletteOptions {
    surface?: PaletteOptions["primary"];
  }
  interface TypographyVariants {
    mono: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    mono?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    mono: true;
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: palette.primary,
      dark: palette.primaryHover,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: palette.secondary,
      contrastText: "#FFFFFF",
    },
    error: {
      main: palette.error,
    },
    background: {
      default: palette.background,
      paper: palette.background,
    },
    surface: {
      main: palette.surface,
      contrastText: palette.textPrimary,
    },
    text: {
      primary: palette.textPrimary,
      secondary: palette.textSecondary,
    },
    divider: palette.border,
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "\"Inter\", system-ui, -apple-system, sans-serif",
    fontSize: 14,
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, letterSpacing: "-0.01em" },
    h4: { fontWeight: 600, letterSpacing: "-0.01em" },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.6 },
    button: { fontWeight: 600, textTransform: "none" },
    mono: {
      fontFamily: "\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, monospace",
      fontSize: "0.8125rem",
    },
  },
  shadows: [
    "none",
    "0 1px 3px rgba(0,0,0,0.04)",
    "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
    "0 2px 6px rgba(0,0,0,0.05)",
    "0 4px 10px rgba(0,0,0,0.06)",
    "0 6px 16px rgba(0,0,0,0.07)",
    "0 8px 20px rgba(0,0,0,0.08)",
    "0 10px 24px rgba(0,0,0,0.09)",
    "0 12px 28px rgba(0,0,0,0.10)",
    "0 14px 32px rgba(0,0,0,0.11)",
    "0 16px 36px rgba(0,0,0,0.12)",
    "0 18px 40px rgba(0,0,0,0.13)",
    "0 20px 44px rgba(0,0,0,0.14)",
    "0 22px 48px rgba(0,0,0,0.15)",
    "0 24px 52px rgba(0,0,0,0.16)",
    "0 26px 56px rgba(0,0,0,0.17)",
    "0 28px 60px rgba(0,0,0,0.18)",
    "0 30px 64px rgba(0,0,0,0.19)",
    "0 32px 68px rgba(0,0,0,0.20)",
    "0 34px 72px rgba(0,0,0,0.21)",
    "0 36px 76px rgba(0,0,0,0.22)",
    "0 38px 80px rgba(0,0,0,0.23)",
    "0 40px 84px rgba(0,0,0,0.24)",
    "0 42px 88px rgba(0,0,0,0.25)",
    "0 44px 92px rgba(0,0,0,0.26)",
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: palette.background,
          color: palette.textPrimary,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        "code, kbd, samp, pre": {
          fontFamily: "\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, monospace",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 16,
          paddingBlock: 8,
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            boxShadow: `0 1px 2px ${alpha(palette.primary, 0.3)}, 0 0 0 1px ${alpha(palette.primary, 0.15)}`,
            "&:hover": {
              backgroundColor: palette.primaryHover,
              boxShadow: `0 2px 6px ${alpha(palette.primary, 0.35)}, 0 0 0 1px ${alpha(palette.primary, 0.2)}`,
            },
          },
        },
      ],
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        outlined: {
          borderColor: palette.border,
        },
      },
    },
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: palette.background,
        },
        notchedOutline: {
          borderColor: palette.border,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: palette.textPrimary,
          fontSize: 12,
          borderRadius: 8,
          paddingInline: 10,
          paddingBlock: 6,
        },
        arrow: {
          color: palette.textPrimary,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: palette.border,
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          mono: "span",
        },
      },
    },
  },
});

export const gradients = {
  brand: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.secondary} 100%)`,
};

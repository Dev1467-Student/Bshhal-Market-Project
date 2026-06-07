/**
 * Design System — Tailwind CSS token map
 *
 * Every value is a Tailwind utility class (or a tuple of classes) so
 * components can spread / apply them directly without hard-coding raw
 * CSS values.
 */

// ---------------------------------------------------------------------------
// Color tokens
// ---------------------------------------------------------------------------

export const colors = {
  // Neutrals
  black: "text-black",
  white: "text-white",

  gray: {
    50:  "text-gray-50",
    100: "text-gray-100",
    200: "text-gray-200",
    300: "text-gray-300",
    400: "text-gray-400",
    500: "text-gray-500",
    600: "text-gray-600",
    700: "text-gray-700",
    800: "text-gray-800",
    900: "text-gray-900",
    950: "text-gray-950",
  },

  // Background variants (bg-* equivalents)
  bg: {
    black:  "bg-black",
    white:  "bg-white",
    gray: {
      50:  "bg-gray-50",
      100: "bg-gray-100",
      200: "bg-gray-200",
      300: "bg-gray-300",
      400: "bg-gray-400",
      500: "bg-gray-500",
      600: "bg-gray-600",
      700: "bg-gray-700",
      800: "bg-gray-800",
      900: "bg-gray-900",
      950: "bg-gray-950",
    },
  },

  // Border variants (border-* equivalents)
  border: {
    black:  "border-black",
    white:  "border-white",
    gray: {
      50:  "border-gray-50",
      100: "border-gray-100",
      200: "border-gray-200",
      300: "border-gray-300",
      400: "border-gray-400",
      500: "border-gray-500",
      600: "border-gray-600",
      700: "border-gray-700",
      800: "border-gray-800",
      900: "border-gray-900",
      950: "border-gray-950",
    },
  },
} as const;

// ---------------------------------------------------------------------------
// Typography scale
// ---------------------------------------------------------------------------

/** Font-size utilities */
export const fontSize = {
  xs:   "text-xs",    // 0.75 rem  / 12 px
  sm:   "text-sm",    // 0.875 rem / 14 px
  base: "text-base",  // 1 rem     / 16 px
  lg:   "text-lg",    // 1.125 rem / 18 px
  xl:   "text-xl",    // 1.25 rem  / 20 px
  "2xl": "text-2xl",  // 1.5 rem   / 24 px
  "3xl": "text-3xl",  // 1.875 rem / 30 px
  "4xl": "text-4xl",  // 2.25 rem  / 36 px
  "5xl": "text-5xl",  // 3 rem     / 48 px
  "6xl": "text-6xl",  // 3.75 rem  / 60 px
  "7xl": "text-7xl",  // 4.5 rem   / 72 px
  "8xl": "text-8xl",  // 6 rem     / 96 px
  "9xl": "text-9xl",  // 8 rem     / 128 px
} as const;

/** Font-weight utilities */
export const fontWeight = {
  thin:       "font-thin",       // 100
  extralight: "font-extralight", // 200
  light:      "font-light",      // 300
  normal:     "font-normal",     // 400
  medium:     "font-medium",     // 500
  semibold:   "font-semibold",   // 600
  bold:       "font-bold",       // 700
  extrabold:  "font-extrabold",  // 800
  black:      "font-black",      // 900
} as const;

/** Letter-spacing (tracking) utilities */
export const tracking = {
  tighter: "tracking-tighter", // -0.05 em
  tight:   "tracking-tight",   // -0.025 em
  normal:  "tracking-normal",  //  0 em
  wide:    "tracking-wide",    //  0.025 em
  wider:   "tracking-wider",   //  0.05 em
  widest:  "tracking-widest",  //  0.1 em
} as const;

/** Line-height (leading) utilities */
export const leading = {
  none:     "leading-none",     // 1
  tight:    "leading-tight",    // 1.25
  snug:     "leading-snug",     // 1.375
  normal:   "leading-normal",   // 1.5
  relaxed:  "leading-relaxed",  // 1.625
  loose:    "leading-loose",    // 2
} as const;

/** Convenience typography presets */
export const typography = {
  fontSize,
  fontWeight,
  tracking,
  leading,
} as const;

// ---------------------------------------------------------------------------
// Spacing scale
// ---------------------------------------------------------------------------

/**
 * Tailwind spacing utilities.
 * Keys are the numeric Tailwind step (0–96 + "px").
 * Values are the corresponding `p-*` padding classes; swap prefix as needed
 * (e.g. `m-4`, `gap-4`, `w-4`, etc.).
 */
export const spacing = {
  0:    "p-0",
  px:   "p-px",
  0.5:  "p-0.5",
  1:    "p-1",
  1.5:  "p-1.5",
  2:    "p-2",
  2.5:  "p-2.5",
  3:    "p-3",
  3.5:  "p-3.5",
  4:    "p-4",
  5:    "p-5",
  6:    "p-6",
  7:    "p-7",
  8:    "p-8",
  9:    "p-9",
  10:   "p-10",
  11:   "p-11",
  12:   "p-12",
  14:   "p-14",
  16:   "p-16",
  20:   "p-20",
  24:   "p-24",
  28:   "p-28",
  32:   "p-32",
  36:   "p-36",
  40:   "p-40",
  44:   "p-44",
  48:   "p-48",
  52:   "p-52",
  56:   "p-56",
  60:   "p-60",
  64:   "p-64",
  72:   "p-72",
  80:   "p-80",
  96:   "p-96",
} as const;

/** Raw spacing values for non-padding use-cases (margin, gap, width, …) */
export const space = {
  0:    "0",
  px:   "px",
  0.5:  "0.5",
  1:    "1",
  1.5:  "1.5",
  2:    "2",
  2.5:  "2.5",
  3:    "3",
  3.5:  "3.5",
  4:    "4",
  5:    "5",
  6:    "6",
  7:    "7",
  8:    "8",
  9:    "9",
  10:   "10",
  11:   "11",
  12:   "12",
  14:   "14",
  16:   "16",
  20:   "20",
  24:   "24",
  28:   "28",
  32:   "32",
  36:   "36",
  40:   "40",
  44:   "44",
  48:   "48",
  52:   "52",
  56:   "56",
  60:   "60",
  64:   "64",
  72:   "72",
  80:   "80",
  96:   "96",
} as const;

// ---------------------------------------------------------------------------
// Breakpoints
// ---------------------------------------------------------------------------

/**
 * Tailwind responsive prefixes.
 * Append these in front of any utility class (e.g. `${bp.md}:text-lg`).
 *
 * Default Tailwind breakpoints:
 *   sm  → 640 px
 *   md  → 768 px
 *   lg  → 1024 px
 *   xl  → 1280 px
 *   2xl → 1536 px
 */
export const breakpoints = {
  sm:  "sm",
  md:  "md",
  lg:  "lg",
  xl:  "xl",
  "2xl": "2xl",
} as const;

/**
 * Min-width values for manual media-query usage (e.g. in styled-components or
 * inline JS logic). Mirrors Tailwind's default config.
 */
export const breakpointValues = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  "2xl": 1536,
} as const;

// ---------------------------------------------------------------------------
// Aggregated design system export
// ---------------------------------------------------------------------------

export const theme = {
  colors,
  typography,
  spacing,
  space,
  breakpoints,
  breakpointValues,
} as const;

export type Theme = typeof theme;
export default theme;

// Hey Neighbor — Brand Design System

export const Colors = {
  // Brand Core
  primary: '#E8431A',        // Vibrant coral-red
  primaryLight: '#FF6B47',   // Lighter coral
  primaryDark: '#C2330E',    // Deeper coral
  primarySurface: '#FFF0EB', // Soft coral tint

  secondary: '#0F9B8E',      // Deep teal
  secondaryLight: '#2BBDAE', // Lighter teal
  secondaryDark: '#097A6F',  // Deeper teal
  secondarySurface: '#E6F7F5',// Soft teal tint

  accent: '#F5A623',         // Golden amber
  accentLight: '#FFCB5E',    // Lighter amber
  accentSurface: '#FFF8E7',  // Soft amber tint

  purple: '#6C63FF',         // Village Kids accent
  purpleSurface: '#F0EFFF',

  // Neutrals
  background: '#FBF8F4',     // Warm cream
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  border: '#E8E2D9',
  borderLight: '#F0EBE3',

  // Text
  text: '#1C1917',           // Near black
  textSecondary: '#57534E',  // Medium brown-gray
  textMuted: '#A8A29E',      // Light muted
  textInverse: '#FFFFFF',

  // Semantic
  success: '#16A34A',
  successSurface: '#DCFCE7',
  warning: '#D97706',
  warningSurface: '#FEF3C7',
  error: '#DC2626',
  errorSurface: '#FEE2E2',

  // Section colors
  eventsColor: '#E8431A',
  yardSaleColor: '#F5A623',
  villageColor: '#6C63FF',
  offersColor: '#0F9B8E',

  // Tab bar
  tabActive: '#E8431A',
  tabInactive: '#A8A29E',
  tabBar: '#FFFFFF',
  tabBarBorder: '#E8E2D9',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  body: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  hero: 36,
};

export const FontWeight: Record<string, '400' | '500' | '600' | '700' | '800'> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

export const Shadow = {
  sm: {
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};

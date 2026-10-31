interface ThemeColors {
  primary: string;
  planMode: string;
  selection: string;
  thinking: string;
  success: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  dialogSurface: string;
  thinkingBorder: string;
  dimSeparator: string;
}

interface Theme {
  readonly name: string;
  readonly colors: Readonly<ThemeColors>;
}

export type { ThemeColors, Theme };

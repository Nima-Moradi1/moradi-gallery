import type { Config } from "tailwindcss";
import { colors } from "./src/design-system/tokens/colors";
import { zIndex } from "./src/design-system/tokens/z-index";
import { typography } from "./src/design-system/tokens/typography";
import { spacing } from "./src/design-system/tokens/spacing";
export default {
  theme: {
    extend: {
      colors,
      spacing,
      zIndex,
      fontFamily: { sans: typography.english, persian: typography.persian },
    },
  },
} satisfies Config;

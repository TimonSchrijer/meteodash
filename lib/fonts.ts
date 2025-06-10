import { Inter } from "next/font/google"

// Use Inter as a close alternative to Helvetica Neue Condensed
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
})

// Custom CSS for condensed styling
export const condensedStyles = {
  fontFamily: "var(--font-inter)",
  fontWeight: "700",
  letterSpacing: "-0.025em",
  fontStretch: "condensed",
}

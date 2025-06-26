import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { MuiThemeProvider } from "@/components/providers/MuiThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <MuiThemeProvider>
            {children}
          </MuiThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
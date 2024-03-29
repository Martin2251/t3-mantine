import { type Session } from "next-auth";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
   
    
  return (
  <ColorSchemeProvider colorScheme={colorScheme}  toggleColorScheme={toggleColorScheme}>
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      /** Put your mantine theme override here */
      colorScheme,
    }}
  >
   
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
     
    </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default api.withTRPC(MyApp);

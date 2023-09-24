import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/context/theme-provider";
import ModalProvider from "@/context/ModalProvider";
import { SocketProvider } from "@/context/socketProvider";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord-theme"
          >  
          <SocketProvider >

              <ModalProvider />
                {children}
          </SocketProvider>
          </ThemeProvider>
      </div>
  );
}

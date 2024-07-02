 import '@/app/global.css';
import SideNav from './sidenav';
import { CookiesProvider } from 'next-client-cookies/server';
import { Toaster } from 'react-hot-toast';
import { Box, Container } from '@mui/material';
export const runtime = 'edge'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body> 
        <CookiesProvider>
          <SideNav />
          <Toaster position="bottom-right" reverseOrder={false} />
          <Container>
            <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
              {children}
            </Box>
          </Container>
        </CookiesProvider>
      </body>
    </html>
  );
}

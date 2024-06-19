 import '@/app/global.css';
import SideNav from './sidenav';
import { CookiesProvider } from 'next-client-cookies/server';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <html lang="en">
      <body> 
        <CookiesProvider>
          <SideNav />
          {children}
        </CookiesProvider>
      </body>
    </html>
    </>
  );
}

 import '@/app/global.css';
import SideNav from './sidenav';
import { CookiesProvider } from 'next-client-cookies/server';
import { Toaster } from 'react-hot-toast';
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
          <div className="container">
            <div className="left"></div>
            <div className="center">{children}</div>
            <div className="right"></div>
          </div>
        </CookiesProvider>  
      </body>
    </html>
  );
}

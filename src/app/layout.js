import { Inter } from 'next/font/google';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { AuthContextProvider } from './context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'No-code Website Builder',
  description: 'No-code Website Builder',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" id="html">
		<body className={inter.className}> 
			<AppRouterCacheProvider>
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
			</AppRouterCacheProvider>       
		</body>
    </html>
  )
}

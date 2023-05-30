import '@/styles/globals.css'
import RootLayout from '@/components/layout';

export default function App({ Component, pageProps }) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

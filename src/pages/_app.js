import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <KindeProvider>
      <Component {...pageProps} />
    </KindeProvider>
  );
}

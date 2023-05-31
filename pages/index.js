import AuthPage from "./auth";
import ItemsPage from "./items";
import { useSession } from "next-auth/react"

const HomePage = () => {
  const session = useSession();
  console.info('session', session);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    return <ItemsPage />;
  }

  return (
    <AuthPage />
  );
};

export default HomePage;
import RootLayout from "@/components/layout";
import { getSession } from "next-auth/react";
import { redirectUnauthenticated } from "@/lib/auth";

const ItemsPage = () => {
  return (
    <RootLayout>
      <p>ITEMS PAGE</p>
    </RootLayout>
  );
};

export async function getServerSideProps(context) {
  const result = await redirectUnauthenticated(getSession, context);
  return result;
}

export default ItemsPage;
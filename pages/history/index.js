import RootLayout from "@/components/layout";
import { redirectUnauthenticated } from "@/lib/auth";
import { getSession } from "next-auth/react";

const HistoryPage = () => {
  return (
    <RootLayout>
      <p>HISTORY PAGE</p>
    </RootLayout>
  );
};

export async function getServerSideProps(context) {
  const result = await redirectUnauthenticated(getSession, context);
  return result;
}

export default HistoryPage;
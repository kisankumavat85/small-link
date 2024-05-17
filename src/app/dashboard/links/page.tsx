import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import Links from "@/components/pages/Links";
import { authOptions } from "@/lib/auth";

const LinksPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  return <Links />;
};

export default LinksPage;

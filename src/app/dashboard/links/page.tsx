import { redirect } from "next/navigation";

import { auth } from "@/auth";
import Links from "@/components/pages/Links";

const LinksPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return <Links />;
};

export default LinksPage;

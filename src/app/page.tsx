import Link from "next/link";
import { LatestPost } from "~/app/_components/post";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  if (!session) {
    redirect('./Dashboards/userDashboard'); // initial redirect to UserDashboard Page
  }

  return (
    <HydrateClient >
      <>
      </>
    </HydrateClient>
  );
}

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { inviteCode: string } }) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  const userExistsInServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (userExistsInServer) {
    return redirect(`/servers/${userExistsInServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [{ profileId: profile?.id }],
      },
    },
  });
  return redirect(`/servers/${server.id}`);
};

export default page;

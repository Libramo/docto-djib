import { prisma } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { capitalizeFirstLetter } from "@/lib/utils";

const UserCard = async ({ type }: { type: UserRole }) => {
  const modelMap: Record<UserRole, typeof prisma.user> = {
    ADMIN: prisma.user,
    DOCTOR: prisma.user,
    USER: prisma.user,
  };

  const data = await modelMap[type].count({
    where: {
      role: type,
    },
  });

  const capitalizedType = capitalizeFirstLetter(type);

  return (
    <Card className="min-w-1/3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-3xl font-bold">{data}</CardTitle>
      </CardHeader>

      <CardContent className="text-xl">{`${data >= 2 ? `${capitalizedType}s` : `${capitalizedType}`}`}</CardContent>
    </Card>
  );
};

export default UserCard;

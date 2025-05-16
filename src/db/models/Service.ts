import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";

interface GetServicesParams {
  where?: Prisma.ServiceWhereInput;
};

export const getServices = async (params?: GetServicesParams) => {
  const where = params?.where;
  return await prisma.service.findMany({
    where,
    orderBy: {
      name: "asc",
    }
  });
};
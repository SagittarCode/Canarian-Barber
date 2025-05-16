"use server";

import { getServices as getServicesDB } from "@/db/models/Service";

export async function getServices() {
  const services = await getServicesDB({
    where: {
      active: true,
    }
  });

  return services;
}
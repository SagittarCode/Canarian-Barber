"use server";

import { getServices } from "@/services/getServices"
import { ServicesClient } from "./ServicesClient";

export const ServicesServer = async () => {
  const services = await getServices();
  return <ServicesClient services={services} />;
}

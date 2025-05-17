"use client";

import dynamic from "next/dynamic"

// Import a component with SSR disabled
const LocationDynamic = dynamic(() => import("@/components/pages/home/Location"), {
  ssr: false,
  loading: () => <p className="p-4 text-muted-foreground">Loading client component...</p>,
})

export default LocationDynamic
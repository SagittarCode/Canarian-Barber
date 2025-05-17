"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";
import Image from "next/image";

const Location = () => {
  return (
    <section className="relative overflow-hidden my-20 z-5">
      <h1 className="text-3xl font-bold text-center mb-3">ENCUÉNTRANOS</h1>
      <div className="w-[600px] h-[400px] max-w-[100dvw] max-h-[100dvh] overflow-hidden mx-auto rounded-md border-2 border-accent">
        <MapContainer
          center={[35.280354, -2.938449]}
          zoom={18}
          zoomControl={false}
          attributionControl={false}
          style={{ height: "100%", width: "100%", background: "transparent" }}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          <Marker
            icon={divIcon({
              className: "text-primary",
              html: '<svg xmlns="http://www.w3.org/2000/svg" style="scale: 1.3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>'
            })}
            position={[35.280354, -2.938449]}
          >
            <Popup>
              <Image
                src="/images/logo_sm.webp"
                alt="Canarian Barber"
                width={100}
                height={100}
                className="rounded-full mx-auto"
                priority
              />
              <h1 className="text-lg font-bold text-center">Canarian Barber</h1>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="text-center text-sm text-muted-foreground mt-2">
        <a
          href="https://www.google.com/maps/place/Canarian+Barber/@35.2803056,-2.9387182,18z/data=!4m6!3m5!1s0xd77056066dd2a33:0xda70ca1ef6c5251b!8m2!3d35.2802816!4d-2.9384814!16s%2Fg%2F11nnqtxwjp!5m1!1e4?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          Edificio Corea, Pl. de la Goleta, 5, local 2, 52006 Melilla, España
        </a>
      </div>
    </section>
  );
};

export default Location;

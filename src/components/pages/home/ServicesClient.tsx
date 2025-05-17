"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Service } from "@prisma/client";
import { useRef } from "react";
import { useWindowSize } from "hamo"
import { cn } from "@/lib/utils";

interface ServicesClientProps {
  services: Service[];
}

export const ServicesClient = ({ services }: ServicesClientProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const carrouselWrapperRef = useRef<HTMLDivElement>(null);
  const carrouselRef = useRef<HTMLDivElement>(null);
  const { width: windowWidth } = useWindowSize();

  useGSAP(() => {
    if (!frameRef.current || !listRef.current) return;
    if (!windowWidth) return;
    if (!carrouselRef.current) return;
    if (!carrouselWrapperRef.current) return;

    const tl = gsap.timeline();

    // ----- Image
    tl.from(
      frameRef.current,
      {
        x: -100,
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#services",
          start: "-=230 center",
          end: "+=350",
          scrub: true,
        },
      }
    );

    // ----- Heading
    tl.from(
      "#services h1",
      {
        y: 20,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#services",
          start: "-=160 center",
          end: "+=200",
          scrub: true,
        },
      }
    );

    const items = gsap.utils.toArray<HTMLLIElement>(listRef.current.children);

    items.forEach((item, i) => {
      tl.from(
        item,
        {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#services",
            start: `+=${i * 25} center`,
            end: "+=350",
            scrub: true,
          },
        }
      );
    });


    // ----- Carrousel
    const carrouselEl = carrouselRef.current;
    const wrapperEl = carrouselWrapperRef.current;

    const amountToScroll = carrouselEl.scrollWidth - windowWidth;

    tl.to(
      carrouselRef.current,
      {
        x: -amountToScroll,
        ease: "none",
        duration: 3,
        scrollTrigger: {
          trigger: wrapperEl,
          start: "top 10%",
          end: `+=${amountToScroll}`,
          scrub: 1,
          pin: true,
        },
      }
    );

    return () => tl.kill();
  }, [frameRef, listRef, carrouselRef, windowWidth, carrouselWrapperRef]);


  const carrouselItems = [
    {
      title: "Corte de pelo",
      src: "/images/haircut.webp",
      height: 960,
      width: 1440,
    },
    {
      title: "Diseño",
      src: "/images/barber_tinting.webp",
      height: 960,
      width: 1440,
    },
    {
      title: "Afeitado",
      src: "/images/shave.webp",
      height: 960,
      width: 1440,
    }
  ]

  return (
    <section className="relative min-h-[100dvh] pt-20 md:pt-10" id="services">
      <div className="flex flex-col-reverse lg:flex-row gap-6 items-center justify-center h-full mb-20 md:mb-10">
        <div className="max-w-[95vw] w-[500px] rounded-xl">
          <figure className="frame" ref={frameRef}>
            <Image
              src="/images/canarian_barber.webp"
              alt="Canarian barber"
              width={500}
              height={500}
              className="max-w-full"
              priority
            />
          </figure>
        </div>

        <div className="grow max-w-[600px]">
          <h1 className="text-center lg:text-left text-5xl font-bold text-primary/90 font-child-witch tracking-[0.12em]">
            SERVICIOS
          </h1>
          <ul ref={listRef} className="mt-3 rounded-md overflow-clip">
            {services.map((service, i) => (
              <li key={i}>
                <div className="w-full flex items-center gap-2 py-3 px-2 border-b border-border hover:bg-primary/5 transition-all duration-200 ease-in-out">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full" />
                  <span className="text-xs sm:text-sm md:text-lg font-bold tracking-[0.12em]">
                    {service.name}
                  </span>
                  <div className="flex flex-col text-right ml-auto">
                    <span className="text-sm">{service.price}€</span>
                    <span className="text-xs text-muted-foreground">
                      {service.duration} min
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="overflow-hidden" ref={carrouselWrapperRef}>
        <div
          className="relative flex px-[15dvw] gap-[15dvw] items-center w-max"
          ref={carrouselRef}
        >
          {carrouselItems.map((item, i) => (
            <div
              key={i}
              className={cn(
                "relative rounded-lg overflow-clip flex items-center justify-center",
                "h-[80dvh] max-h-[100dvw] w-[70dvw]"
              )}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={item.width}
                height={item.height}
                className="object-cover h-full w-full"
                priority
              />
              <span
                className={cn(
                  "absolute text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-8xl font-bold text-primary",
                  "drop-shadow-[0_2.2px_1.2px_rgba(255,255,255,1)]"
                )}
              >
                {item.title}
              </span>
            </div>
          ))}

          {/* Hack para que el carrousel se ajuste al ancho del viewport en mobile */}
          {windowWidth && windowWidth < 500 &&
            <div className="w-[50vw]" />
          }
        </div>
      </div>

    </section>
  );
};

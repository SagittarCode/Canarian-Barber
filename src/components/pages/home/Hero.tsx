"use client";

import { Logo } from "@/components/Logo"
import { MainMenu } from "@/components/MainMenu"
import { cn } from "@/lib/utils"
import { useRef, useState } from "react"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BooksyWidget } from "@/components/BooksyWidget";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export const Hero = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const [logoIsEnded, setLogoIsEnded] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Initial animation
    tl.fromTo(logoRef.current,
      { scale: 1.3, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => setLogoIsEnded(true),
      },
    )

    // Scroll animation
    tl.to(logoRef.current,
      {
        y: -20,
        ease: "power2.in",
        scrollTrigger: {
          trigger: logoRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    tl.fromTo(heroBgRef.current,
      { scale: 1.3 },
      {
        scale: 1,
        ease: "power2.out",
        duration: 1,
        scrollTrigger: {
          trigger: heroBgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [logoRef, heroBgRef]);

  return (
    <section className="relative h-[100vh] transition-all bg-black overflow-hidden z-10">
      <div className={cn("fixed top-4 right-5 z-20 opacity-0 transition-all", logoIsEnded && "opacity-100")}>
        <MainMenu />
      </div>

      <div
        className={cn(
          "absolute top-4 left-6 text-xs text-white z-10 opacity-0 transition-all",
          logoIsEnded && "opacity-100"
        )}
      >
        <a
          className="opacity-70 hover:opacity-100 hover:underline underline-offset-4 transition-all"
          href="https://www.instagram.com/canarianbarber/"
          target="_blank"
          rel="noreferrer"
        >
          @canarianbarber
        </a>
      </div>

      <div
        ref={heroBgRef}
        className={cn(
          "absolute z-0 h-full w-full opacity-25 scale-[1.22]",
          "bg-[url('/images/barber_tinting.webp')] bg-cover bg-center bg-no-repeat grayscale"
        )}
      />

      <div className="flex flex-col items-center justify-center gap-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Logo ref={logoRef} className="scale-[1.3] opacity-0" />

        <BooksyWidget show={logoIsEnded} />
      </div>
    </section>
  )
}
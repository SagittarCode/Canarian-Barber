import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export const MainMenu = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Inicio", href: "#" },
    { name: "Reservar", href: "#" },
    { name: "Servicios", href: "#services" },
    { name: "Productos", href: "#" },
    { name: "Contacto", href: "#" },
  ];

  return (
    <div>
      <div
        className={cn(
          "relative flex flex-col justify-center items-center gap-2 z-50 w-[30px] aspect-[1.3] cursor-pointer transition-all duration-200 ease-in-out",
          open && "translate-x-[-7px]"
        )}
        onClick={() => setOpen(!open)}
        aria-pressed={open}
        role="button"
      >
        <div
          className={cn(
            "absolute w-full h-[8px] bg-white top-0 left-0 origin-center transition-all duration-200 ease-in-out",
            open && "rotate-45 translate-x-[7px] translate-y-[7.3px]"
          )}
          style={{ width: "100%" }}
        />
        <div
          className={cn(
            "absolute w-full h-[8px] bg-white bottom-0 left-0 origin-center transition-all duration-200 ease-in-out",
            open && "-rotate-45 translate-x-[7px] translate-y-[-7.3px]"
          )}
          style={{ width: "100%" }}
        />
      </div>

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 w-full h-full",
          !open && "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute top-0 left-0 z-10 w-full h-full cursor-pointer transition-all duration-300 opacity-100 bg-black/50 backdrop-blur-sm",
            "hidden md:block",
            !open && "pointer-events-none cursor-default opacity-0"
          )}
          onClick={() => setOpen(false)}
        >
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
            <p className="text-5xl font-bold">Canarian Barber</p>
            <p>La vida se ve mejor después de un corte de pelo.</p>
          </div>
        </div>

        <div
          className={cn(
            "absolute top-0 right-0 z-20 w-full h-full bg-gradient-to-tr from-background to-zinc-900 transition-all duration-300 ease-in-out",
            "md:w-1/2",
            !open && "-right-[100%]"
          )}
        >
          <div className="flex flex-col gap-8 items-center justify-center h-full p-12">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={cn(
                  "relative text-5xl font-bold transition-all duration-300 ease-in-out",
                  "after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:h-1.5 after:bg-foreground after:rounded-2xl",
                  "after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                )}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  ref?: React.RefObject<HTMLDivElement | null>,
  className?: string,
}

export const Logo = ({ ref, className }: LogoProps) => {
  return (
    <div
      className={cn("relative w-[600px] max-w-screen px-4 md:px-0", className)}
      id="logo"
      ref={ref}
    >
      <div className="absolute z-0 w-full h-full opacity-25 bg-black blur-3xl" />

      <div className="relative w-full h-full">
        <Image
          src="/images/logo_xl_alpha.webp"
          alt="Canarian Barber"
          width={1397}
          height={1016}
          className="max-w-full"
          priority
        />
      </div>
    </div>

  );
};

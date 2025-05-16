import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export const BooksyWidget = ({ show = false }: { show?: boolean }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          size="sm"
          className={cn(
            "-translate-x-3 z-10 text-lg font-bold border-3 border-primary-foreground opacity-0 transition-all",
            show && "opacity-100"
          )}
        >
          Reservar cita
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90dvh] !max-h-none">
        <DrawerHeader>
          <DrawerTitle className="text-center">Booksy</DrawerTitle>
        </DrawerHeader>
        <DrawerClose />
        <iframe
          src="https://booksy.com/es-es/instant-experiences/widget/130284"
          className="w-full h-full"
        />
      </DrawerContent>
    </Drawer>
  )
}

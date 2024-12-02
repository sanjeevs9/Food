import { Pizza, Coffee, IceCream, Sandwich } from 'lucide-react'

export function FoodIcons() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Pizza className="absolute top-1/4 left-1/4 w-16 h-16 text-[#FF4F5B] opacity-20 transform -rotate-12" />
      <Coffee className="absolute top-1/3 right-1/4 w-12 h-12 text-[#FF8C42] opacity-20 transform rotate-45" />
      <IceCream className="absolute bottom-1/4 left-1/3 w-14 h-14 text-[#FF4F5B] opacity-20 transform -rotate-6" />
      <Sandwich className="absolute top-2/3 right-1/3 w-16 h-16 text-[#FF8C42] opacity-20 transform rotate-12" />
    </div>
  )
}


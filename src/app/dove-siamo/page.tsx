import Image from 'next/image'
import { School, ShoppingCart, Pill, ParkingCircle, TrainFront, type LucideIcon } from 'lucide-react'
import { DocumentLayout } from '@/components/DocumentLayout'
import property from '@/config/property.json'

interface Servizio {
  markerNumber: number
  category: string
  label: string
  distanceText: string
  durationText: string
}

const p = property.doveSiamo
const servizi = p.servizi as Servizio[]

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  scuola: School,
  supermercato: ShoppingCart,
  farmacia: Pill,
  parcheggio: ParkingCircle,
  stazione: TrainFront,
}

export default function DoveSiamoPage() {
  if (!p.enabled) {
    return (
      <DocumentLayout sectionTitle="DOVE SIAMO">
        <p className="text-sm text-[#71717a] text-center">
          Mappa dei dintorni non ancora disponibile.
        </p>
      </DocumentLayout>
    )
  }

  return (
    <DocumentLayout sectionTitle={p.heading.toUpperCase()}>
      {p.mapImage && (
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#e4e4e7] mb-6">
          <Image src={p.mapImage} alt={`Mappa dei dintorni di ${p.address}`} fill className="object-cover" />
        </div>
      )}

      <ul className="space-y-3">
        {servizi.map((s) => {
          const Icon = CATEGORY_ICONS[s.category] ?? School
          return (
            <li
              key={s.markerNumber}
              className="flex items-center gap-3 bg-white/85 rounded-xl border border-[#e4e4e7] shadow-sm px-4 py-3"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#CC1414] text-white text-xs font-bold flex items-center justify-center">
                {s.markerNumber}
              </span>
              <Icon className="w-5 h-5 text-[#CC1414] flex-shrink-0" />
              <div className="flex-1 min-w-0 text-sm text-[#333333]">
                <p className="font-semibold truncate">{s.label}</p>
                <p className="text-xs text-[#71717a]">{s.distanceText} · {s.durationText}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </DocumentLayout>
  )
}

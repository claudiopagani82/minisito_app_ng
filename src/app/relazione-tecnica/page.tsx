import Image from 'next/image'
import { PhotoLayout } from '@/components/PhotoLayout'
import property from '@/config/property.json'

const p = property.relazioneTecnica

export default function RelazioneTecnicaPage() {
  return (
    <PhotoLayout>
      <div className="bg-white/85 rounded-xl shadow-md p-6 w-full space-y-4">
        <h1 className="text-[#CC1414] font-bold text-xl uppercase tracking-wide">
          {p.sectionTitle}
        </h1>

        {p.introHeading && (
          <div>
            <h2 className="text-[#333333] font-bold text-sm mb-1.5">{p.introHeading}</h2>
            {p.introParagraph.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-[#555555] text-sm leading-relaxed mb-2 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {p.statusHeading && (
          <div>
            <h2 className="text-[#333333] font-bold text-sm mb-1.5">{p.statusHeading}</h2>
            {p.statusParagraph.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-[#555555] text-sm leading-relaxed mb-2 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        <ul className="space-y-3">
          {p.items.filter((item) => item.enabled).map((item, i) => (
            item.documentUrl ? (
              <li key={i}>
                <a
                  href={item.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:opacity-80 transition-opacity"
                >
                  <Image src="/images/cuore.png" alt="" width={16} height={14} className="flex-shrink-0 mt-0.5" />
                  <span className="text-[#333333] text-sm font-semibold underline">{item.label}</span>
                </a>
              </li>
            ) : (
              <li key={i} className="flex items-start gap-3 opacity-50">
                <Image src="/images/cuore.png" alt="" width={16} height={14} className="flex-shrink-0 mt-0.5" />
                <span className="text-[#333333] text-sm font-semibold">
                  {item.label} <span className="text-xs italic font-normal">(non disponibile)</span>
                </span>
              </li>
            )
          ))}
        </ul>
      </div>
    </PhotoLayout>
  )
}

import { WOD_TYPE_LABELS, WOD_TYPE_STYLES } from '@/lib/wodType'
import type { WodType } from '@/types/wods'

export function WodTypeBadge({ type }: { type: WodType }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ring-1 ring-inset ${WOD_TYPE_STYLES[type]}`}
    >
      {WOD_TYPE_LABELS[type]}
    </span>
  )
}
import { useState } from 'react'
import { Dumbbell, Trophy } from 'lucide-react'
import { useWodScores } from '@/hooks/useScores'

export function Leaderboard({ wodId }: { wodId: number }) {
  const { data: scores, isLoading, isError } = useWodScores(wodId)
  const entries = (scores ?? [])
    .filter((score) => score.result?.trim())
    .map((score) => {
      const isScaled = score.result?.startsWith('[ESCALADO]') ?? false
      return {
        ...score,
        category: isScaled ? 'ESCALADO' : 'AVANZADO',
        displayResult: score.result?.replace(/^\[(AVANZADO|ESCALADO)\]\s*/, '').trim() ?? '',
      }
    })

  const advancedScores = entries.filter((score) => score.category === 'AVANZADO')
  const scaledScores = entries.filter((score) => score.category === 'ESCALADO')

  if (isLoading) {
    return <p className="py-4 text-center text-sm text-zinc-500">Cargando puntuaciones…</p>
  }

  if (isError) {
    return (
      <p role="status" className="rounded-lg border border-red-900/60 bg-red-950/30 p-4 text-sm text-red-300">
        No se pudieron cargar las puntuaciones. Verifica que tu cuenta tenga permiso para consultar todos los puntajes del WOD.
      </p>
    )
  }

  return (
    <section aria-label="Puntuaciones del WOD" className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">
      <div className="border-b border-zinc-800 px-4 py-3 sm:px-5">
        <h3 className="font-bold text-zinc-100">Puntuaciones de atletas</h3>
        <p className="mt-1 text-xs text-zinc-500">{entries.length} {entries.length === 1 ? 'registro' : 'registros'}</p>
      </div>

      <CategorySection title="Avanzado" icon="advanced" scores={advancedScores} />
      <CategorySection title="Escalado" icon="scaled" scores={scaledScores} />
    </section>
  )
}

function CategorySection({
  title,
  icon,
  scores,
}: {
  title: string
  icon: 'advanced' | 'scaled'
  scores: Array<{
    id: number
    userFullName: string
    photoUrl?: string | null
    completed: boolean
    displayResult: string
  }>
}) {
  const Icon = icon === 'advanced' ? Trophy : Dumbbell

  return (
    <div className="px-4 py-4 sm:px-5">
      <div className="mb-3 flex items-center gap-2">
        <Icon size={17} className={icon === 'advanced' ? 'text-orange-400' : 'text-emerald-400'} />
        <h4 className="text-sm font-bold text-zinc-200">{title}</h4>
        <span className="text-xs text-zinc-500">{scores.length}</span>
      </div>

      {scores.length === 0 ? (
        <p className="border-t border-zinc-800 py-3 text-sm text-zinc-500">Todavía no hay puntajes en esta categoría.</p>
      ) : (
        <ul className="divide-y divide-zinc-800 border-t border-zinc-800">
          {scores.map((score) => (
            <li key={score.id} className="grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 py-3 sm:grid-cols-[2rem_minmax(0,1fr)_auto_auto]">
              <AthleteAvatar
                key={`${score.id}-${score.photoUrl ?? ''}`}
                photoUrl={score.photoUrl}
                userFullName={score.userFullName}
              />
              <span className="min-w-0 truncate text-sm font-medium text-zinc-100">{score.userFullName}</span>
              <span className="text-sm font-semibold text-zinc-200 sm:text-right">{score.displayResult || 'Sin resultado'}</span>
              <span className={`col-start-2 text-xs sm:col-start-auto ${score.completed ? 'text-emerald-400' : 'text-zinc-500'}`}>
                {score.completed ? 'Completado' : 'No completado'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function AthleteAvatar({ photoUrl, userFullName }: { photoUrl?: string | null; userFullName: string }) {
  const [imageFailed, setImageFailed] = useState(false)
  const initials = userFullName.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()

  if (!photoUrl || imageFailed) {
    return (
      <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-zinc-300">
        {initials}
      </span>
    )
  }

  return (
    <img
      src={photoUrl}
      alt={`Foto de ${userFullName}`}
      onError={() => setImageFailed(true)}
      className="h-8 w-8 rounded-full border border-zinc-700 object-cover"
    />
  )
}

import { useEffect, useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useScore, useSaveScore } from '@/hooks/useScores'

const inputStyles =
  'w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500'

export function ScoreForm({ wodId, onClose }: { wodId: number; onClose: () => void }) {
  const { user } = useAuth()
  const { data: existingScore, isLoading } = useScore(user!.id, wodId)
  const saveScore = useSaveScore(user!.id, wodId)

  const [completed, setCompleted] = useState(false)
  const [result, setResult] = useState('')

  useEffect(() => {
    if (existingScore) {
      setCompleted(existingScore.completed)
      setResult(existingScore.result ?? '')
    }
  }, [existingScore])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    saveScore.mutate(
      {
        userId: user!.id,
        wodId,
        completed,
        result: result.trim() ? result.trim() : null,
      },
      { onSuccess: onClose },
    )
  }

  if (isLoading) {
    return <p className="mt-3 text-sm text-zinc-500">Cargando tu puntaje…</p>
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 border-t border-zinc-800 pt-4">
      <label className="flex items-center gap-2 text-sm text-zinc-300">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-orange-500 focus:ring-orange-500"
        />
        Completé el WOD
      </label>

      <input
        type="text"
        placeholder='Tu resultado (ej. "8:45", "12 rondas + 5 reps")'
        value={result}
        onChange={(e) => setResult(e.target.value)}
        className={inputStyles}
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saveScore.isPending}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-orange-400 disabled:opacity-60"
        >
          {saveScore.isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Guardar puntaje
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
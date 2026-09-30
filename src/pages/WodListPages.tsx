import { Dumbbell } from 'lucide-react'
import { useDeleteWod, useWods } from '@/hooks/useWods'
import { WodCard } from '@/components/WodCard'

export function WodListPage() {
  const { data: wods, isLoading, isError } = useWods()
  const deleteWod = useDeleteWod()

  function handleDelete(id: number) {
    if (confirm('¿Eliminar este WOD? Esta acción no se puede deshacer.')) {
      deleteWod.mutate(id)
    }
  }

  if (isLoading) {
    return <p className="text-center text-zinc-500">Cargando WODs…</p>
  }

  if (isError) {
    return (
      <p className="text-center text-red-400">
        No se pudo conectar con el servidor. ¿Está corriendo el backend en el puerto 8080?
      </p>
    )
  }

  if (!wods || wods.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <Dumbbell className="text-zinc-700" size={48} />
        <p className="text-zinc-500">Todavía no hay WODs publicados.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {wods.map((wod) => (
        <WodCard key={wod.id} wod={wod} onDelete={handleDelete} />
      ))}
    </div>
  )
}
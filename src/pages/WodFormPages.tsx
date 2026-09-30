import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { WodForm } from '@/components/WodForm'
import { useCreateWod, useUpdateWod, useWod } from '@/hooks/useWods'
import type { WodFormValues } from '@/lib/WodSquema'

export function WodFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)
  const wodId = Number(id)

  const { data: wod, isLoading } = useWod(wodId)
  const createWod = useCreateWod()
  const updateWod = useUpdateWod(wodId)

  const mutation = isEditing ? updateWod : createWod

  // Traduce el WOD (de la API) a los campos que el formulario espera
  const defaultValues: Partial<WodFormValues> | undefined = wod
    ? {
        name: wod.name ?? '',
        publicationDate: wod.publicationDate,
        coachName: wod.coachName,
        type: wod.type,
        description: wod.description,
      }
    : undefined

  function handleSubmit(values: WodFormValues) {
    const payload = {
      ...values,
      name: values.name?.trim() ? values.name.trim() : null,
    }

    mutation.mutate(payload, {
      onSuccess: () => navigate('/'),
    })
  }

  if (isEditing && isLoading) {
    return <p className="text-center text-zinc-500">Cargando WOD…</p>
  }

  return (
    <div>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300"
      >
        <ArrowLeft size={16} />
        Volver al listado
      </Link>

      <h1 className="mb-6 text-2xl font-bold text-zinc-50">
        {isEditing ? 'Editar WOD' : 'Nuevo WOD'}
      </h1>

      <WodForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isSubmitting={mutation.isPending}
        submitLabel={isEditing ? 'Guardar cambios' : 'Publicar WOD'}
      />
    </div>
  )
}
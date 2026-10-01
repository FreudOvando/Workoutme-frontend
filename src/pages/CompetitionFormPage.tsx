import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { CompetitionForm } from '@/components/CompetitionForm'
import { useCompetition, useCreateCompetition, useUpdateCompetition } from '@/hooks/useCompetitions'
import type { CompetitionFormValues } from '@/lib/competitionSchema'

export function CompetitionFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)
  const competitionId = Number(id)

  const { data: competition, isLoading } = useCompetition(competitionId)
  const createCompetition = useCreateCompetition()
  const updateCompetition = useUpdateCompetition(competitionId)
  const mutation = isEditing ? updateCompetition : createCompetition

  const defaultValues: Partial<CompetitionFormValues> | undefined = competition
    ? { name: competition.name, competitionDate: competition.competitionDate }
    : undefined

  function handleSubmit(values: CompetitionFormValues) {
    mutation.mutate(values, { onSuccess: () => navigate('/competitions') })
  }

  if (isEditing && isLoading) {
    return <p className="text-center text-zinc-500">Cargando competencia…</p>
  }

  return (
    <div>
      <Link to="/competitions" className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300">
        <ArrowLeft size={16} />
        Volver a competencias
      </Link>

      <h1 className="mb-6 text-2xl font-bold text-zinc-50">
        {isEditing ? 'Editar competencia' : 'Nueva competencia'}
      </h1>

      <CompetitionForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isSubmitting={mutation.isPending}
        submitLabel={isEditing ? 'Guardar cambios' : 'Crear competencia'}
      />
    </div>
  )
}
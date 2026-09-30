import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { ImagePlus, Save, UserRound, X } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export function ProfilePage() {
  const { user, updatePhotoUrl } = useAuth()
  const queryClient = useQueryClient()
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl ?? '')
  const [saved, setSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    setPhotoUrl(user?.photoUrl ?? '')
  }, [user?.photoUrl])

  if (!user) return null

  async function persistPhotoUrl(value: string | null) {
    setIsSaving(true)
    setSaved(false)
    setSaveError('')
    try {
      await updatePhotoUrl(value)
      await queryClient.invalidateQueries({ queryKey: ['scores', 'wod'] })
      setPhotoUrl(value ?? '')
      setSaved(true)
    } catch {
      setSaveError('No se pudo guardar la foto. Intenta de nuevo.')
    } finally {
      setIsSaving(false)
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void persistPhotoUrl(photoUrl.trim() || null)
  }

  function handleRemove() {
    void persistPhotoUrl(null)
  }

  return (
    <section className="mx-auto max-w-2xl">
      <div className="border-b border-zinc-800 pb-5">
        <h1 className="text-2xl font-bold text-zinc-100">Mi perfil</h1>
        <p className="mt-1 text-sm text-zinc-500">Consulta tus datos y administra tu foto de atleta.</p>
      </div>

      <div className="grid gap-8 py-6 sm:grid-cols-[9rem_1fr]">
        <div className="flex justify-center sm:justify-start">
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-zinc-700 bg-zinc-900 text-zinc-500">
            {photoUrl ? (
              <img src={photoUrl} alt={`Foto de ${user.firstName}`} className="h-full w-full object-cover" />
            ) : (
              <UserRound size={42} />
            )}
          </div>
        </div>

        <dl className="grid content-start gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase text-zinc-500">Nombre</dt>
            <dd className="mt-1 text-sm text-zinc-100">{user.firstName} {user.lastName}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-zinc-500">Correo</dt>
            <dd className="mt-1 break-all text-sm text-zinc-100">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-zinc-500">Tipo de cuenta</dt>
            <dd className="mt-1 text-sm text-zinc-100">{user.role === 'ADMIN' ? 'Administrador' : 'Atleta'}</dd>
          </div>
        </dl>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-t border-zinc-800 pt-5">
        <label htmlFor="photoUrl" className="text-sm font-semibold text-zinc-200">URL de imagen</label>
        <input
          id="photoUrl"
          type="url"
          value={photoUrl}
          onChange={(event) => {
            setPhotoUrl(event.target.value)
            setSaved(false)
          }}
          placeholder="https://ejemplo.com/mi-foto.jpg"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-orange-500 focus:outline-none"
        />
        <div className="flex flex-wrap items-center gap-2">
          <button type="submit" className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-bold text-zinc-950 hover:bg-orange-400">
            <Save size={16} />
            {isSaving ? 'Guardando…' : 'Guardar foto'}
          </button>
          {photoUrl && (
            <button type="button" onClick={handleRemove} disabled={isSaving} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-50">
              <X size={16} />
              Quitar foto
            </button>
          )}
          {saved && <span className="flex items-center gap-1.5 text-sm text-emerald-400"><ImagePlus size={15} /> Foto actualizada</span>}
          {saveError && <span role="alert" className="text-sm text-red-400">{saveError}</span>}
        </div>
      </form>
    </section>
  )
}

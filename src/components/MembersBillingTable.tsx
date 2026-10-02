import { useState } from 'react'
import { Check, Pencil, X } from 'lucide-react'
import { useAllPayments, useUpdateFee, useUsers } from '@/hooks/useBilling'
import { RegisterPaymentButton } from './RegisterPaymentButton'
import { formatMXN } from '@/lib/currency'

export function MembersBillingTable() {
  const { data: users } = useUsers()
  const { data: payments } = useAllPayments()
  const updateFee = useUpdateFee()

  const [editingFeeId, setEditingFeeId] = useState<number | null>(null)
  const [feeDraft, setFeeDraft] = useState('')

  if (!users) {
    return <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 py-6 text-sm text-zinc-400">Cargando miembros...</div>
  }

  const athletes = users.filter((u) => {
    const role = String(u.role ?? '').toUpperCase()
    return role === 'ATHLETE' || role === 'USER'
  })

  function latestPaymentFor(userId: number) {
    return payments
      ?.filter((p) => p.userId === userId)
      .sort((a, b) => b.paymentDate.localeCompare(a.paymentDate))[0]
  }

  function startEditFee(userId: number, current: number | null | undefined) {
    setEditingFeeId(userId)
    setFeeDraft(current?.toString() ?? '')
  }

  function confirmFee(userId: number) {
    const value = Number(feeDraft)
    if (Number.isNaN(value) || value < 0) return
    updateFee.mutate({ id: userId, monthlyFee: value }, { onSuccess: () => setEditingFeeId(null) })
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60">
      {athletes.length === 0 ? (
        <div className="px-4 py-6 text-center text-sm text-zinc-400">No hay atletas registrados para mostrar.</div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/60 text-left text-zinc-400">
                  <th className="px-4 py-3 font-medium">Atleta</th>
                  <th className="px-4 py-3 font-medium">Mensualidad</th>
                  <th className="px-4 py-3 font-medium">Último pago</th>
                  <th className="px-4 py-3 font-medium">Próximo pago</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Pago</th>
                </tr>
              </thead>
              <tbody>
                {athletes.map((athlete) => {
                  const latest = latestPaymentFor(athlete.id)
                  const nextDue = latest ? new Date(`${latest.nextDueDate}T23:59:59`) : null
                  const isActive = nextDue ? nextDue >= new Date() : false
                  const isEditingFee = editingFeeId === athlete.id

                  return (
                    <tr key={athlete.id} className="border-b border-zinc-800 last:border-0">
                      <td className="px-4 py-3 font-medium text-zinc-100">
                        {athlete.firstName} {athlete.lastName}
                      </td>
                      <td className="px-4 py-3">
                        {isEditingFee ? (
                          <div className="flex items-center gap-1">
                            <input
                              autoFocus
                              type="number"
                              min={0}
                              value={feeDraft}
                              onChange={(e) => setFeeDraft(e.target.value)}
                              className="w-24 rounded border border-zinc-700 bg-zinc-900 px-1 py-0.5 text-zinc-100"
                            />
                            <button onClick={() => confirmFee(athlete.id)} className="text-emerald-400 hover:text-emerald-300" aria-label="Guardar">
                              <Check size={14} />
                            </button>
                            <button onClick={() => setEditingFeeId(null)} className="text-zinc-500 hover:text-zinc-300" aria-label="Cancelar">
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEditFee(athlete.id, athlete.monthlyFee)}
                            className="group inline-flex items-center gap-1 text-zinc-300 hover:text-orange-400"
                          >
                            {formatMXN(athlete.monthlyFee)}
                            <Pencil size={12} className="opacity-0 group-hover:opacity-100" />
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3 text-zinc-300">
                        {latest ? new Date(`${latest.paymentDate}T00:00:00`).toLocaleDateString('es-MX') : 'Sin pagos'}
                      </td>
                      <td className="px-4 py-3 text-zinc-300">
                        {latest ? new Date(`${latest.nextDueDate}T00:00:00`).toLocaleDateString('es-MX') : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${isActive ? 'text-emerald-400' : 'text-red-400'}`}>
                          {isActive ? 'Vigente' : 'Vencida'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <RegisterPaymentButton userId={athlete.id} defaultAmount={athlete.monthlyFee ?? null} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 p-3 md:hidden">
            {athletes.map((athlete) => {
              const latest = latestPaymentFor(athlete.id)
              const nextDue = latest ? new Date(`${latest.nextDueDate}T23:59:59`) : null
              const isActive = nextDue ? nextDue >= new Date() : false
              const isEditingFee = editingFeeId === athlete.id

              return (
                <div key={athlete.id} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-100">{athlete.firstName} {athlete.lastName}</p>
                      <p className={`mt-1 text-xs font-semibold ${isActive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isActive ? 'Vigente' : 'Vencida'}
                      </p>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Atleta</span>
                  </div>

                  <div className="space-y-2 text-sm text-zinc-300">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-zinc-400">Mensualidad</span>
                      {isEditingFee ? (
                        <div className="flex items-center justify-end gap-1">
                          <input
                            autoFocus
                            type="number"
                            min={0}
                            value={feeDraft}
                            onChange={(e) => setFeeDraft(e.target.value)}
                            className="w-20 rounded border border-zinc-700 bg-zinc-950 px-1 py-0.5 text-right text-zinc-100"
                          />
                          <button onClick={() => confirmFee(athlete.id)} className="text-emerald-400 hover:text-emerald-300" aria-label="Guardar">
                            <Check size={14} />
                          </button>
                          <button onClick={() => setEditingFeeId(null)} className="text-zinc-500 hover:text-zinc-300" aria-label="Cancelar">
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditFee(athlete.id, athlete.monthlyFee)}
                          className="group inline-flex items-center gap-1 text-zinc-200 hover:text-orange-400"
                        >
                          {formatMXN(athlete.monthlyFee)}
                          <Pencil size={12} className="opacity-60 group-hover:opacity-100" />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-zinc-400">Último pago</span>
                      <span>{latest ? new Date(`${latest.paymentDate}T00:00:00`).toLocaleDateString('es-MX') : 'Sin pagos'}</span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-zinc-400">Próximo pago</span>
                      <span>{latest ? new Date(`${latest.nextDueDate}T00:00:00`).toLocaleDateString('es-MX') : '—'}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <RegisterPaymentButton userId={athlete.id} defaultAmount={athlete.monthlyFee ?? null} />
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
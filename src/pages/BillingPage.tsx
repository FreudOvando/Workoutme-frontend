import { useAuth } from '@/hooks/useAuth'
import { MyMembershipCard } from '@/components/MyMembershipCard'
import { MembersBillingTable } from '@/components/MembersBillingTable'

export function BillingPage() {
  const { user } = useAuth()
  const userRole = user?.role?.toUpperCase()
  const isAdmin = userRole === 'ADMIN' || userRole === 'ADMINISTRATOR'

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-zinc-50">Facturación</h1>

      <MyMembershipCard />

      {isAdmin && (
        <div>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-400">Miembros</h2>
          <MembersBillingTable />
        </div>
      )}
    </div>
  )
}
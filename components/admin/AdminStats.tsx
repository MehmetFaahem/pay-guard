interface StatsCardProps {
  title: string
  value: number
  description: string
}

function StatsCard({ title, value, description }: StatsCardProps) {
  return (
    <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {description}
      </p>
    </div>
  )
}

interface AdminStatsProps {
  totalUsers: number
  pendingPayments: number
  pendingDocuments: number
}

export function AdminStats({
  totalUsers,
  pendingPayments,
  pendingDocuments,
}: AdminStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <StatsCard
        title="Total Users"
        value={totalUsers}
        description="Registered users"
      />
      <StatsCard
        title="Pending Payments"
        value={pendingPayments}
        description="Awaiting approval"
      />
      <StatsCard
        title="Pending Documents"
        value={pendingDocuments}
        description="Needs verification"
      />
    </div>
  )
} 
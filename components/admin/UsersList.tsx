import { User } from '@/types'
import { formatDate } from '@/lib/utils'

interface UsersListProps {
  users: User[]
}

export function UsersList({ users }: UsersListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th className="text-left py-3 px-4">Email</th>
            <th className="text-left py-3 px-4">Role</th>
            <th className="text-left py-3 px-4">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 dark:border-gray-800"
            >
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4 capitalize">{user.role}</td>
              <td className="py-3 px-4">{formatDate(user.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 
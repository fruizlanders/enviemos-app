import '../profile/page/profile.css';

import styles from '../../style.ts';
import {useAllUsers} from '../../supabase/adminHooks.tsx';

export function UsersPage() {
  const {users, loading, error} = useAllUsers();
  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="main-wrap">
      <div className={`${styles.flexCenter} ${styles.padding1}`}>
        <div className="mt-8 bg-white rounded-lg shadow-lg p-4 w-full sm:w-2/3 md:w-2/3 lg:w-2/3">
          <h3 className="text-center text-black text-2xl font-bold mb-4">
            Gestión de Usuarios
          </h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Nombres
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Apellidos
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.first_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.last_name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

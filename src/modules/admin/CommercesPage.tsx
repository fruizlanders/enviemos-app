// CommercesPage.tsx
import styles from '../../style.ts';
import {useAllBanks, useAllCommerces} from '../../supabase/adminHooks.tsx';

export function CommercesPage() {
  const commerces = useAllCommerces(); // Fetch commerces
  const banks = useAllBanks(); // Fetch banks if needed for display

  return (
    <div
      className={`${styles.flexCenter} ${styles.paddingX} ${styles.paddingY} min-h-screen bg-primary`}
    >
      <div
        className={`${styles.boxWidth} ${styles.padding1} rounded-xl shadow-md`}
      >
        <h3 className={`${styles.heading3} text-center mb-8`}>Comercios</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-left text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border-b">Código</th>
                <th className="py-2 px-4 border-b">Número de Cuenta</th>
                <th className="py-2 px-4 border-b">Tipo de Cuenta</th>
                <th className="py-2 px-4 border-b">Banco</th>
                <th className="py-2 px-4 border-b">Correo</th>
                {/* Nueva columna */}
              </tr>
            </thead>
            <tbody>
              {commerces?.map((commerce) => (
                <tr key={commerce.id} className="border-b">
                  <td className="py-2 px-4">{commerce.code}</td>
                  <td className="py-2 px-4">{commerce.account_number}</td>
                  <td className="py-2 px-4">
                    {commerce.account_type === 1
                      ? 'Cuenta de Ahorros'
                      : 'Cuenta Corriente'}
                  </td>
                  <td className="py-2 px-4">
                    {banks?.find((bank) => bank.id === commerce.bank_id)
                      ?.name || 'Desconocido'}
                  </td>
                  <td className="py-2 px-4">
                    {commerce.user_id || 'Desconocido'}
                  </td>
                  {/* Nueva celda */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

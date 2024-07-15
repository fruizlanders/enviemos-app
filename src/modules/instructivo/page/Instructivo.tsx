
import styles, {layout} from '../../../style.ts';

const Enviemos = () => {
  return (
    <div className={`${styles.boxWidth} ${styles.paddingX} ${styles.paddingY}`}>
      <h1 className={styles.heading2}>Realice pagos mediante Enviemos</h1>

      <section className={`${layout.section} ${styles.marginY}`}>
        <div className={layout.sectionInfo}>
          <h2 className={styles.heading3}>Modo de operación</h2>
          <ul className={`${styles.paragraph} mt-5`}>
            <li>
              Nos encuentra en las apps home banking de BCP, Interbank y BBVA
            </li>
            <li>Cree un código de pago asociado a su cuenta bancaria.</li>
            <li>Al día siguiente útil se transferirá a la cuenta indicada</li>
            <li>*menos el costo de comisión</li>
          </ul>
        </div>
      </section>

      <section className={`${layout.section} ${styles.marginY}`}>
        <div className={layout.sectionInfo}>
          <h2 className={styles.heading3}>Pago de servicios</h2>
          <div className={`${styles.flexStart} flex-col mt-5`}>
            {['Interbank', 'BCP', 'BBVA'].map((banco) => (
              <div key={banco} className="mb-5">
                <h3 className={styles.heading4}>{banco}</h3>
                <p className={styles.paragraph}>
                  {banco === 'BBVA'
                    ? 'Ingrese dni y nombre. Luego el monto a enviar'
                    : "El 'código de usuario' se crea mediante chat."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${layout.section} ${styles.marginY}`}>
        <div className={layout.sectionInfo}>
          <h2 className={styles.heading3}>Tarifario</h2>
          <table className={`${styles.paragraph} mt-5`}>
            <thead>
              <tr>
                <th className="pr-4">Rango de cantidades</th>
                <th>Comisión Interbank, BCP, BBVA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>hasta S/4,000</td>
                <td>S/8</td>
              </tr>
              <tr>
                <td>hasta S/10,000</td>
                <td>S/19</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={`${layout.section} ${styles.marginY}`}>
        <div className={layout.sectionInfo}>
          <h2 className={styles.heading3}>¿Por qué elegir 'Enviemos'?</h2>
          <ul className={`${styles.paragraph} mt-5`}>
            <li>
              Confianza: Todas las operaciones están respaldadas por el Grupo
              Pago Digital SAC
            </li>
            <li>Eficiencia: Tarifario competitivo acorde al mercado.</li>
            <li>
              Tarifas: Creemos que las operaciones deben realizarse fácilmente
            </li>
            <li>
              Compromiso: Atención por WhatsApp disponible para resolver
              cualquier duda
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Enviemos;

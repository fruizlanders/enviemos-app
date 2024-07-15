import {Link} from 'react-router-dom';

// @ts-expect-error
const Whatsapp = ({styles}) => (
  <Link to="https://wa.link/2gd9m3">
    <button
      type="button"
      className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-green-gradient rounded-[10px] outline-none ${styles}`}
    >
      Chatea con nosotros
    </button>
  </Link>
);

export default Whatsapp;

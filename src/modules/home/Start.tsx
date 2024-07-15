import {arrowUp} from '../../assets';
import styles from '../../style.ts';

const Start = () => (
  <div
    className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-black-gradient p-[2px] cursor-pointer`}
  >
    <div
      className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}
    >
      <a href="/commerce">
        <p className="font-poppins font-medium text-[18px] leading-[23px]">
          <span className="text-gradient">Empieza</span>
        </p>

        <div className={`${styles.flexStart} flex-row`}>
          <p className="font-poppins font-medium text-[18px] leading-[24.3px] ">
            <span className="text-gradient">Ya</span>
          </p>
          <img
            src={arrowUp}
            alt="arrow-up"
            className="w-[23px] h-[24.3px] object-contain"
          />
        </div>
      </a>
    </div>
  </div>
);

export default Start;

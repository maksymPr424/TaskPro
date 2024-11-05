import { Oval } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader({ width, height }) {
  return (
    <div className={css.loader}>
      <Oval
        visible={true}
        height={height ? height : 50}
        width={width ? width : 50}
        color='#4fa94d'
        strokeWidth='5'
        animationDuration='0.65'
        ariaLabel='oval-loading'
      />
    </div>
  );
}

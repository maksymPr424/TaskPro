import { Oval } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader({
  width = 50,
  height = 50,
  color = "#4fa94d",
  style = {},
}) {
  return (
    <div className={css.loader} style={style}>
      <Oval
        visible={true}
        height={height}
        width={width}
        color={color}
        strokeWidth='5'
        animationDuration='0.65'
        ariaLabel='oval-loading'
      />
    </div>
  );
}

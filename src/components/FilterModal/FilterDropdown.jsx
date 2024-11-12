import icons from "../../assets/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import s from "./FilterDropdown.module.css";
import {
  resetFilter,
  setColorFilter,
  setColumns,
} from "../../redux/boards/sliceHeaderDashboard/filtersSlice";
import { selectColumns } from "../../redux/boards/selectors";

export default function FilterDropdown({ onClose }) {
  const dispatch = useDispatch();
  const selectedColor = useSelector((state) => state.filters.selectedColor);
  const columns = useSelector(selectColumns);

  const handleColorChange = (priority) => {
    dispatch(setColorFilter(priority));
    dispatch(setColumns({ columns, priority }));

    // onClose();
  };

  const handleReset = () => {
    dispatch(resetFilter(null));
    dispatch(setColumns({ columns, priority: null }));

    // onClose();
  };

  return (
    <div className={s.dropdown}>
      <button className={s.closeButton} onClick={onClose}>
        <svg className={s.closeIcon}>
          <use href={`${icons}#x`}></use>
        </svg>
      </button>
      <h3 className={s.titleFilter}>Filters</h3>
      <div className={s.subtitle}>
        <h4 className={s.label}>Label color</h4>
        <button onClick={handleReset} className={s.show}>
          Show all
        </button>
      </div>

      <div className={s.buttonsContainer}>
        <label className={s.radioText}>
          <input
            type="radio"
            name="color"
            value="none"
            onChange={() => handleColorChange("none")}
            checked={selectedColor === "none"}
          />
          <span
            className={s.radioBtn}
            style={{
              backgroundColor: "var(--none-priority)",
            }}
          ></span>
          <span className={s.radioLabel}> Without priority</span>
        </label>
        <label className={s.radioText}>
          <input
            type="radio"
            name="color"
            value="low"
            onChange={() => handleColorChange("low")}
            checked={selectedColor === "low"}
          />
          <span
            className={s.radioBtn}
            style={{ backgroundColor: "var(--low-priority)" }}
          ></span>
          <span className={s.radioLabel}>Low</span>
        </label>
        <label className={s.radioText}>
          <input
            type="radio"
            name="color"
            value="medium"
            onChange={() => handleColorChange("medium")}
            checked={selectedColor === "medium"}
          />
          <span
            className={s.radioBtn}
            style={{ backgroundColor: "var(--medium-priority)" }}
          ></span>
          <span className={s.radioLabel}>Medium</span>
        </label>
        <label className={s.radioText}>
          <input
            type="radio"
            name="color"
            value="high"
            onChange={() => handleColorChange("high")}
            checked={selectedColor === "high"}
          />
          <span
            className={s.radioBtn}
            style={{ backgroundColor: "var(--base-green-violet)" }}
          ></span>
          <span className={s.radioLabel}>High</span>
        </label>
      </div>
    </div>
  );
}

import { useState } from "react";
// import icons from "../../assets/sprite.svg";
import s from "./HeaderDashboard.module.css";
import Container from "../Container/Container.jsx";
import FilterDropdown from "../FilterModal/FilterDropdown.jsx";

export default function HeaderDashboard({ boardName }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <Container>
      <div className={s.head}>
        <h4 className={s.boardName}>{boardName}</h4>
        <div className={s.dropdownContainer}>
          <button className={s.btn} onClick={toggleDropdown}>
            <svg className={s.filterIcon}>
              <use href="/sprite.svg#icon-filter"></use>
            </svg>
            Filters
          </button>
          {isDropdownOpen && (
            <FilterDropdown onClose={() => setIsDropdownOpen(false)} />
          )}
        </div>
      </div>
    </Container>
  );
}

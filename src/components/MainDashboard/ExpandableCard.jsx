import { useState } from "react";
import css from "./Card/Card.module.css";

export const ExpandableCard = ({ id, title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {content && content.length >= 80 ? (
        <div className={css.moreContent}>
          <p className={`${css.text} ${css.textWithMoreInfo}`}>
            {isExpanded ? content : `${content.slice(0, 80)}...`}
            <button className={css.getMoreInfo} onClick={handleToggle}>
              {isExpanded ? "Less" : "More"}
            </button>
          </p>
        </div>
      ) : (
        <p className={css.text}>{content}</p>
      )}
    </>
  );
};

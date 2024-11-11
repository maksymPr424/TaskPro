import css from "./BeforeStart.module.css";

export default function BeforeStart() {
  return (
    <p className={css.info}>
      Before starting your project, it is essential{" "}
      <span className={css.active}>to create a board</span> to visualize and
      track all the necessary tasks and milestones. This board serves as a
      powerful tool to organize the workflow and ensure effective collaboration
      among team members.
    </p>
  );
}

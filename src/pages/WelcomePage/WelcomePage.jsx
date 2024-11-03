import css from "../WelcomePage/WelcomePage.module.css";
// import React from 'react';


function WelcomePage() {
  return (
    <div className={css.welcomecontainer}>
      <img
      className={css.image}
      src = "/src/img/welcome-user.png"
      alt= "appleguy"
      width={162}
      height={162} 
      />
        <svg className={css.welcomelogo}
        width="18"
        height="24"
        viewBox="0 0 18 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.6871 1.5H6.37047C6.23586 1.5 6.16855 1.5 6.10913 1.5205C6.05658 1.53862 6.00872 1.5682 5.96901 1.60709C5.92411 1.65107 5.89401 1.71127 5.83381 1.83167L2.68381 8.13167C2.54005 8.41919 2.46817 8.56295 2.48543 8.67981C2.50051 8.78185 2.55695 8.87318 2.64148 8.9323C2.73828 9 2.89901 9 3.22046 9H7.87465L5.62464 16.5L14.7695 7.01648C15.078 6.69653 15.2323 6.53655 15.2413 6.39966C15.2491 6.28084 15.2 6.16536 15.1091 6.08852C15.0043 6 14.782 6 14.3376 6H8.99965L10.6871 1.5Z" />
      </svg>
      <h1 className={css.welcomelogotxt}>Task Pro</h1>
      <p className={css.welcometxt}>Supercharge your productivity and take control of your tasks with Task Pro - Don't wait, start achieving your goals now!</p>
      <button className={css.regbtn} type="submit">Registration</button>
      <a className={css.logbtn} href="../AuthPage/AuthPage.jsx">Log In</a>
    </div>
  );
}
export default WelcomePage;
// одна ошибка из-за don't
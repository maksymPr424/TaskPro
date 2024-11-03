import css from "../AuthPage/AuthPage.module.css";
// import React from 'react';

  function AuthPage() {
    const handleSubmit = (event) => {
      event.preventDefault();
    };
  
    return (
      <div className={css.welcomecontainer}>
        <a className={css.something}>Registration</a>
        <a className={css.something}>Log In</a>
        <form className={css.something} onSubmit={handleSubmit}>
          
          <div className={css.something}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
            />
          </div>
  
          <div className={css.something}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
  
          <div className={css.something}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
            />
          </div>
  
          <button type="submit">Register Now</button>
        </form>
      </div>
    );
  }
  

export default AuthPage



// const something = () => {
//   return (
//     <div>
//       <form className={css.something}>
        
//         <div className={css.something}>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Enter your email"
//           />
//         </div>

//         <div className={css.something}>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Confirm a password"
//           />
//           <button
//         type="button"
//         onClick={togglePasswordVisibility}
//         style={{
//           position: 'absolute',
//           right: '10px',
//           top: '50%',
//           transform: 'translateY(-50%)',
//           background: 'none',
//           border: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         <svg
//           width="18"
//           height="18"
//           viewBox="0 0 18 18"
//           fill="none"
//         >
//           <use href="./" />
//         </svg>
//       </button>
//         </div>

//         <button type="submit">Log in Now</button>
//       </form>
//     </div>
//   );
// };


// export default something;

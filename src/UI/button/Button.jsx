import { Link } from 'react-router-dom'

import c from './button.module.scss'

const Button = ({ children, to, onClick }) => {
   return (
      <>
         {to
         ?
            <Link to={to} className={c.button} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })} >{children}</Link>
         :
            <button className={c.button} onClick={onClick} >
               {children}
            </button>
         }
      </>
   )
}

export { Button }
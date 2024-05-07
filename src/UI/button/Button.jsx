import { Link } from 'react-router-dom'
import classNames from 'classnames'

import c from './button.module.scss'

const Button = ({ children, to, onClick, className }) => {
   return (
      <>
         {to
         ?
            <Link
               to={to}
               className={classNames(c.button, className)}
               onClick={() => setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }), 100)}
            >
               {children}
            </Link>
         :
            <button className={c.button} onClick={onClick} >
               {children}
            </button>
         }
      </>
   )
}

export { Button }
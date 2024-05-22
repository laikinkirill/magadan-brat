import classNames from "classnames"

import c from './input.module.scss'

const Input = ({ className, ...props }) => {
   return (
      <input
         className={classNames(className, c.input )}
			{...props}
      />
   )
}

export { Input }
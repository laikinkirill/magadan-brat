
import c from './accordion.module.scss'

const Accordion = ({ accordion }) => {
   return (
      <ul className={c.accordion} >
         {accordion.map((elem, i) => (
            <li key={i} >
               <p>{elem?.title}</p>
               <input type="radio" name="elem" />
               <span>{elem?.text}</span>
               <i></i>
            </li>
         ))}
      </ul>
   )
}

export { Accordion }
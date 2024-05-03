
import c from './accordion.module.scss'

const Accordion = ({ accordion }) => {
   return (
      <ul className={c.accordion} >

         {Object.values(accordion).map((elem, i) => (
            <li key={i} >
               <p>{elem?.val?.title}</p>
               <input type="radio" name="elem" />
               <span>{elem?.val?.text}</span>
               <i></i>
            </li>
         ))}

      </ul>
   )
}

export { Accordion }
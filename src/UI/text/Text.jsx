
const Text = ({ text }) => {
   return updateTextAndReturnArr(text)?.map(str => (
      <p key={str} >{str}</p>
   ))
}

const updateTextAndReturnArr = (text) => {
   if (!text) return;
 
   return text.split("<br/>")
}

export { Text }
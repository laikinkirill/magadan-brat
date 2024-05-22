
export const getDate = ( number ) => {

   const dateObj = new Date(number)

   const day = addZero(dateObj.getDate())
   const month = addZero(dateObj.getMonth() + 1)
   const year = dateObj.getFullYear()

   function addZero(num) {
      return num < 10 ? '0'+num : num
   }

   return `${day}.${month}.${year}`
}
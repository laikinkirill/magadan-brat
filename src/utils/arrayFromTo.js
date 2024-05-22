
export const arrayFromTo = ( from, to ) => {

   if ( from < 0 || to <= 0 ) {
      return []
   }

   if ( from === 0 ) {
      return Array.from(Array(to+1).keys())
   }

	return Array.from({length: to}, (_, i) => i + 1).slice(from-1)

}
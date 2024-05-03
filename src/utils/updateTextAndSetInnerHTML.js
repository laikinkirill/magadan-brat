
export const updateTextAndSetInnerHTML = ( element, text ) => {

   if ( !text ) return

   element.innerHTML = text
      .replace(/[<>]/gi, '')
      .replace('br/', '<br/>')

}

export const updateTextAndReturnArr = ( text ) => {

   if ( !text ) return

   return text
      .replace(/[<>]/gi, '')
      .replace('br/', '<br/>')
      .split('<br/>')

}
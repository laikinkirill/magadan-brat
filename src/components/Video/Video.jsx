import ReactPlayer from "react-player"

const Video = ({ src, ...props }) => {

   const getUrl = () => {
      let url = src
      if ( src?.includes('//www.youtube') || src?.includes('//youtube') ) {
         return url.replace('/watch?v=', '/embed/')
      }
      if ( src?.includes('//rutube') ) {
         return url.replace('/video/', '/play/embed/')
      }
   }

   return (
      <iframe
         width='100%'
         height='auto'
         style={{ aspectRatio: '16/9' }}
         src={getUrl()}
         frameBorder="0"
         allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
         referrerPolicy="strict-origin-when-cross-origin"
         playsInline
         loop
      >
      </iframe>
   )
}
// https://www.youtube.com/watch?v=XxYME1RhToI
// https://www.youtube.com/embed/XxYME1RhToI

// https://rutube.ru/video/8978b556a2a335d5b8a4ed8a33ce65bc/
// https://rutube.ru/play/embed/8978b556a2a335d5b8a4ed8a33ce65bc

// const Video = ({ src, ...props }) => {
//    return (
//       <ReactPlayer
//          url={src}
//          loop
//          muted
//          playsinline
//          controls={false}
//          {...props}
//       />
//    )
// }

// const Video = ({ src, poster, ...props }) => {
//    return (
//       <video
//          preload="auto"
//          loop
//          muted
//          paused
//          src={src}
//          poster={poster}
//          height={324}
//          playsInline
//          {...props}
//       >
//       </video>
//    )
// }

export { Video }
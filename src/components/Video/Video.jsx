import ReactPlayer from "react-player"

const Video = ({ src, ...props }) => {
   return (
      <iframe
         width='100%'
         height='auto'
         style={{ aspectRatio: '16/9' }}
         src={src}
         frameborder="0"
         allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
         referrerpolicy="strict-origin-when-cross-origin"
         playsinline
         muted
         loop
         controls='false'
      >
      </iframe>
   )
}
{/* <iframe width="720" height="405" src="https://rutube.ru/play/embed/8978b556a2a335d5b8a4ed8a33ce65bc" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
<iframe width="1273" height="716" src="https://www.youtube.com/embed/XxYME1RhToI" title="Природа Колымского края. Магадан. Магаданская область. Колыма" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}

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
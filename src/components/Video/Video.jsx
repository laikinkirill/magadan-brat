
const Video = ({ src, poster, ...props }) => {
   return (
      <video
         preload="auto"
         loop
         muted
      // paused
         autoPlay
         src={src}
         poster={src}
         height={324}
         playsInline
         {...props}
      >
      </video>
   )
}

export { Video }
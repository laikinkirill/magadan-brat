
const Video = ({ src, poster, ...props }) => {
   return (
      <video
         preload="auto"
         loop
         muted
         paused
         src={src}
         poster={poster}
         height={324}
         playsInline
         {...props}
      >
      </video>
   )
}

export { Video }
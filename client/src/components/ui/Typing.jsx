import React from 'react'

function Typing({ className, width, height }) {
  return (
    <div className={className}>
      <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_xxgrirnx.json" background="transparent" speed="1" style={{ width: `100px`, height: `100px` }} loop autoplay></lottie-player>
    </div>
  )
}

export default Typing
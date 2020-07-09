import * as React from 'react'

const useUniqID = () => {
  const ref = React.useRef<number | null>(null)

  if (!ref.current) {
    ref.current = Math.random()
  }

  return ref.current
}

export default useUniqID

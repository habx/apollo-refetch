import * as React from 'react'

export const useUniqID = () => {
  const ref = React.useRef<number | null>(null)

  if (!ref.current) {
    ref.current = Math.random()
  }

  return ref.current
}

import React from 'react'

import RefetchContext from './useRefetch.context'

const useRefetch = () => React.useContext(RefetchContext)

export default useRefetch

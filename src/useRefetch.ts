import * as React from 'react'

import { RefetchContext } from './useRefetch.context'

export const useRefetch = () => React.useContext(RefetchContext)

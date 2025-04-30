'use client'

import React from 'react'

import { sepolia } from '@starknet-react/chains'
import {
  useInjectedConnectors,
  argent,
  braavos,
  StarknetConfig,
  publicProvider,
  starkscan,
} from '@starknet-react/core'

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: 'onlyIfNoConnectors',
    order: 'random',
  })

  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={publicProvider()}
      connectors={connectors}
      explorer={starkscan}
    >
      {children}
    </StarknetConfig>
  )
}

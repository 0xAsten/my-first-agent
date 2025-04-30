import React from 'react'
import { StarknetProvider } from './components/starknet-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <StarknetProvider>{children}</StarknetProvider>
      </body>
    </html>
  )
}

'use client'

import React from 'react'
import {
  useEvents,
  useBlockNumber,
  useReadContract,
} from '@starknet-react/core'

import { ABI } from './abi'

export default function Page() {
  const counter_address =
    '0x07500fe2ee7612bb6474a7a02a878fafb36cc18f0a6f183c1e7181114c5c2150'

  const { data: blockNumber } = useBlockNumber()

  const { data: counterValue } = useReadContract({
    address: counter_address,
    abi: ABI,
    functionName: 'get_counter',
    args: [],
    watch: true,
    refetchInterval: 1000,
  })

  const { data: events } = useEvents({
    address: counter_address,
    eventName: 'CounterIncreased',
    fromBlock: 732239,
    toBlock: 'latest',
    refetchInterval: 1000,
  })

  return (
    <>
      <h1>Hello Starknet</h1>
      <div>blockNumber: {blockNumber}</div>
      <div>counterValue: {counterValue}</div>
      <div>
        events log:
        {events.pages.map((page) => (
          <div>
            {page.events.map((event) => (
              <div>
                {event.transaction_hash}
                --
                {event.data?.toString()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

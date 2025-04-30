import * as dotenv from 'dotenv'
import { Account, Contract, RpcProvider, constants } from 'starknet'
import { generateText, tool } from 'ai'
import { google } from '@ai-sdk/google'
import { z } from 'zod'

dotenv.config()

const privateKey = process.env.PRIVATE_KEY || ''
const accountAdress =
  '0x04C923aECC1E73FA4cFDE053C81d93e09c53C02E64267dC94DE156236c9949C4'

const counter_address =
  '0x07500fe2ee7612bb6474a7a02a878fafb36cc18f0a6f183c1e7181114c5c2150'

const myProvider = new RpcProvider({
  nodeUrl: constants.NetworkName.SN_SEPOLIA,
})

const account = new Account(
  myProvider,
  accountAdress,
  privateKey,
  undefined,
  constants.TRANSACTION_VERSION.V3,
)

const { abi: counterABI } = await myProvider.getClassAt(counter_address)

const counterContract = new Contract(counterABI, counter_address, myProvider)

const { text } = await generateText({
  model: google('models/gemini-2.0-flash-exp'),
  tools: {
    increaseCounter: tool({
      description: 'Increase the counter',
      parameters: z.object({}),
      execute: async () => {
        const call = counterContract.populate('increase_counter', [])
        const { transaction_hash: txH } = await account.execute(call, {
          version: 3,
        })
        await myProvider.waitForTransaction(txH)
        const value = await counterContract.get_counter()
        return {
          tx: txH,
          value: value.toString(),
        }
      },
    }),
  },
  prompt: 'Increase the counter',
  onStepFinish({ toolResults }) {
    console.log(toolResults)
  },
})

console.log(text)

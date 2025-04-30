export const ABI = [
  {
    name: 'CounterImpl',
    type: 'impl',
    interface_name: 'contracts::ICounter',
  },
  {
    name: 'contracts::ICounter',
    type: 'interface',
    items: [
      {
        name: 'increase_counter',
        type: 'function',
        inputs: [],
        outputs: [],
        state_mutability: 'external',
      },
      {
        name: 'get_counter',
        type: 'function',
        inputs: [],
        outputs: [
          {
            type: 'core::integer::u32',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    kind: 'enum',
    name: 'contracts::Counter::Event',
    type: 'event',
    variants: [],
  },
] as const

#[starknet::interface]
pub trait ICounter<TContractState> {
    fn increase_counter(ref self: TContractState);
    fn get_counter(self: @TContractState) -> u32;
}

/// Simple contract for managing balance.
#[starknet::contract]
mod Counter {
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};

    #[storage]
    struct Storage {
        counter: u32,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        CounterIncreased: CounterIncreased,
    }

    #[derive(Drop, starknet::Event)]
    pub struct CounterIncreased {
        pub counter: u32,
    }

    #[abi(embed_v0)]
    impl CounterImpl of super::ICounter<ContractState> {
        fn increase_counter(ref self: ContractState) {
            let new_value = self.counter.read() + 1;
            self.counter.write(new_value);

            self.emit(CounterIncreased { counter: new_value })
        }

        fn get_counter(self: @ContractState) -> u32 {
            self.counter.read()
        }
    }
}

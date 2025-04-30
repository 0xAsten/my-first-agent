use contracts::{ICounterDispatcher, ICounterDispatcherTrait};
use snforge_std::{ContractClassTrait, DeclareResultTrait, declare};
use starknet::ContractAddress;

fn deploy_contract(name: ByteArray) -> ContractAddress {
    let contract = declare(name).unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@ArrayTrait::new()).unwrap();
    contract_address
}

#[test]
fn test_increase_counter() {
    let contract_address = deploy_contract("Counter");

    let dispatcher = ICounterDispatcher { contract_address };

    let value = dispatcher.get_counter();
    assert(value == 0, 'Invalid value');

    dispatcher.increase_counter();

    let value = dispatcher.get_counter();
    assert(value == 1, 'Invalid value');
}


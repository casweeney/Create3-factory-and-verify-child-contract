# Create3 Factory Contract

This project demonstrates how to create clone contracts using create3 and also verify that the clone was actually created by the factory contract.

Given a salt, an address for the clone contract can be derived and with this, you can verify the clone contract with same salt.

To test this project, clone it and run the following:

```
npx hardhat test
npx hardhat run scripts/deploy.ts
```

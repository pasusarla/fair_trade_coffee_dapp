# Fair Trade Coffee DApp

This distributed app on Ethereum implements a very simple supply chain for a coffee product.

Details on -

* the attributes of this product
* each of the actors in the supply chain and their roles and responsibilities, and
* the state of the supply chain

can be found in the UML diagrams inside the uml/ folder under the project root.

## Operating the web app

1. Add each of the 4 addresses - farmer, distributor, retailer, consumer - preferably using the contract owner address in Metamask to sign this transaction
2. Fetch the details and supply chain state of any UPC, which is a strictly positive integer only at this point, with a maximum possible value of (2^256 - 1)
3. To add a new UPC to the supply chain, enter the UPC value, select the farmer's account from Metamask, change any of the other product attributes and click on 'Harvest'
4. The only allowed order of operations is -
    1. Harvest > Process > Pack > ForSale (by farmer role only), then
    2. Buy > Ship (by distributor role only), then
    3. Receive (by retailer role only), then
    4. Purchase (by consumer role only)

## Versions of various packages
```
$ truffle version
Truffle v5.1.47 (core: 5.1.47)
Solidity - 0.6.12 (solc-js)
Node v14.12.0
Web3.js v1.2.1
```

```
$ npm ls truffle-hdwallet-provider lite-server web3
fair-trade-coffee-dapp@1.0.0 
+-- lite-server@2.4.0
`-- truffle-hdwallet-provider@1.0.17
  `-- web3@1.2.1
```
truffle-hdwallet-provider is used to run the truffle test suite on the public test network (Ropsten, in this case). This library can be initialized to allow the calling code to access just the required number of accounts (5, in this case) given the seed phrase.
lite-server is used to run the client-facing web app.
web3 is self-explanatory.

## Token Identification
***The Ropsten test network was used instead of the Rinkeby test network, simply because of how painful Rinkeby makes it to get test Ether, compared to Ropsten's absolutely straight-forward faucet.***

### Contract address
Ropsten contract address: https://ropsten.etherscan.io/address/0x2476e91aee8f48f07d492358e29d53f9a56e647a

Ropsten contract creation transaction: https://ropsten.etherscan.io/tx/0x4c694d6784a67d678d70b14d8ac8fa1adafd675ac73f68ccf1cb6b8d9104685e

### Entire lifecycle for a UPC:
Create Participants - https://ropsten.etherscan.io/tx/0x59c750308427745551953b423a4a9e50e26411fa4dfe3bd28cd4df020cc06014

    Events emitted:
        1. FarmerAdded
        2. DistributorAdded
        3. RetailerAdded
        4. ConsumerAdded

Harvested - https://ropsten.etherscan.io/tx/0xc72a27618c5027f5a1e45232fc3e318ccdf0a3a14fc606b5eec046c2591dd992

    Additional event emitted:
        1. TransferOwnership

Processed - https://ropsten.etherscan.io/tx/0x9442f730f1d7313627c5ad5e3da0630fad9b8f7ff9cd9c6ae249b5132a457dbf

Packed - https://ropsten.etherscan.io/tx/0x05cf8b4342b6e7b6ad923113eb36965e11c7e9eb13ef9787839be75cdb25eced

ForSale - https://ropsten.etherscan.io/tx/0x0fcc807a773a7235159233d8f5ca7014b6d08374f7594b99b4a79c20e15d9036

Sold - https://ropsten.etherscan.io/tx/0x33f914875f644f8ed3eeb30cb8968aae198d42e92770d769bb6a31d36916cf8a

    Additional event emitted:
        1. TransferOwnership

Shipped - https://ropsten.etherscan.io/tx/0x07599357cba96a55c0357fd80c617a0b860a9fa527f4a403c86ede6b51ef45b4

Received - https://ropsten.etherscan.io/tx/0x2508d9030901cfc0a858198009f7e5ccd931fbbac0e7f191b7b7050a631a9cd2

    Additional event emitted:
        1. TransferOwnership

Purchased - https://ropsten.etherscan.io/tx/0xcb6ffd7fb5436df78f9e37e574ee968355332da0453c9e66a06d54721838187a

    Additional event emitted:
        1. TransferOwnership

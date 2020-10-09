# Fair Trade Coffee DApp

This distributed app on Ethereum implements a very simple supply chain for a coffee product.

Details on -

* the attributes of this product
* each of the actors in the supply chain and their roles and responsibilities, and
* the state of the supply chain

can be found in the UML diagrams inside the uml/ folder under the project root.

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
Ropsten contract address: https://ropsten.etherscan.io/address/0x80821b4e459f5fc5de501198827a039dd743a916
Ropsten contract creation transaction: https://ropsten.etherscan.io/tx/0x7505bbfa39d17c7414d24f751b6b173a3f6861cf2f87a51af6be4b55685babee

Entire lifecycle for UPC 2:
Harvested - https://ropsten.etherscan.io/tx/0x92f16ea4d86b0db035a909482241367cd06d59711a96dca4f19019c8c87c502a
Processed - https://ropsten.etherscan.io/tx/0x3ea5b9640833c92c2256911ff76a4aa27df79aa9b2b6f0670990739b994cd461
Packed - https://ropsten.etherscan.io/tx/0x15dade0520c2ffda3d41e7e48a067aa33222df6982cc3ca2c4a97b0c2a29c2d9
ForSale - https://ropsten.etherscan.io/tx/0x1cbcbb4835edbe86d8c1c599d6703d0bb85b64cd530ee418537c482c2e9c00a6
Sold - https://ropsten.etherscan.io/tx/0x4538abd1c75864a953069564a7e4a831ffd359cce22357d9e99a4f6d5a596409
Shipped - https://ropsten.etherscan.io/tx/0x9736b737937e95cbc58a834696035f6d27b626ac26bb90e44d4a62c1853477cc
Received - https://ropsten.etherscan.io/tx/0xa6b15fa39a6c28b860a4ed5a08faffe4bb832251bbecc1bf5d6ae0f3d05ab1b8
Purchased - https://ropsten.etherscan.io/tx/0x3343f4df3436aac83a867695b54f0a20949fe7fb694a4a9b4da1c9bff71e7c20

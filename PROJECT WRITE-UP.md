# Fair Trade Coffee DApp - Project Write-up

### Motivation and examples

The motivation behind this project is to get a feel for hands-on implementation of a solution to the problem of the provenance of an item in a supply chain. In many supply chains today, customers are mindful of the ESG (Environmental, Social, Governance) impact of the operations involved in the production, marketing, distribution and consumption of the end-product. One of the many topics under the umbrella of ESG is that of provenance, or the source or lineage of a product.

In the case of coffee, for example, consumers may want to understand if the farms on which the coffee plants were grown and the beans harvested are certified for organic farming practices, environmental sustainability and lack of child labour.

A centralised supply chain may not transparently make publicly available all of the information regarding the operations involved. This is where a blockchain-based solution can help.

Other examples include diamond provenance, so that customers aren't buying "blood diamonds", or halal/kosher food processing.

### Solution architecture

The solution architecture for this academic example is very simple -

* Ethereum smart contracts power supply chain operations and maintain the state of the supply chain
* A simple webapp interacts with the supply chain via Metamask and Web3
* Truffle tests are also bundled with the project to enable testing from the command-line instead of from the webapp
* No traditional database or distributed file storage is used for off-chain state, because no such state data exists as of now

### Implementation of the architecture

The smart contracts are designed according to the following pattern -

* Access control classes that inherit from a base role and extend it with role-specific functions in their respective classes. In this case, there are only 4 actors - farmer, distributor, retailer and consumer. Each of these 4 accounts or addresses is managed by the respective class in this set of classes
* A base class that implements all of the supply chain logic and the state of the supply chain
* A core class that manages ownership of the contract and of the items within the supply chain

### Architecture and implementation evaluation

From the perspective of a simple exercise, this architecture gets the job done. However, it's fairly limited in its complexity and in terms of modelling a real-world supply chain. For example, some of the following features are a basic necessity -

* Some form of off-chain storage - decentralised or otherwise - for various artifacts and custom state variables
* Refunds/returns
* Roles such as auditors/certifying authorities
* Integration of real-world sensor information and establishing the authenticity of the same
* Multi-sig and other such techniques to prevent bad actors from messing up the state of the supply chain
* Gas usage controls etc.
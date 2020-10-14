App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    init: async function() {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function() {
        App.upc = $("#upc").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
    },

    initWeb3: async function() {
        function handleAccountsChanged(accounts) {
            if (accounts.length === 0) {
                // MetaMask is locked or the user has not connected any accounts
                console.log('Please connect to MetaMask.');
            } else if (accounts[0] !== App.metamaskAccountID) {
                // Retrieving accounts
                App.metamaskAccountID = accounts[0];
                if (App.ownerID === App.emptyAddress) {
                    App.ownerID = accounts[0];
                    web3.eth.defaultAccount = accounts[0];
                }
            }
        }

        App.web3Provider = window.ethereum;
        
        if (App.web3Provider) {
            // From now on, this should always be true:
            // provider === window.ethereum
            if (App.web3Provider !== window.ethereum) {
                console.error('Do you have multiple wallets installed?');
            }
        } else {
          console.log('Please install MetaMask!');
        }

        ethereum.on('chainChanged', function(_chainId) {
            window.location.reload();
        });

        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (App.web3Provider) {
            // Request account access
            accounts = ethereum.request({method: 'eth_accounts'})
                               .then(handleAccountsChanged)
                               .catch((err) => {
                                   console.error(err);
                               });
            ethereum.on('accountsChanged', handleAccountsChanged);
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
            accounts = web3.eth.accounts;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
            web3 = new Web3(App.web3Provider);
            accounts = web3.eth.accounts;
        }

        return App.initSupplyChain();
    },

    initSupplyChain: function() {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();
        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $("button").on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        App.upc = $("#upc").val();

        var processId = parseInt($(event.target).data('id'));
        switch (processId) {
            case 1:
                await App.harvestItem(event);
                break;
            case 2:
                await App.processItem(event);
                break;
            case 3:
                await App.packItem(event);
                break;
            case 4:
                await App.sellItem(event);
                break;
            case 5:
                await App.buyItem(event);
                break;
            case 6:
                await App.shipItem(event);
                break;
            case 7:
                await App.receiveItem(event);
                break;
            case 8:
                await App.purchaseItem(event);
                break;
            case 9:
                await App.addParticipants(event);
                return;
            default:
                break;
        }

        await App.fetchItemBufferOne();
        await App.fetchItemBufferTwo();

        return;
    },

    addParticipants: function(event) {
        event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            let farmerID = $("#setFarmerID").val();
            let distributorID = $("#setDistributorID").val();
            let retailerID = $("#setRetailerID").val();
            let consumerID = $("#setConsumerID").val();
            return instance.addParticipants(farmerID, distributorID, retailerID, consumerID, {from: App.metamaskAccountID});
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    harvestItem: function(event) {
        event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            App.originFarmerID = App.metamaskAccountID;
            $("#farmerID").html(App.originFarmerID);

            return instance.harvestItem(
                App.upc, 
                App.metamaskAccountID, 
                App.originFarmName, 
                App.originFarmInformation, 
                App.originFarmLatitude, 
                App.originFarmLongitude, 
                App.productNotes,
                {from: App.metamaskAccountID}
            );
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    processItem: function (event) {
        event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            App.originFarmerID = App.metamaskAccountID;
            $("#farmerID").html(App.originFarmerID);

            return instance.processItem(App.upc, {from: App.metamaskAccountID});
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    packItem: function (event) {
        event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            App.originFarmerID = App.metamaskAccountID;
            $("#farmerID").html(App.originFarmerID);

            return instance.packItem(App.upc, {from: App.metamaskAccountID});
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    sellItem: function (event) {
        event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            App.originFarmerID = App.metamaskAccountID;
            $("#farmerID").html(App.originFarmerID);

            return instance.sellItem(App.upc, App.productPrice, {from: App.metamaskAccountID});
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    buyItem: function (event) {
        event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            App.distributorID = App.metamaskAccountID;
            $("#distributorID").html(App.distributorID);
            const walletValue = web3.toWei(2000000000, "wei");

            return instance.buyItem(App.upc, {from: App.metamaskAccountID, value: walletValue});
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    shipItem: function (event) {
        event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            App.distributorID = App.metamaskAccountID;
            $("#distributorID").html(App.distributorID);

            return instance.shipItem(App.upc, {from: App.metamaskAccountID});
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    receiveItem: function (event) {
        event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            App.retailerID = App.metamaskAccountID;
            $("#retailerID").html(App.retailerID);
            const walletValue = web3.toWei(2000000000, "wei");

            return instance.receiveItem(App.upc, {from: App.metamaskAccountID, value: walletValue});
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    purchaseItem: function (event) {
        event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            App.consumerID = App.metamaskAccountID;
            $("#consumerID").html(App.consumerID);
            const walletValue = web3.toWei(2000000000, "wei");

            return instance.purchaseItem(App.upc, {from: App.metamaskAccountID, value: walletValue});
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchItemBufferOne: function() {
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.fetchItemBufferOne(App.upc);
        }).then(function(result) {
            App.ownerID = result[2];
            $("#ownerID").html(App.ownerID);
            App.originFarmerID = result[3];
            $("#farmerID").html(App.originFarmerID);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchItemBufferTwo: function() {
        App.contracts.SupplyChain.deployed().then(function(instance) { 
            return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function(result) {
            App.distributorID = result[6];
            $("#distributorID").html(App.distributorID);
            App.retailerID = result[7];
            $("#retailerID").html(App.retailerID);
            App.consumerID = result[8];
            $("#consumerID").html(App.consumerID);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(App.contracts.SupplyChain.currentProvider, arguments);
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
            var events = instance.allEvents(function(err, log) {
                if (!err)
                    $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
            });
        }).catch(function(err) {
          console.log(err.message);
        });
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
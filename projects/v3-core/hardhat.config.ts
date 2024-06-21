import 'hardhat-typechain'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'

export default {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    seiTset: {
      url: `https://evm-rpc-arctic-1.sei-apis.com`,
      accounts: [],
    },

    seiMainnet: {
      url: `https://evm-rpc.sei-apis.com`,
      accounts: [],
    },
  },
  etherscan: {
    apiKey: {
      seiMainnet: "",
    },
    customChains: [
      {
        network: "seiMainnet",
        chainId: 1329,
        urls: {
          apiURL: "https://seitrace.com/pacific-1/api",
          browserURL: "https://seitrace.com"
        }
      }
    ]
  },

  solidity: {
    version: '0.7.6',
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
      metadata: {
        // do not include the metadata hash, since this is machine dependent
        // and we want all generated code to be deterministic
        // https://docs.soliditylang.org/en/v0.7.6/metadata.html
        bytecodeHash: 'none',
      },
    },
  },
}

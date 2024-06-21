import bn from "bignumber.js";
import { Contract, ContractFactory, utils, BigNumber } from "ethers";
import { ethers, waffle } from "hardhat";
import { linkLibraries } from "../util/linkLibraries";

// test
// namespace ContractAddresses {
//   export let Multicall: string =`0xE5B7f03363CE9CbD393F178F1cB6B5584386b0CC` ;
//   export let UniswapInterfaceMulticall: string =`0xCc2c5456CD2d19E4521df2071AaCDFB8BB48ad80`;
//   export let TickLens: string =`0x189653848715d11acC992260962b044DA1521Fd1`;
//   export let WSEI: string = `0xE243244c5B04e414151bDE722e0bFb381c899922`;
//   export let XeiV3Factory_address: string = `0x79053641495cBbB965B07ED4281CD0cffe340249`;
//   export let NFTDescriptor: string =`0x1fe751565aBA04e0520A28Da7f108e1BC5f6128B` ;
//   export let NonfungibleTokenPositionDescriptor: string =`0x55508C9AF396aA198dcb172f636d0086cB716B75`;
//   export let NonfungiblePositionManager: string =`0xBE4e3647091F3136254Ea93800D3e948f35af8a6`;
// }

// main
namespace ContractAddresses {
  export let Multicall: string =`0x30CD4dBD2afb9bC3D4353457b6ba9eD01A114Ba1` ;
  export let UniswapInterfaceMulticall: string =`0x426D79927B0B0189edF48165aC40483F8a344dD1`;
  export let TickLens: string =`0xF77a6fEe49898a76C0Ad14e2cbb32Ca30669aF57`;
  export let WSEI: string = `0xE30feDd158A2e3b13e9badaeABaFc5516e95e8C7`;
  export let XeiV3Factory_address: string = `0x0596a0469D5452F876523487251BDdE73D4B2597`;
  export let NFTDescriptor: string =`0x18d49347f5620235cdb8cbc001cc266f65Fc0D96` ;
  export let NonfungibleTokenPositionDescriptor: string =`0x08bCB61a01866c8d444c3F43546d097a3bd5d855`;
  export let NonfungiblePositionManager: string =`0x705e082c966Dd842030f9B6736A41A66551b8237` ;
}

type ContractJson = { abi: any; bytecode: string };
const artifacts: { [name: string]: ContractJson } = {
   // eslint-disable-next-line global-require
  TickLens: require("../artifacts/contracts/lens/TickLens.sol/TickLens.json"),
   // eslint-disable-next-line global-require
  Multicall: require("../artifacts/contracts/base/Multicall.sol/Multicall.json"),
  UniswapInterfaceMulticall: require("../artifacts/contracts/base/UniswapInterfaceMulticall.sol/UniswapInterfaceMulticall.json"),
  // eslint-disable-next-line global-require
  NFTDescriptor: require("../artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json"),
  // eslint-disable-next-line global-require
  NonfungibleTokenPositionDescriptor: require("../artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json"),
  // eslint-disable-next-line global-require
  NonfungiblePositionManager: require("../artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
};


async function main() {
  const [owner] = await ethers.getSigners();
  const provider = waffle.provider;
  console.log("owner", owner.address);

  // ============================depoly TickLens =====================================
  if (!ContractAddresses.TickLens) {
    const TickLens = new ContractFactory(artifacts.TickLens.abi, artifacts.TickLens.bytecode, owner);
    const tickLens = await TickLens.deploy();
    ContractAddresses.TickLens = tickLens.address;
    console.log("ContractAddresses.TickLens:", ContractAddresses.TickLens);
  }

   // ============================depoly Multicall =====================================
   if (!ContractAddresses.Multicall) {
    const Multicall = new ContractFactory(artifacts.Multicall.abi, artifacts.Multicall.bytecode, owner);
    const multicall = await Multicall.deploy();
    ContractAddresses.Multicall = multicall.address;
    console.log("ContractAddresses.Multicall:", ContractAddresses.Multicall);
  }

   // ============================depoly UniswapInterfaceMulticall =====================================
   if (!ContractAddresses.UniswapInterfaceMulticall) {
    const UniswapInterfaceMulticall = new ContractFactory(artifacts.UniswapInterfaceMulticall.abi, artifacts.UniswapInterfaceMulticall.bytecode, owner);
    const uniswapInterfaceMulticall = await UniswapInterfaceMulticall.deploy();
    ContractAddresses.UniswapInterfaceMulticall = uniswapInterfaceMulticall.address;
    console.log("ContractAddresses.UniswapInterfaceMulticall:", ContractAddresses.UniswapInterfaceMulticall);
  }

  // ============================depoly NFTDescriptor =====================================
  if (!ContractAddresses.NFTDescriptor) {
    const NFTDescriptor = new ContractFactory(artifacts.NFTDescriptor.abi, artifacts.NFTDescriptor.bytecode, owner);
    const nftDescriptor = await NFTDescriptor.deploy();
    ContractAddresses.NFTDescriptor = nftDescriptor.address;
    console.log("ContractAddresses.NFTDescriptor:", ContractAddresses.NFTDescriptor);
  }

  // ============================ depoly NonfungibleTokenPositionDescriptor ================
  if (!ContractAddresses.NonfungibleTokenPositionDescriptor) {
    const linkedBytecode = linkLibraries(
      {
        bytecode: artifacts.NonfungibleTokenPositionDescriptor.bytecode,
        linkReferences: {
          "NFTDescriptor.sol": {
            NFTDescriptor: [
              {
                length: 20,
                start: 1005,
              },
            ],
          },
        },
      },
      {
        NFTDescriptor: ContractAddresses.NFTDescriptor,
      }
    );
  const NonfungibleTokenPositionDescriptor = new ContractFactory(
    artifacts.NonfungibleTokenPositionDescriptor.abi,
    linkedBytecode,
    owner
  );
  const nonfungibleTokenPositionDescriptor = await NonfungibleTokenPositionDescriptor.deploy(
    ContractAddresses.WSEI,
  );
   ContractAddresses.NonfungibleTokenPositionDescriptor = nonfungibleTokenPositionDescriptor.address;
   console.log("ContractAddresses.NonfungibleTokenPositionDescriptor:", ContractAddresses.NonfungibleTokenPositionDescriptor);
  }
  
   // ============================ depoly NonfungiblePositionManager ================
   if (!ContractAddresses.NonfungiblePositionManager) {
    const NonfungiblePositionManager = new ContractFactory(
      artifacts.NonfungiblePositionManager.abi,
      artifacts.NonfungiblePositionManager.bytecode,
      owner
    );
    const nonfungiblePositionManager = await NonfungiblePositionManager.deploy(
      ContractAddresses.XeiV3Factory_address,
      ContractAddresses.WSEI,
      ContractAddresses.NonfungibleTokenPositionDescriptor
    );
    ContractAddresses.NonfungiblePositionManager = nonfungiblePositionManager.address;
   console.log("ContractAddresses.NonfungiblePositionManager:", ContractAddresses.NonfungiblePositionManager)
   }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

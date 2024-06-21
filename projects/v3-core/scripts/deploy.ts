import { ContractFactory } from 'ethers'
import { ethers, network } from 'hardhat'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  XeiV3Factory: require('../artifacts/contracts/XeiV3Factory.sol/XeiV3Factory.json'),
}

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name
  console.log('owner', owner.address)

  let xeiV3Factory_address = ''
  let xeiV3Factory
  if (!xeiV3Factory_address) {
    const XeiV3Factory = new ContractFactory(
      artifacts.XeiV3Factory.abi,
      artifacts.XeiV3Factory.bytecode,
      owner
    )
    xeiV3Factory = await XeiV3Factory.deploy()

    xeiV3Factory_address = xeiV3Factory.address
    console.log('xeiV3Factory', xeiV3Factory_address)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

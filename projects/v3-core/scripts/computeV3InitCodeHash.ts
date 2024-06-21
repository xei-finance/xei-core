import { ethers } from 'hardhat'
import XeiV3Pool  from '../artifacts/contracts/XeiV3Pool.sol/XeiV3Pool.json'

const hash = ethers.utils.keccak256(XeiV3Pool.bytecode)
console.log(hash)

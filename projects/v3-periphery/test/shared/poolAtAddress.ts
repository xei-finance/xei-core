import { abi as POOL_ABI } from '../../../v3-core/artifacts/contracts/XeiV3Pool.sol/XeiV3Pool.json'
import { Contract, Wallet } from 'ethers'
import { IXeiV3Pool } from '../../typechain'

export default function poolAtAddress(address: string, wallet: Wallet): IXeiV3Pool {
  return new Contract(address, POOL_ABI, wallet) as IXeiV3Pool
}

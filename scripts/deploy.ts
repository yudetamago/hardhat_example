import { ethers } from 'hardhat'
import { MyToken__factory as MyTokenFactory } from '../typechain'

async function main() {
  const [deployer] = await ethers.getSigners()
  const factory = new MyTokenFactory(deployer)
  const myToken = await factory.deploy()

  console.log('MyToken deployed to:', myToken.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

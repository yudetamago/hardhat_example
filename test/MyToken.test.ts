import { expect } from 'chai'
import { ethers } from 'hardhat'
import { MyToken, MyToken__factory as MyTokenFactory } from '../typechain'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { BigNumber } from 'ethers'

describe('MyToken', () => {
  let myToken: MyToken
  let owner: SignerWithAddress
  let addr1: SignerWithAddress

  beforeEach(async () => {
    ;[owner, addr1] = await ethers.getSigners()
    const factory = new MyTokenFactory(owner)
    myToken = await factory.deploy()
  })

  describe('transfer', () => {
    it('can transfer 10 amount', async () => {
      const amount = 10
      const previous = await myToken.balanceOf(addr1.address)
      await myToken.transfer(addr1.address, amount)
      const current = await myToken.balanceOf(addr1.address)
      const actual = current.sub(previous)
      const expected = BigNumber.from(amount)
      expect(actual).to.equal(expected)
    })

    it('cannot transfer 100000 amount', async () => {
      const amount = 100000
      await expect(myToken.transfer(addr1.address, amount)).to.be.reverted
    })
  })
})

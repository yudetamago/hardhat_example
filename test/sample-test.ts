import { expect } from "chai";
import { ethers } from "hardhat";
import { Greeter__factory as greeterFactory } from "../typechain";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const [deployer] = await ethers.getSigners();
    const factory = new greeterFactory(deployer);
    const greeter = await factory.deploy("Hello, world!")

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';

import { expect, assert } from 'chai';
import hre from 'hardhat';

describe('KitalfaToken Tests', function () {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const KitalfaToken = await hre.ethers.getContractFactory('KitalfaToken');
    const kitalfaToken = await KitalfaToken.deploy();

    return { kitalfaToken, owner, otherAccount };
  }

  describe('Deployment', function () {
    it('Should deploy the contract and get the right price for 1 ETH', async function () {
      const { kitalfaToken, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      const ethPriceFromChainLink =
        await kitalfaToken.getChainlinkDataFeedLatestAnswer();
      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainLink, 8);
      console.log('ETH price in dollars:', ethInDollars);
      assert(parseInt(ethInDollars) > 0, 'ETH price is not greater than 0');
    });
  });

  describe('Minting', function () {
    it('Should Not mint of not enought funds are provided', async function () {
      const { kitalfaToken, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      const ethPriceFromChainLink =
        await kitalfaToken.getChainlinkDataFeedLatestAnswer();
      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainLink, 8);
      const amountMint = 18;
      const amountEthFor18Tokens = (10 * amountMint) / parseInt(ethInDollars);
      const priceFor18Tokens = hre.ethers.parseEther(
        amountEthFor18Tokens.toString()
      );
      await expect(
        kitalfaToken.mint(owner.address, 20, { value: priceFor18Tokens })
      ).to.be.revertedWith('Insufficient funds');
    });
    it('Should mint if enough funds are provided', async function () {
      const { kitalfaToken, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      const ethPriceFromChainLink =
        await kitalfaToken.getChainlinkDataFeedLatestAnswer();
      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainLink, 8);
      const amountMint = 18;
      const amountEthFor18Tokens = (10 * amountMint) / parseInt(ethInDollars);
      const priceFor18Tokens = hre.ethers.parseEther(
        amountEthFor18Tokens.toString()
      );
      await kitalfaToken.mint(owner.address, 17, { value: priceFor18Tokens });
      const balance = await kitalfaToken.balanceOf(owner.address);
      expect(balance).to.equal(17);
    });
  });
});

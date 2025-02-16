//SPDX-Licence-Identifier: MIT
pragma solidity ^0.8.28;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DataConsumerV3.sol";

contract KitalfaToken is ERC20, Ownable, DataConsumerV3 {
    uint256 private constant PRICE_PER_TOKEN = 10;

    constructor() ERC20("KitalfaToken", "KTL") Ownable(msg.sender) {        
    }

    function mint(address _to, uint256 _amount) external payable {   
        // Le prix est récupéré avec 8 décimales     
        int256 ethInDollars = getChainlinkDataFeedLatestAnswer();
        require(ethInDollars > 0, "Invalid price feed value");
        // Prix en dollars pour 1 token
        uint256 ethInDollarsUint = uint256(ethInDollars / 1e8);
        console.log("Eth in dollars: %s", ethInDollarsUint);
        uint256 expectedPriceInWei = (PRICE_PER_TOKEN * 1 ether * _amount) / ethInDollarsUint;
        console.log("Expected price in wei: %s", expectedPriceInWei);
        console.log("msg.value: %s", msg.value);
        
        require(msg.value >= expectedPriceInWei, "Insufficient funds");
        _mint(_to, _amount);
    }

}
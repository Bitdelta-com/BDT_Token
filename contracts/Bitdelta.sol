// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BitDelta is ERC20, Ownable {
   // Defining the maximum supply of tokens
  uint256 public constant MAX_SUPPLY = 2_400_000_000_000_000_000_000_000_000;
  
  constructor( 
        // Receives an array of 13 addresses to which initial token amounts will be minted
        address[13] memory addresses
        ) ERC20("BitDelta","BDT") {
        // Minting tokens to the supplied addresses with respective purposes
        _mint(addresses[0], 240_000_000 * (10 ** decimals()));//KOL Branding
        _mint(addresses[1], 360_000_000 * (10 ** decimals()));//Platform Governance
        _mint(addresses[2], 240_000_000 * (10 ** decimals()));//Team Incentive
        _mint(addresses[3], 240_000_000 * (10 ** decimals()));//Referral and Airdrop
        _mint(addresses[4], 240_000_000 * (10 ** decimals()));//Ecosystem
        _mint(addresses[5], 120_000_000 * (10 ** decimals()));//Project Advisory Panel
        _mint(addresses[6], 120_000_000 * (10 ** decimals()));//Staking
        _mint(addresses[7], 120_000_000 * (10 ** decimals()));//Founders and Affiliates
        _mint(addresses[8], 120_000_000 * (10 ** decimals()));//Strategy
        _mint(addresses[9], 120_000_000 * (10 ** decimals()));//Treasury and Platform
        _mint(addresses[10], 159_840_000 * (10 ** decimals()));//Private Sale 1
        _mint(addresses[11], 159_840_000 * (10 ** decimals()));//Private Sale 2
        _mint(addresses[12], 160_320_000 * (10 ** decimals()));//Public Sale
  }

}

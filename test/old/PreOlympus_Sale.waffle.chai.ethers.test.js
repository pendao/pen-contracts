// // const { utils } = require("ethers").utils;
// const { expect } = require("chai");
// const { ethers, waffle } = require("hardhat");
// // const { waffle } = require("hardhat");
// // const { deployContract } = waffle;
// // const { expectRevert, time, BN } = require('@openzeppelin/test-helpers');
// // const { deployContract, loadFixture } = waffle;

// describe(
//   "PrePenDaoSales",
//   function () {

//     const ONE = 1;
//     const HUNDRED = 100;
//     const THOUSAND = 1000;
//     const MILLION = 1000000;
//     const BILLION = 1000000000;

//     // Wallets
//     let deployer;
//     let buyer1;
//     let saleProceeds;

//     // Contracts
//     let PrePenDaoTokenContract;
//     let poly;

//     let PrePenDaoSaleContract;
//     let sale;

//     let DAITokenContract;
//     let dai;

//     // let WBTCTokenContract;
//     // let wbtc;

//     // let UniswapV2FactoryContract;
//     // let factory;

//     // let UniswapV2EouterContract;
//     // let router;

//     // let UniswapV2Pair;
//     // let daitEthPairl
//     // let ethWBTCPair;

//     beforeEach(
//       async function () {
//         [
//           deployer,
//           buyer1,
//           saleProceeds
//         ] = await ethers.getSigners();

//         console.log( "Test::PrePenDao::beforeEach:01 deployer address is %s.", deployer.address );
//         console.log( "Test::PrePenDao::beforeEach:02 buyer1 address is %s.", buyer1.address );

//         console.log( "Test::PrePenDao::beforeEach:03 Loading PrePenDaoToken." );
//         PrePenDaoTokenContract = await ethers.getContractFactory("PrePenDaoToken");

//         console.log( "Test::PrePenDao::beforeEach:04 Deploying PrePenDaoToken." );
//         poly = await PrePenDaoTokenContract.connect( deployer ).deploy();
//         // await poly.deployed();
//         console.log( "Test::PreePenDaoSale:beforeEach:05 PrePenDaoToken address is %s,", poly.address );

//         console.log( "Test::PreePenDaoSale::beforeEach:06 Loading DAI." );
//         DAITokenContract = await ethers.getContractFactory("DAI");

//         console.log( "Test::PreePenDaoSale::beforeEach:07 Deploying DAI." );
//         dai = await DAITokenContract.connect( deployer ).deploy( 1 );
//         await dai.deployed();
//         console.log( "Test::PreePenDaoSale:beforeEach:08 DAI address is %s,", dai.address );

        
//         console.log( "Test::PreePenDaoSale::beforeEach:09 Loading PrePenDaoSales." );
//         PrePenDaoSaleContract = await ethers.getContractFactory("PrePenDaoSales");
        
//         console.log( "Test::PreePenDaoSale::beforeEach:10 Deploying PrePenDaoSales." );
//         sale = await PrePenDaoSaleContract.connect( deployer ).deploy();
//         // await sale.deployed();
//         console.log( "Test::PreePenDaoSale:beforeEach:11 PrePenDaoSale address is %s,", sale.address );

        
//         console.Console( "Test::PreePenDaoSale::beforeEach:12 Initializing OLYIntrinsicCalculator." );
//         await sale.initialize( poly.address, dai.address, 100, saleProceeds.address );

//         console.Console( "Test::PreePenDaoSale::beforeEach:13 Minting DAI." );
//         dai.connect(deployer).mint( buyer1.address, ethers.utils.parseUnits( String( MILLION ), "ether" ) );

//         console.Console( "Test::PreePenDaoSale::beforeEach:13 Minting pOLY." );
//         poly.connect(deployer).mint( sale.address, ethers.utils.parseUnits( String( BILLION ), "ether" ) );

//       }
//     );

//     describe(
//       "Sale",
//       function () {
//         it( 
//           "DAIPurchase",
//           async function() {

//             console.log("Test::PreePenDaoSale::Sale::DAIPurchase:01 buyer1 dai balanceOf.");
//             expect( await dai.connect(deployer).balanceOf( buyer1.address ) )
//               .to.equal( String( ethers.utils.parseUnits( String( MILLION ), "ether" ) ) );

//             console.log("Test::PreePenDaoSale::Sale::DAIPurchase:02 sale poly balanceOf.");
//             expect( await poly.connect(deployer).balanceOf( sale.address ) )
//               .to.equal( String( ethers.utils.parseUnits( String( BILLION ), "ether" ) ) );

//             await sale.connect(deployer).approveBuyer( buyer1.address );

//               await expect( dai.connect(buyer1).approve( sale.address, ethers.utils.parseUnits( String( MILLION ), "ether" ) ) )
//               .to.emit( dai, "Approval" )
//               .withArgs( buyer1.address, sale.address, ethers.utils.parseUnits( String( MILLION ), "ether" ) );

//             expect( await dai.connect(buyer1).allowance( buyer1.address, sale.address ) )
//               .to.equal( ethers.utils.parseUnits( String( MILLION ), "ether" ) );

//             // await expect( sale.connect(buyer1).buyPOly( ethers.utils.parseUnits( String( 100 ), "ether" ) ) )
//             //   .to.be.revertedWith( "Sale is not active." );

//               // expect( await dai.connect(buyer1).allowance( buyer1.address, sale.address ) )
//               // .to.equal( ethers.utils.parseUnits( String( 100 ), "ether" ) );

//             // await sale.connect(deployer).startSale();
            
//             console.log("Test::PreePenDaoSale::Sale::DAIPurchase:03 Approve sale to sell.");
//             await poly.connect(deployer).addApprovedSeller( sale.address );

//             console.log("Test::PreePenDaoSale::Sale::DAIPurchase:04 sale is approvedSeller.");
//             expect( await poly.isApprovedSeller( sale.address ) ).to.equal( true );

//             // await expect( dai.connect(buyer1).approve( sale.address, ethers.utils.parseUnits( String( 100 ), "ether" ) ) )
//             //   .to.emit( dai, "Approval" )
//             //   .withArgs( buyer1.address, sale.address, ethers.utils.parseUnits( String( 100 ), "ether" ) );

//             // expect( await dai.connect(buyer1).allowance( buyer1.address, sale.address ) )
//             //   .to.equal( ethers.utils.parseUnits( String( 100 ), "ether" ) );

//             await expect( () => sale.connect(buyer1).buyPOly( ethers.utils.parseUnits( String( MILLION ), "ether" ) ) )
//               .to.changeTokenBalance( poly, buyer1, ethers.utils.parseUnits( String( (MILLION * 100) ), "ether" ) );

            
//               console.log("Test::PreePenDaoSale::Sale::DAIPurchase:05 buyer1 dai balanceOf.");
//               expect( await dai.connect(deployer).balanceOf( buyer1.address ) )
//                 .to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

//             // console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//             // expect( await poly.connect(buyer1).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 1000 ), "ether" ) ) );
            
//             // console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//             // expect( await dai.connect(buyer1).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 900 ), "ether" ) ) );

//             /*****************************************************************************************************************************************************/

//             // poly.connect(deployer).transfer( sale.address, ethers.utils.parseUnits( String( 1000000000 ), "ether" ) );

//             // dai.connect(deployer).transfer( buyer1.address, ethers.utils.parseUnits( String( 1000 ), "ether" ) );

//             /******************************************************************************************************************************/

//             // console.log("Test::PrePenDaoSaleDeployment::DeploymentSuccess: token name.");
//             // expect( await poly.name() ).to.equal("PrePenDao");

//             // console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: token symbol.");
//             // expect( await poly.symbol() ).to.equal("pOLY");

//             // console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: token decimals.");
//             // expect( await poly.decimals() ).to.equal(18);

//             // console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: owner.");
//             // expect( await poly.owner() ).to.equal(deployer.address);
            
//             // console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: Confirm minting enabled.");
//             // expect( await poly.connect( deployer ).allowMinting() ).to.equal( true );

//             // console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: Confirm seller approval enabled.");
//             // expect( await poly.connect( deployer ).requireSellerApproval() ).to.equal( true );

            
            
//             // console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: poly is approvedSeller.");
//             // expect( await poly.isApprovedSeller(poly.address) ).to.equal( true );
            
//             // console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//             // expect( await poly.isApprovedSeller( ethers.constants.AddressZero ) ).to.equal( true );
            
//             // console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//             // expect( await poly.isApprovedSeller( buyer1.address ) ).to.equal( false );
            
//             // console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//             // expect( await poly.isApprovedSeller( buyer2.address ) ).to.equal( false );

//             // console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: totalSupply.");
//             // expect( await poly.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) );

//             // console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: owner balanceOf.");
//             // expect( await poly.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) ) );

//             // console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//             // expect( await poly.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

//             // console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//             // expect( await poly.connect(deployer).balanceOf(buyer2.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );
//           }
//         );
//       }
//     );

//     // describe(
//     //   "PrePenDaoTokenOwnership",
//     //   function () {
//     //     // it( 
//     //     //   "Minting", 
//     //     //   async function() {
            
//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Confirm minting enabled.");
//     //     //     expect( await poly.connect( deployer ).allowMinting() )
//     //     //       .to.equal( true );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: buyer1 can't mint.");
//     //     //     await expect( poly.connect(buyer1).mint( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith("Ownable: caller is not the owner");
            
//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer1.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: only owner can mint.");
//     //     //     await expect( () => poly.connect(deployer).mint( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) ) )
//     //     //       .to.changeTokenBalance( poly, deployer, ethers.utils.parseUnits( String( 1000000000 ), "ether" ) );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: totalSupply.");
//     //     //     expect( await poly.totalSupply() )
//     //     //       .to.equal( ethers.utils.parseUnits( String( 2000000000 ), "ether" ) );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: owner balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(deployer.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 2000000000 ), "ether" ) ) );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Disable minting.");
//     //     //     await poly.connect( deployer ).disableMinting();
            
//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Disabled minting.");
//     //     //     expect( await poly.connect( deployer ).allowMinting() ).to.equal( false );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: owner can't mint.");
//     //     //     await expect( poly.connect( deployer ).mint( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Minting has been disabled." );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: totalSupply.");
//     //     //     expect( await poly.totalSupply() )
//     //     //       .to.equal( ethers.utils.parseUnits( String( 2000000000 ), "ether" ) );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: owner balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(deployer.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 2000000000 ), "ether" ) ) );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: buyer1 can't mint.");
//     //     //     await expect( poly.connect(buyer1).mint(ethers.utils.parseUnits( String( 1000000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Ownable: caller is not the owner" );
            
//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer1.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );
//     //     //   }
//     //     // );
//     //   }
//     // );

//     // describe(
//     //   "PrePenDaoTokenOwnership",
//     //   function () {

//     //     // it( 
//     //     //   "Post-Deployment Transfer", 
//     //     //   async function() {

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: owner is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller(deployer.address) ).to.equal( true );
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: poly is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller(poly.address) ).to.equal( true );
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( ethers.constants.AddressZero ) ).to.equal( true );
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( buyer1.address ) ).to.equal( false );
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( buyer2.address ) ).to.equal( false );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: totalSupply.");
//     //     //     expect( await poly.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: owner balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer2.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: Confirm seller approval required.");
//     //     //     expect( await poly.requireSellerApproval() ).to.equal( true );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Confirming buyer1 can't transfer to buyer1 because they have no balance.");
//     //     //     await expect( poly.connect(buyer1).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PrePenDaoTokenOwnershi::Minting: Confirming buyer1 can't transfer to buyer2 because they have no balance.");
//     //     //     await expect( poly.connect(buyer1).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Confirming buyer2 can't transfer to buyer1 because they have no balance.");
//     //     //     await expect( poly.connect(buyer2).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Confirming buyer2 can't transfer to buyer2 because they have no balance.");
//     //     //     await expect( poly.connect(buyer2).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Confirming deployer can transfer to buyer1.");
//     //     //     await expect( () => poly.connect(deployer).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.changeTokenBalance( poly, buyer1, ethers.utils.parseUnits( String( 250000000 ), "ether" ) );
            
//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Confirming deployer can transfer to buyer1.");
//     //     //     await expect( () => poly.connect(deployer).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.changeTokenBalance( poly, buyer2, ethers.utils.parseUnits( String( 250000000 ), "ether" ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: deployer balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(deployer.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 500000000 ), "ether" ) ) );
              
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(buyer1).balanceOf(buyer1.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//     //     //     expect( await poly.connect(buyer2).balanceOf(buyer2.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) );

//     //     //   }
//     //     // );

//     //     // it( 
//     //     //   "Approved Seller Transfer", 
//     //     //   async function() {

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: owner is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller(deployer.address) ).to.equal( true );
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: poly is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller(poly.address) ).to.equal( true );
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( ethers.constants.AddressZero ) ).to.equal( true );
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( buyer1.address ) ).to.equal( false );
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( buyer2.address ) ).to.equal( false );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: totalSupply.");
//     //     //     expect( await poly.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: owner balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer2.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

    

//     //     //     /*************************************************************************** */
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: Confirm seller approval required.");
//     //     //     expect( await poly.requireSellerApproval() ).to.equal( true );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Confirming buyer1 can't transfer to buyer1 because they have no balance.");
//     //     //     await expect( poly.connect(buyer1).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PrePenDaoTokenOwnershi::Minting: Confirming buyer1 can't transfer to buyer2 because they have no balance.");
//     //     //     await expect( poly.connect(buyer1).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Confirming buyer2 can't transfer to buyer1 because they have no balance.");
//     //     //     await expect( poly.connect(buyer2).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Confirming buyer2 can't transfer to buyer2 because they have no balance.");
//     //     //     await expect( poly.connect(buyer2).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Confirming deployer can transfer to buyer1.");
//     //     //     await expect( () => poly.connect(deployer).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.changeTokenBalance( poly, buyer1, ethers.utils.parseUnits( String( 250000000 ), "ether" ) );
            
//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Confirming deployer can transfer to buyer1.");
//     //     //     await expect( () => poly.connect(deployer).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.changeTokenBalance( poly, buyer2, ethers.utils.parseUnits( String( 250000000 ), "ether" ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: deployer balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(deployer.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 500000000 ), "ether" ) ) );
              
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(buyer1).balanceOf(buyer1.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//     //     //     expect( await poly.connect(buyer2).balanceOf(buyer2.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Enable open trading of pOLY.");
//     //     //     await poly.connect( deployer ).allowOpenTrading();

            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: Confirm seller approval required.");
//     //     //     expect( await poly.requireSellerApproval() ).to.equal( false );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: only owner can mint.");

//     //     //     expect( await poly.connect(buyer1).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) );

//     //     //     // Don't know why this doesn't work.
//     //     //     // await expect( () => poly.connect(buyer1).transfer( buyer2.address, poly.connect(deployer).balanceOf(buyer1.address) ) )
//     //     //     //   .to.changeTokenBalance( poly, buyer1, ethers.utils.parseUnits( String( 0 ), "ether" ) )
//     //     //     //   .to.changeTokenBalance( poly, buyer2, ethers.utils.parseUnits( String( 500000000 ), "ether" ) );
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer2.address) ).to.equal( String( ethers.utils.parseUnits( String( 500000000 ), "ether" ) ) );
//     //     //   }
//     //     // );

//     //     // it( 
//     //     //   "Open Transfer", 
//     //     //   async function() {

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: owner is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller(deployer.address) ).to.equal( true );
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: poly is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller(poly.address) ).to.equal( true );
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( ethers.constants.AddressZero ) ).to.equal( true );
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( buyer1.address ) ).to.equal( false );
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: address(0) is approvedSeller.");
//     //     //     expect( await poly.isApprovedSeller( buyer2.address ) ).to.equal( false );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: totalSupply.");
//     //     //     expect( await poly.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: owner balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 1000000000 ), "ether" ) ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer2.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: Confirm seller approval required.");
//     //     //     expect( await poly.requireSellerApproval() ).to.equal( true );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Confirming buyer1 can't transfer to buyer1 because they have no balance.");
//     //     //     await expect( poly.connect(buyer1).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PrePenDaoTokenOwnershi::Minting: Confirming buyer1 can't transfer to buyer2 because they have no balance.");
//     //     //     await expect( poly.connect(buyer1).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Confirming buyer2 can't transfer to buyer1 because they have no balance.");
//     //     //     await expect( poly.connect(buyer2).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Confirming buyer2 can't transfer to buyer2 because they have no balance.");
//     //     //     await expect( poly.connect(buyer2).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.be.revertedWith( "Account not approved to trans pOLY." );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Confirming deployer can transfer to buyer1.");
//     //     //     await expect( () => poly.connect(deployer).transfer( buyer1.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.changeTokenBalance( poly, buyer1, ethers.utils.parseUnits( String( 250000000 ), "ether" ) );
            
//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Confirming deployer can transfer to buyer1.");
//     //     //     await expect( () => poly.connect(deployer).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) )
//     //     //       .to.changeTokenBalance( poly, buyer2, ethers.utils.parseUnits( String( 250000000 ), "ether" ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: deployer balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(deployer.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 500000000 ), "ether" ) ) );
              
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(buyer1).balanceOf(buyer1.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//     //     //     expect( await poly.connect(buyer2).balanceOf(buyer2.address) )
//     //     //       .to.equal( String( ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: Enable open trading of pOLY.");
//     //     //     await poly.connect( deployer ).allowOpenTrading();

            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: Confirm seller approval required.");
//     //     //     expect( await poly.requireSellerApproval() ).to.equal( false );

//     //     //     console.log("Test::PrePenDaoTokenOwnership::Minting: only owner can mint.");

//     //     //     expect( await poly.connect(buyer1).transfer( buyer2.address, ethers.utils.parseUnits( String( 250000000 ), "ether" ) ) );

//     //     //     // Don't know why this doesn't work.
//     //     //     // await expect( () => poly.connect(buyer1).transfer( buyer2.address, poly.connect(deployer).balanceOf(buyer1.address) ) )
//     //     //     //   .to.changeTokenBalance( poly, buyer1, ethers.utils.parseUnits( String( 0 ), "ether" ) )
//     //     //     //   .to.changeTokenBalance( poly, buyer2, ethers.utils.parseUnits( String( 500000000 ), "ether" ) );
            
//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer1 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );

//     //     //     console.log("Test::PrePenDaoTokenDeployment::DeploymentSuccess: buyer2 balanceOf.");
//     //     //     expect( await poly.connect(deployer).balanceOf(buyer2.address) ).to.equal( String( ethers.utils.parseUnits( String( 500000000 ), "ether" ) ) );
//     //     //   }
//     //     // );
//     //   }
//     // );
//   }
// );
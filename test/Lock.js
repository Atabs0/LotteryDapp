const {expect}=require("chai");
const {ethers} = require("hardhat")

let manager;
let player1;
let player2;
let player3;
let player4;
let player5;
let cost = BigInt("100000000000000000000")
let newCost = BigInt("500000000000000000000")



// const tokens = (n) => {
//   return ethers.utils.parseUnits(n.toString(), 'ether')
//   }
//   const cost = tokens(100)

describe("Lottery",()=>{
  let Lottery;
  let lottery;

  beforeEach(async()=>{
   [manager,player1,player2,player3,player4,player5] = await ethers.getSigners()
   Lottery = await ethers.getContractFactory("Lottery");
   lottery = await Lottery.deploy()
  })

  describe("Deployment",()=>{

    it("should Set the Manager", async()=>{
      const managerC = await lottery.getManager();
      expect(managerC).to.not.equal(player1.address);
    })

    it("IsComplete should be false", async()=>{
      const isComplete = await lottery.isComplete()
      expect(isComplete).to.equal(false)
    })

    it("claimed should be false", async()=>{
      const Claimed = await lottery.claimed()
      expect(Claimed).to.equal(false)
    })

    it("length of array of players should be zero",async()=>{
      length = await lottery.getPlayers();
      expect(length.length).to.equal(0)
    })

    // it("Updates the contract balance",async()=>{
    //   let amount = await ethers.provider.getBalance(Lottery.address)
    //   // let cost = ethers.utils.parseUnits(0,'ether')
    //   expect(amount).to.equal('null')
    // })

  })


  describe("players playing the lottery",()=>{
    
      beforeEach(async()=>{   
           let transaction;
               transaction = await lottery.connect(player1).enter({value: cost})
               await transaction.wait()
          
         
            transaction = await lottery.connect(player2).enter({value: cost})
            await transaction.wait()
          
         
            transaction = await lottery.connect(player3).enter({value: cost})
            await transaction.wait()
          
         
            transaction = await lottery.connect(player4).enter({value: cost})
            await transaction.wait()
          
         
            transaction = await lottery.connect(player5).enter({value: cost})
            await transaction.wait()
  
          
        })

      it("Contract balance should be right", async()=>{
        
        const result = await ethers.provider.getBalance(lottery)
        expect(result).to.equal(newCost)
        console.log(result)
        console.log(lottery.address)
   
      })

      it("it should pick the right winner of the lottery", async()=>{
        transaction = await lottery.connect(manager).pickWinner()
        await transaction.wait()

         const winner = await lottery.connect(manager).getWinner()

        console.log(winner)


        let playersarr = await lottery.getPlayers()

        for(let i=0; i<playersarr.length; i++){
          if(winner == player1.address){
            console.log("player1")
          }
          else if(winner === player2.address){
            console.log("player2")
          }
          else if(winner === player3.address){
            console.log("player3")
          }
          else if(winner === player4.address){
            console.log("player4")
          }
          else if(winner === player5.address){
            console.log("player5")
          }
        }
      })

  })



})
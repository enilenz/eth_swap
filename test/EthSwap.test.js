const { assert } = require('chai');

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai').use(require('chai-as-promised')).should();

function tokens(n){
    return web3.utils.toWei(n, 'ether');
}

contract('EthSwap', async([deployer, investor])=>{
    let token, ethSwap

    before(async()=>{
        token = await Token.new();
        ethSwap = await EthSwap.new(token.address);

        await token.transfer(ethSwap.address, tokens('1000000'));
    })

    describe('Token deployment', async () => {
        it('should check contract name', async () => {
            let name = await token.name()
            assert.equal(name, 'Dapp Token') 
        })
    })

    describe('EthSwap deployment', async () => {
        it('should check contract name', async () => {
            let name = await ethSwap.name()
            assert.equal(name, 'Eth swap exchange')
        })

        it('should have tokens', async () => {
            let tokenSupply = await token.totalSupply();
            let ethBalance = await token.balanceOf(ethSwap.address)

            assert.equal(tokenSupply, ethBalance.toString())
        })
    })

    describe('Buy tokens', async () =>{
        let result
        before(async()=>{
            result = await ethSwap.buyTokens({from: investor, value: web3.utils.toWei('1', 'ether')})
        })
        it('allow users purchase tokens', async () => {
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('100'))

            let ethSwapBalance;
            ethSwapBalance = await token.balanceOf(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), tokens('999900'))

            ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), web3.utils.toWei('1', 'Ether'))

            console.log(result.log)
        })
    })
})





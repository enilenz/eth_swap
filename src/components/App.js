import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Navbar from './Navbar';

class App extends Component {

   async componentWillMount(){
     await this.loadWeb3()
     await this.loadBlockChainData()
   }

   async loadBlockChainData(){
     const web3 = window.web3
     const accounts = await web3.eth.getAccounts()

     this.setState({account: accounts[0]})

     const ethBalance = await web3.eth.getBalance(this.state.account)
     this.setState({ethBalance})

     console.log(this.state.ethBalance)
   }

   async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider) 
    }else {
      window.alert('Non-Ethereum browser detected, You should consider trying MetaMask!')
    }
  }

  constructor(props){
    super(props)
    this.state ={
      account: '',
      ethBalance: '',
    }
   }

  render() {
    return (
      <div>  
        <Navbar account={this.state.account} balance ={this.state.balance}></Navbar>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  
                </a>
                <h1>Hello, World!</h1>
              
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

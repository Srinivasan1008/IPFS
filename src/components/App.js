import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import File from '../abis/File.json'


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host: 'ipfs.infura.io',port: 5001, protocol: 'https' })

var accounts;
var fileHash;
var contract;
var networkId;
var networkData;
var abi;
var address;
var id;



class App extends Component {
  async componentWillMount(){
    //before render function
    
    await this.loadWeb3()
    await this.loadBlockchainData()
    
  }
  //get account
  //get network
  //get smart contract
  //abi:File.abi
  //address: networkData.address
  //get hash
  
  async loadWeb3(){
    if(window.ethereum){
         window.web3 = new Web3(window.ethereum)
         //console.log(window.web3)
        await window.ethereum.enable()
    } else if(window.web3){
         window.web3 = new Web3(window.web3.currentProvider)
        await window.ethereum.enable()
    }else{
      window.alert('Please use metamask!!!')
    }

  }
  async loadBlockchainData(){
    window.web3 = new Web3(window.ethereum)
    //below commands not working
    //const web3 = window.web3
    //console.log(window.web3)
    await window.ethereum.enable()
    //console.log(web3)
    
    await window.web3.eth.getAccounts(function (error, result) {
      if(result){
          accounts = result
        //console.log(result)
        this.setState({account: accounts[0]})
        
        //console.log(table[0])
        //console.log(accounts[0])
      }
      else{console.log(error)}
        }.bind(this));//error:this.setState is not function
    await window.ethereum.enable()
     networkId = await window.web3.eth.net.getId()
    //console.log(networkId)
     networkData =  File.networks[networkId]
    
    //console.log(networkData)
    if(networkData){
      //fetch contract
      await window.ethereum.enable()
       abi = File.abi
      //console.log(abi)
       address = networkData.address
      //console.log(address)
       contract =await window.web3.eth.Contract(abi,address)
      
      this.setState({contract})
      //console.log(contract)
      
      //fileHash = await contract.methods.get().call()
      console.log(accounts[0])
      fileHash = await contract.methods.get(accounts[0]).call()
        //await contract.methods.setstate().call()
      this.setState({fileHash})
      console.log(fileHash)

    }else{
      window.alert('smart contract not deployed to detected network!')
    }

      
    
  }
  async reload(){
    fileHash = await contract.methods.get(accounts[0]).call()
     //await contract.methods.setstate().call()
    console.log(fileHash)
  }


  
  constructor(props){
    super(props);
    this.state={
       account: '',
       buffer: null,
       contract:null,
       fileHash: ''
    };
  }

 
  
captureFile = (event) => {
  event.preventDefault()

//process file for ipfs
const file = event.target.files[0]

console.log(this.state.fileHash)

const reader = new window.FileReader()

reader.readAsArrayBuffer(file)
reader.onloadend = () =>
{
  this.setState({buffer: Buffer(reader.result)})
  
  
}
}

onSubmit = (event) => {
  event.preventDefault()
  console.log('submitting the file...')
  //adding file to ipfs-infura
  ipfs.add(this.state.buffer,(error,result)=>{
    console.log('ipfs result',result)
     fileHash = result[0].hash
    //console.log(fileHash)
    //this.setState({fileHash})
    console.log(fileHash)
    if(error){
      console.error(error)
      return
    }

    
       //this.reload()

      this.state.contract.methods.set(accounts[0],result[0].hash).send({ from: this.state.account }).then((r) => {
      return this.setState({ fileHash: result[0].hash })
    })
    
  })
  
}
//getid = (event) =>{
  //event.preventDefault()
  //const id = event.target.text
  
//}
doctor = (event) =>{
  event.preventDefault()
  id = document.getElementById('pk')
  //console.log('doctor')
  console.log(id.value)
  contract.methods.set(id.value,fileHash).send({from: this.state.account}).then((r)=>{
    
  })
}
  render() {
    
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-info flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3  col-md-2 mr-0"
            href="http://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            >
            IPFS-Ethereum
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white">{this.state.account}

              </small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                href={`https://ipfs.infura.io/ipfs/${this.state.fileHash}`}
                target="_blank"
                rel="noopener noreferrer">
                  
                  <img src={`https://ipfs.infura.io/ipfs/${this.state.fileHash}`} alt='' />
                  
                </a>
                <p>&nbsp;</p>
                <h2> Upload File</h2>
                <form onSubmit={this.onSubmit}>
                  <input type='file' onChange={this.captureFile} />
                  <input type='submit'  />
                  </form>
                  <p>&nbsp;</p>
                  <h2> Add Access</h2>
                <form onSubmit={this.doctor}>
                  <input type = 'text' id = 'pk' name='id'/>
                  <input type='submit'  />
                  </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

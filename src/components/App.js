import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import HashStorage from '../abis/HashStorage.json'
// import axios from 'axios';

//importing the ipfs module
//More details on https://github.com/ipfs/js-ipfs-http-client
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  // We try to connect the App to MetaMask via web3
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('No Ethereum browser detected. You should try to use MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    //We verifiy the network
    const networkId = await web3.eth.net.getId()
    const networkData = HashStorage.networks[networkId]
    if(networkData) {
      //We instanciate the contract with the contract abi and the contract adress
      const contract = new web3.eth.Contract(HashStorage.abi, networkData.address)
      this.setState({ contract })
      //We get the ipfsFileHash
      const ipfsFileHash = await contract.methods.getLastFileHash().call()
      this.setState({ ipfsFileHash })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      contract: null,
      web3: null,
      buffer: null,
      account: '',
      ipfsFileHash: ''
      // fileHashId: '',
      // signer: '',
      // emailTo:'',
      // subject: '',
      // feedback: ''
    }
  }

  // changeHandler =(e) => {
  //   this.setState({[e.target.name]: e.target.value})
  // }

  //We capture the file for beeing stored on IPFS
  captureFile = (event) => {
    event.preventDefault()
    //Process the file for IPFS
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  // onSubmit = (event) => {
  //   event.preventDefault()
  //   console.log(this.state)
  // }

  //We submit the file captured on the IPFS network
  onSubmit = (event) => {
    event.preventDefault()
    console.log("Submitting file to ipfs...")
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

       this.state.contract.methods.set(result[0].hash).send({ from: this.state.account }).then((r) => {
         return this.setState({ ipfsFileHash: result[0].hash })
       })
    })
  }

  render() {
    const{emailTo, subject} = this.state
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://sites.google.com/view/mongetrogoint"
            target="_blank"
            rel="noopener noreferrer"
          >
            Smart-Flow Blockchain-IPFS File Upload DApp
          </a>
          <ul className = "navbar-nav px-3">
            <li className = "nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className = "text-white"> You are connected with account : {this.state.account}</small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  target="_blank"
                  rel="noopener noreferrer">
                  <img src={`https://ipfs.infura.io/ipfs/${this.state.ipfsFileHash}`} alt = "" />
                </a>
                <h1>-Your file -</h1>
                 <p>Your file is stored on IPFS & hashed on the Ethereum Blockchain</p>
                 <a href={`https://ipfs.infura.io/ipfs/${this.state.ipfsFileHash}`}>The link to your file on IPFS</a>
                 
                 <p> ==========================================================</p>
                 <p> &nbsp;</p>
                 <h2> Sharing new file with user </h2>

                <div className="shareFileBox">
                  <form className="shareFile" onSubmit={this.onSubmit} >
                    {/* <div>
                      <input type="text" name="senderName" value={senderName} onChange={this.changeHandler} className="form-control" placeholder="Name" required />
                    </div>
                    <div>
                      <input type="email" name="emailFrom" value={emailFrom} onChange={this.changeHandler} className="form-control" placeholder="Email from" required />
                    </div> */}
                    <div>
                      <input type="email" name="emailTo" value={emailTo} onChange={this.changeHandler} className="form-control" placeholder="Email to" required />
                    </div>
                    <div>
                      <input type="text" name="subject" value={subject} onChange={this.changeHandler} className="form-control" placeholder="Subject" required />
                    </div>
                    <p> &nbsp;</p>
                    <div>
                      <input type='file' onChange={this.captureFile} />
                    </div>
                    <input type='submit' />
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

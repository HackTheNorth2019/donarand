import React, { Component } from 'react';
import App from './App.jsx';
const algosdk = require('algosdk');
const baseServer = "http://hackathon.algodev.network";
const aport = 9100;
// Algorand network implementation by MKS


// Create client for transaction POST
const postToken = 'ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1';

const postAlgodclient = new algosdk.Algod(postToken, baseServer); // Binary content type

//Create client for GET of Transaction parameters 
const token = {
    'X-Algo-API-token' : 'ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1',
}


const algodclient = new algosdk.Algod(token, baseServer, aport); 

var mnemonic = "code thrive mouse code badge example pride stereo sell viable adjust planet text close erupt embrace nature upon february weekend humble surprise shrug absorb faint"; 
var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic); 
console.log(recoveredAccount.addr);

const kmdToken = '894043665cfa0762b49a5178418121a0bd30dd05428b0e3bd5411ef4f2b49b4';
const kmdNet = '127.0.0.1';
const kmdPort = 7833;


class Algo extends Component
{
    constructor(props){
        super(props);
        this.submitTx = this.submitTx.bind(this);
    }

    async  submitTx(userData) {
        try{
            let params = await algodclient.getTransactionParams();
            let endRound = params.lastRound + parseInt(1000);
        
            let txn = {
                "from": recoveredAccount.addr,
                "to": "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA",
                "fee": 10,
                "amount": 2,
                "firstRound": params.lastRound,
                "lastRound": endRound,
                "genesisID": params.genesisID,
                "genesisHash": params.genesishashb64,
                "note": algosdk.encodeObj(data),
            };
        
            let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
            let tx = (await postAlgodclient.sendRawTransaction(signedTxn.blob));
            console.log("Transaction : " + tx.txId);
        }catch(e){
            console.log(e);
        }
    }

    render(){
        return(
            <div>
                <h1> Testing Tx</h1>
            </div>
        )
    }

}



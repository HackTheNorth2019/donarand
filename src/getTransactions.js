const algosdk = require('algosdk');

const token = "ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1";
const server = "http://hackathon.algodev.network";        ///"http://127.0.0.1";
const port = "9100";         //8080;
const client = new algosdk.Algod(token, server, port);
// var txid = ["ZRMXP7FUM2MQB3JTXGL5JNUPH5BFBN7B6N4UAEOCOIZSPGH26UUQ"];   

const getTransactions = async(txid) => {
    try{
        for (let i=0; i<txid.length; i++) {
            let tx = (await client.transactionById(txid[i]));

            let encodednote =   JSON.stringify(algosdk.decodeObj(tx.note), undefined, 4);
            // console.log( "Decoded: " + encodednote );
            return encodednote
            
             // var textedJson = JSON.stringify(tx, undefined, 4);
            // console.log(textedJson);
        }
    }
    catch(e) {
        console.log(e);
    }
}
// getTransactions(txid);

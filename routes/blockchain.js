var express = require('express');
var Web3 = require('web3');
fs = require('fs')
solc = require('solc')
var exp = require('../app.js')
var router = express.Router();
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));



router.get('/', function(req, res, next) { 
    console.log(exp.myContract)
    web3.eth.getAccounts().then(accounts => {
      var respuesta = 'Accounts en la blockchain';

      for (let index = 0; index < accounts.length; index++) {
        const a = accounts[index];
        respuesta += '<br />';
        respuesta += a.toString();
      }    

      res.send(respuesta);

    });

    
});

router.get('/last', function(req, res, next) {
    
    web3.eth.getAccounts().then(accounts => {
        var respuesta = 'Accounts en la blockchain';
  
        for (let index = 0; index < accounts.length; index++) {
          const a = accounts[index];

          respuesta = a.toString();
        }    
  
        res.send(respuesta);
  
      });
  
  
});

router.get('/formulario',)


module.exports = router;
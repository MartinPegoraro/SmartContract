var express = require('express');
var Web3 = require('web3');
fs = require('fs')
solc = require('solc')
var router = express.Router();
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));



router.get('/', function(req, res, next) { 
    var abiDefinition = [
        {
            "constant": true,
            "inputs": [],
            "name": "getProfesor",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "esConfirmado",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getMateria",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_profesor",
                    "type": "address"
                },
                {
                    "name": "_materia",
                    "type": "string"
                }
            ],
            "name": "solicitar",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "esCancelado",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "key",
                    "type": "address"
                }
            ],
            "name": "confirmar",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "cancelar",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "key",
                    "type": "address"
                }
            ],
            "name": "getAlumno",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]

    var code = fs.readFileSync('./tutoria.sol').toString()
    var compiledCode = solc.compile(code)
    
    var byteCode = compiledCode.contracts[':Tutoria'].bytecode //Su contrato inteligente
    var TutoriaContract = new web3.eth.Contract(abiDefinition,{data: byteCode, from: web3.eth.accounts[0], gas: 4700000}) 
    var myContract = new web3.eth.Contract(abiDefinition,'0xde4bd70ff35ad106c91f02b6f8ba63e0ee7c3534', {data:byteCode,gasPrice:'20000000000'});

    TutoriaContract.deploy({data:byteCode}).send({from:'0xaae38c74a784064594f8b24da5ff1decba41334b',gas: 1500000, gasPrice: '30000000000000'});
   
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

router.get('/formulario', function(req, res, next) {
    res.render('formulario', {});
});

router.post("/formulario/respuesta", function(req, res, next) {
    let nombre = req.body.nombre;

    let materia = req.body.materia;
    let profesor = req.body.profesor;

    let fecha = req.body.fecha;
    let hora = req.body.hora;

    abiDefinition = [
        {
            "constant": true,
            "inputs": [],
            "name": "getProfesor",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "esConfirmado",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getMateria",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_profesor",
                    "type": "address"
                },
                {
                    "name": "_materia",
                    "type": "string"
                }
            ],
            "name": "solicitar",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "esCancelado",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "key",
                    "type": "address"
                }
            ],
            "name": "confirmar",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "cancelar",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "key",
                    "type": "address"
                }
            ],
            "name": "getAlumno",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]

    var code = fs.readFileSync('./tutoria.sol').toString()
    var compiledCode = solc.compile(code)
    
    var byteCode = compiledCode.contracts[':Tutoria'].bytecode //Su contrato inteligente
    var TutoriaContract = new web3.eth.Contract(abiDefinition,{data: byteCode, from: web3.eth.accounts[0], gas: 4700000}) 
    var myContract = new web3.eth.Contract(abiDefinition,'0xde4bd70ff35ad106c91f02b6f8ba63e0ee7c3534', {data:byteCode,gasPrice:'20000000000'});

    myContract.methods.solicitar("0x14723a09acff6d2a60dcdf7aa4aff308fddc160c","Paradigma").send({from:'0xde4bd70ff35ad106c91f02b6f8ba63e0ee7c3534'})
    
    TutoriaContract.deploy({data:byteCode}).send({from:'0xaae38c74a784064594f8b24da5ff1decba41334b',gas: 1500000, gasPrice: '30000000000000'});
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

module.exports = router;
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/View'));
app.use(bodyParser.urlencoded({ extend: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

Web3 = require('web3');
fs = require('fs')
solc = require('solc')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.getAccounts(console.log);

code = fs.readFileSync('./Script/tutoria.sol').toString()
compiledCode = solc.compile(code)

abiDefinition = JSON.parse(compiledCode.contracts[':Tutoria'].interface) 
byteCode = compiledCode.contracts[':Tutoria'].bytecode 

let config = {
  addressContract: null,
  tutos:[]
};

let alumno= {
  Gonza:[],
  Facundo:[],
  Gonsalo:[],
  Leandro:[],
  Martin:[],
  Agustin:[],
  Sebastian:[]
}


//----------------------Crear Contrato-------------------------------------------------
  TutoriaContract = new web3.eth.Contract(abiDefinition, { data: byteCode,  from: '0xfd730bab2d10d2179aec947409e2f0c5d1ac5021', gasPrice: '1000', gas: 6721975 });     //-------------------Desplegar Contrato-------------------
  TutoriaContract.deploy({ data: byteCode }).send({ from: '0xfd730bab2d10d2179aec947409e2f0c5d1ac5021', gas: 6721975, gasPrice: '1000' }).then((e) => {
    config.addressContract = e.options.address;
    res.redirect('/');
  });


//------------------------index.html---------------------------------------
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/View/index.html');
  res.render()
});
//---------------------------Solicitar-------------------------------------
app.post('/', function (req, res) {
  var prof = ["0x2af24ec65db90aa75fc9c918da71e498c6812efe", "0xb84d66b9aa22c77cb82b756a64dba9e26719b4d7","0xbd7b59c5c01e860150200df323b703228625eff7"];
  
  let usuario = req.body.usuario;
  let materia = req.body.materia;
  let profesor = req.body.profesor;


  //------Se verifica que el los profesores no puedan solicitar tutorias----------------
  if ((usuario ==prof[0]) || (usuario ==prof[1]) || (usuario ==prof[2])){
    res.send('Profesores no pueden solicitar tutorias')
  }else{
  //----------------------Instancia del Contrato------------------------
    myContract = new web3.eth.Contract(abiDefinition, config.addressContract, { data: byteCode, gasPrice: '1000', gas: 200000 });
    myContract.methods.solicitar(materia, profesor).send({ from: usuario, gas: 200000 })
    myContract.methods.solicitar(materia,profesor).call({from: usuario})
    .then(e => {
      console.log(e)

      //------------------Se crea arreglo con todas las tutorias----------------------
      config.tutos.push({
        'alumno': usuario,
        'materia': materia,
        'key': e,
        'profesor': profesor,
      })
      //------------------Se crean los arreglos con tutorias por alumno-----------------
      switch(usuario){
        case "0xfd730bab2d10d2179aec947409e2f0c5d1ac5021":
          alumno.Gonza.push({
            'alumno': usuario,
            'materia': materia,
            'key': e,
            'profesor': profesor
          })
          break
        case "0xcffd857638c1e8e5dcb8df934f6c2d8fd12fea61":
          alumno.Facundo.push({
            'alumno': usuario,
            'materia': materia,
            'key': e,
            'profesor': profesor
          })
          break
        case "0xfd8fc5f54264089778fe45d188b1636d9399ce5e":
          alumno.Gonsalo.push({
            'alumno': usuario,
            'materia': materia,
            'key': e,
            'profesor': profesor
          })
          break
        case "0xedb0e48927a72e9dc907afd23d9794586acfd149":
          alumno.Leandro.push({
            'alumno': usuario,
            'materia': materia,
            'key': e,
            'profesor': profesor
          })
          break
        case "0x95f4c7b52bd3890dd6ab2a488d51414b3b961eca":
          alumno.Martin.push({
            'alumno': usuario,
            'materia': materia,
            'key': e,
            'profesor': profesor
          })
          break
        case "0xff7cbcb3bae4b13db50860a023e31f4a0b0bfa46":
          alumno.Agustin.push({
            'alumno': usuario,
            'materia': materia,
            'key': e,
            'profesor': profesor
          })
          break
        case "0xbf965026809eeda78bd15e66ed185220fbc44c0b":
         alumno.Sebastian.push({
           'alumno': usuario,
           'materia': materia,
           'key': e,
           'profesor': profesor
         })
         break

      }
    })
  }
})
//----------------------Metodos.html---------------------------------------
app.get('/metodos', function (req, res) {
  res.sendFile(__dirname + '/View/metodos.html');
})

//-------------------------METODOS-----------------------------------------
app.post('/metodos', function (req, res) {
  //----------Obtengo los datos del HTML mediante POST---------------------
  let usuario = req.body.usuario;
  let metodo = req.body.metodo;
  let opc = req.body.opc;
  //-----------Arreglos con los ID de los profesores y alumnos-------------
  var prof = ["0x2af24ec65db90aa75fc9c918da71e498c6812efe", "0xb84d66b9aa22c77cb82b756a64dba9e26719b4d7","0xbd7b59c5c01e860150200df323b703228625eff7"];
  
  switch (metodo) {
    //----------------------------GET MATERIA---------------------------------
    case "1":
      if ((usuario in prof)){
        res.send('Profesor no pueden solicitar materia')
      }
      myContract.methods.getMateria(usuario).call().then(e => {
        console.log(e)
        switch(usuario){
          case "0xfd730bab2d10d2179aec947409e2f0c5d1ac5021":
            res.json(alumno.Gonza)
            break
          case "0xcffd857638c1e8e5dcb8df934f6c2d8fd12fea61":
            res.json(alumno.Facundo)
            break
          case "0xfd8fc5f54264089778fe45d188b1636d9399ce5e":
            res.json(alumno.Gonsalo)
            break
          case "0xedb0e48927a72e9dc907afd23d9794586acfd149":
          res.json(alumno.Leandro)
            break
          case "0x95f4c7b52bd3890dd6ab2a488d51414b3b961eca":
          res.json(alumno.Martin)
            break
          case "0xff7cbcb3bae4b13db50860a023e31f4a0b0bfa46":
          res.json(alumno.Agustin)
            break
          case "0xbf965026809eeda78bd15e66ed185220fbc44c0b":
          res.json(alumno.Sebastian)
           break
        }
      });
      break;
      //--------------------------GET FECHA---------------------
    case "2":
      myContract.methods.getFecha(usuario).call().then(e => {

        if (e.length < 1)  {
          res.send('Usuario Invalido')
        }
        var respuesta = 'Fecha: ';
        for (let index = 0; index < e.length; index++) {
          const a = e[index];
          respuesta += a.toString();
        }
        res.send(respuesta);
      });
      break;
    case "3":
      //--------------------------GET PROFESOR---------------------
      myContract.methods.getIdProfesor(opc).call().then(e => {
        if (e.length < 1){
          res.send('Sin Tutorias Pendientes')
        }
        var respuesta = 'Profesor: ';
        for (let index = 0; index < e.length; index++) {
          const a = e[index];
          respuesta += a.toString();
        }
        res.send(respuesta);
      });
      break;
    case "4":
      //---------------------------GET ALUMNO----------------------
      myContract.methods.getAlumno(opc).call().then(e => {
        var respuesta = 'Alumno: ';
        for (let index = 0; index < e.length; index++) {
          const a = e[index];
          respuesta += a.toString();
        }
        res.send(respuesta);
      });
      break;
    case "5":
      //----------------------------CONFIRMAR-----------------------
      if ((usuario ==prof[0]) || (usuario ==prof[1]) || (usuario ==prof[2])){
        myContract.methods.confirmar(opc).send({from:usuario, gas:200000}).then(e => {
          if (e.length < 1) {
            res.send('Tutoria no encontrada')
          }
          var respuesta = 'Tutoria Confirmada';
        //  respuesta += e
          res.send(respuesta);
        });

      }else{
        res.send('Alumno no puede confirmar Materia')
      }
      break;
    case "6":
      //-----------------------------CANCELAR--------------------------
      if ((usuario in prof)){
        res.send('Profesor no pueden solicitar materia')
      }
      myContract.methods.cancelar(opc).send({from:usuario, gas:200000}).then(e => {
        if (e.length < 1){
          res.send('Tutoria no encontrada')
        }
        var respuesta = 'Tutoria Cancelada';
        res.send(respuesta);
      });
      break;
    case "7":
    //------------------------------ESTA CONFIRMADO---------------------
      myContract.methods.estaConfirmado(opc).call().then(e => {
        if (e.length < 1) {
          res.send('Tutoria no encontrada')
        }
        var respuesta = 'Esta Confirmado: ';
          respuesta += e;

        res.send(respuesta);
      });
      break;
    case "8":
    //-----------------------------ESTA CANCELADO------------------------
      myContract.methods.estaCancelado(opc).call().then(e => {
        if (e.length < 1) {
          res.send('Tutoria no encontrada')
        }
        var respuesta = 'Esta Cancelado: ';
          respuesta += e;
        res.send(respuesta);
      });
      break;
    case "9":
    //-----------------------------MIRAR TODAS LAS MATERIAS--------------
      if (usuario=="0xbd7b59c5c01e860150200df323b703228625eff7"){
        res.json(config.tutos)
      }
  }
})

//--------------------Mostrar la Blockchain---------------------------------
app.get('/Blockchain', function(req,res){
  res.json(config.tutos);
})

//---------------------Listen 3000------------------------------------------
app.listen(3000);
console.log("Running at Port 3000");

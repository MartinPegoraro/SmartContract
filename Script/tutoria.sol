pragma solidity ^0.4.7;
contract Tutoria {
    
    mapping (uint256 => TutoriaData)  Tutorias;
    
    
    struct TutoriaData {
        string materia;
        address idProfesor;
        address alumno;
        bool isConfirmado;
        bool isCancelado;
        uint fecha;
        bytes32 hash;
    }
    
    function solicitar(string mater, address idProf) public returns (uint256){
       
        uint256 key = uint256(keccak256(abi.encode(msg.sender, idProf, mater, block.timestamp, block.difficulty)));

        TutoriaData t = Tutorias[key];
        
        t.materia = mater;
        t.idProfesor = idProf;
        t.alumno = msg.sender;
        t.isConfirmado = false;
        t.isCancelado = false;
        t.fecha = block.timestamp;
        
       return key;
       
    }
    
    function getFecha(uint256 key) public view returns (uint) {
        return Tutorias[key].fecha;
    }

    function getHash(uint256 key) public view returns (bytes32) {
        return Tutorias[key].hash;
    }
    
    function getMateria(uint256 key) public view returns (string) {
        return Tutorias[key].materia;
    }
    
    function getIdProfesor(uint256 key) public view returns (address) {
        return Tutorias[key].idProfesor;
    }
    
    function getAlumno(uint256 key) public view returns (address) {
        return Tutorias[key].alumno;
    }
    
    function confirmar(uint256 key) public returns (bool) {
        require(Tutorias[key].isConfirmado == false);
        require(Tutorias[key].isCancelado == false);
        return Tutorias[key].isConfirmado = true;
    }
    
    function cancelar(uint256 key) public returns (bool) {
        require(Tutorias[key].isConfirmado == false);
        require(Tutorias[key].isCancelado == false);
        TutoriaData t= Tutorias[key];
        t.isCancelado = true;
        return t.isCancelado;
    }
    
    function estaConfirmado(uint256 key) public view returns (bool){
        return Tutorias[key].isConfirmado;
    }
    
    function estaCancelado(uint256 key) public view returns (bool){
        return Tutorias[key].isCancelado;
    }
    
}
pragma solidity ^0.4.24;

contract Tutoria{
    struct TutoriaData{
       address profesor;
       string materia;
       address alumno;
       uint confirmado;
       uint cancelado;
    }
    mapping(address=>TutoriaData) tutorias;
    
    function solicitar (address _profesor, string _materia) public{
        
        require(msg.sender!=_profesor);
        TutoriaData storage t = tutorias[msg.sender];
        
        t.alumno=msg.sender;

        t.profesor= _profesor;
        t.materia=_materia;
        t.confirmado=0;
        t.cancelado=0;
    } 

   function getProfesor() public constant returns (address) {
        return tutorias[msg.sender].profesor;

    }

    function getMateria() public constant returns (string memory) {
        return tutorias[msg.sender].materia;
    }

    function getAlumno(address key) public constant returns(address){
        return tutorias[key].alumno;
    }
    
   function confirmar(address key) public returns(uint){
       
       TutoriaData t= tutorias[key];
       require(t.profesor == msg.sender);
       require(t.confirmado==0);
       require(t.cancelado==0);
       t.confirmado=1;
       return t.confirmado;
   }
   
   function esConfirmado() public constant returns(uint){
        return tutorias[msg.sender].confirmado;
    }
    
    function cancelar() public returns (uint){
        TutoriaData t=tutorias[msg.sender];
        require(t.confirmado==0);
        require(t.cancelado==0);
        t.cancelado=1;
        return t.cancelado;
    }
    
    function esCancelado() public constant returns(uint){
        return tutorias[msg.sender].cancelado;
    }
}


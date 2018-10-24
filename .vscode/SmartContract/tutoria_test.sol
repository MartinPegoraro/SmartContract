/*pragma solidity ^0.4.7;
import "/remix_tests.sol"; // this import is automatically injected by Remix.
import "./tutoria.sol";

contract tutoriaTest {
   
    Tutoria tutoriaParaTest;
    
    
    
    function beforeAll () public {
        string memory materia = "Paradigma";
        address IdProfesor = 0x14723a09acff6d2a60dcdf7aa4aff308fddc160c;
        tutoriaParaTest = new Tutoria(materia, IdProfesor);
    }
    
    function checkDebeCrearUnaTutoria () public {
        address alumno = msg.sender;
        Assert.equal(tutoriaParaTest.getMateria(), "Paradigma", "Deberia obtener la materia de la tutoria");
        Assert.equal(tutoriaParaTest.getIdProfesor(), 0x14723a09acff6d2a60dcdf7aa4aff308fddc160c, "Deberia obtener el profesor de la tutoria");
        Assert.equal(tutoriaParaTest.getAlumno(), alumno, "Deberia obtener el alumno de la tutoria");
        Assert.equal(tutoriaParaTest.esConfirmado(), 0, "Deberia devolver que no esta confirmada una tutoria");
        //bool isTrue = (tutoriaParaTest!=null);
        //assert.true(isTrue);
    }
    
    function checkDebeConfirmarUnaTutoria () public {
        Assert.equal(tutoriaParaTest.confirmar(), 1, "Deberia confirma una tutoria");
        
        Assert.equal(tutoriaParaTest.estaConfirmado(), 1, "Deberia devolver que esta confirmada una tutoria");
    }
    
    function checkDebeCancelarUnaTutoria () public {
        Assert.equal(tutoriaParaTest.cancelar(), 1, "Deberia cancelar una tutoria");
        
        Assert.equal(tutoriaParaTest.estaConfirmado(), 0, "Deberia devolver que no esta confirmada una tutoria");
    }
}*/
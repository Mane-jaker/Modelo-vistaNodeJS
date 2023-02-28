var userService = require('./userServices');

var createUserControllerFunc = async (req, res) =>  {
    try {
    console.log(req.body);
    var status = await userService.createUserDBService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "Usuario creado" });
    } else {
        res.send({ "status": false, "message": "Error creando usuario talvez ya existe" });
    }
    }
    catch(err) {
        console.log(err);
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var allUserControllerFunc = async (req, res) => {

    try{
       var result = await userService.allUserDBService(req.body);
        if(result){
            res.send({ "status": true, "data": result }); 
            console.log(result)
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } catch (error){
        console.log(error);
    }
}

var oneUSerControllerFunc = async(req, res) => {
    try{
        var result = await userService.oneUserDBService(req.params.id);
         if(result){
             res.send({ "status": true, "data": result }); 
             console.log(result)
         } else {
             res.send({ "status": false, "message": result.msg });
         }
     } catch (error){
         console.log(error);
     }
}

var deleteUserControllerFunc = async(req, res) => {
    var gmail = null;
    try {
        gmail = await userService.deleteUserDBService(req.body);
        if (gmail.status) {
            res.send({ "status": true, "message": gmail.msg });
        }
        else {
            res.send({ "status": false, "message": gmail.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
  }

  var updateUserControllerFunc = async (req, res) =>{
    try{
        const userId = req.params.id;
        const updateDats = req.body;
        const result = await userService.updateUserDBService(userId,updateDats);
        if (result){
            res.send({"status": true, "message": "Se actualizo el usuario correctamente"})
            console.log(result);
        } else{
            res.send({"status": false, "message": "si actualizar el usuario"})
        }
    } catch (error){
        console.log(error)
        res.send({"status": true, "message": "Se actualizo el usuario correctamente"})
    }
  }

module.exports = { createUserControllerFunc, loginUserControllerFunc, allUserControllerFunc, oneUSerControllerFunc, deleteUserControllerFunc, updateUserControllerFunc };
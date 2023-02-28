var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({email: userDetails.email}, function getresult(errorvalue, result){
         if(errorvalue){
            reject ({status: false, msg: "No se puede, ya existe"})
         } else{
            if(result != undefined && result != null){
               resolve(false);
            }else{
               var userModelData = new userModel();

               userModelData.firstname = userDetails.firstname;
               userModelData.lastname = userDetails.lastname;
               userModelData.email = userDetails.email;
               userModelData.password = userDetails.password;
               var encrypted = encryptor.encrypt(userDetails.password);
               userModelData.password = encrypted;

               userModelData.save(function resultHandle(error, result) {
                  if (error) {
                        reject(false);
                  } else {
                        resolve(true);
                  }
               });
            }
         }
      })
   });
}

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}

module.exports.allUserDBService = () => {
   return new Promise(function myFn(resolve,reject){
     userModel.find({}, function alluser(errorvalue,users){
         if(errorvalue){
            reject({status: false, msg: "fallo al traer los usuarios"});
         }else{
            const userDetailsArray = users.map(user => {
            const decrypted = encryptor.decrypt(user.password)
            return {id:user._id, firstname: user.firstname, lastname: user.lastname, email: user.email,password:decrypted };
         })
         resolve(userDetailsArray); 
      }
     })
   })
}

module.exports.oneUserDBService = (id) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findById(id, function finduser(errorvalue, user) {
         if (errorvalue) {
            reject({ status: false, msg: "Fallo al buscar el usuario" });
            console.log(errorvalue)
         } else if (user) {
            const decrypted = encryptor.decrypt(user.password)
            const userDetails = {id:user._id,firstname: user.firstname, lastname: user.lastname, email: user.email,password:decrypted };
            resolve(userDetails);
         } else {
            resolve({ status: false, msg: "No se encontró ningún usuario con ese ID" });
         }
      });
    });
}

module.exports.deleteUserDBService = (dats) => {
   return new Promise( function myFn(resolve, reject){
      userModel.findOneAndDelete({id: dats.id}, function getresult(errorgmail, gmail){
         if(errorgmail){
            reject({status: false, mgs:"Cuenta no existe"});
         }
         else{
            if(gmail != undefined && gmail != null){
               resolve({status: true, msg:"Cuenta eliminada"})
            }
            else{
               reject({status:false, msg:"Cuenta no encotrada"});
            }
         }
      })
   })
 };

 module.exports.updateUserDBService = (id, userDats) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findById(id, function findUser(errorvalue, user){
         if (errorvalue){
            reject({status: false, msg: "No se encontro el usuario"});
         } else if (user){
            user.firstname = userDats.firstname;
            user.lastname = userDats.lastname;
            user.email = userDats.email;
            user.password = encryptor.encrypt(userDats.password);

            user.save(function resultHandle(errorvalue){
               if (errorvalue){
                  reject({status: false, msg: "No se encontro el usuario"});
               } else{
                  reject({status: true, msg: "Se actualizo el usuario2"});
               }
            })
         }else {
            reject({status: false, msg: "No se encontro el usuario"});
         }
      })
   })
 }
const express = require("express"),
  bcrypt = require("../database/hash"),
  jwt = require("jsonwebtoken"),
  router = express.Router(),
  {
    checkTraineeEmailExists,
    checkenroll,
    getmyprofile,
    addTraineeAccount,
    checkPasswordDB,
    showNameWithLogIn,
    UpdatePasswordTrainee,
    UpdateInformationTrainee,
    addImage,getImages,getAllImages,getDataImage,editImage,deleteImage,getByIDImages
  } = require("../traineeRepo/TraineeRepository"),
  routeBase = "/galleryStore",
  fs = require("fs");
//.....................................
const key = "iwearft54aw7eg6yq3urt4jy4567idfhjgkuiyut";
router.post(routeBase + "/register", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let address = req.body.address;
  let phone = req.body.phone;
  const checkName = /^[a-z]|[0-9]/i;
  const checkEmail = /[a-z0-9_\.\-]+@+[a-z_\.\-]+\.+[a-z]/i;
  const checkPassword = /[a-z]+|[0-9]+|\!+|\@+|\#+|\$+|\%+|\&/i;
  const checkAdress = /[0-9]|[a-z]/i;
  const checkPhone = /[0-9]/;
  if (
    checkName.test(name) == true &&
    checkEmail.test(email) == true &&
    checkPassword.test(password) == true &&
    checkAdress.test(address) == true &&
    checkPhone.test(phone) == true
  ) {
    checkTraineeEmailExists(email, (EmailDidNotExisit, EmailExisted) => {
      if (EmailExisted == 0) {
        bcrypt.hashPassword(
          password,
          8,
          (HashingDidNotWork, HashingPasswordWorked) => {
            if (HashingDidNotWork) {
              res.status(500);
            } else {
              addTraineeAccount(
                name,
                email,
                HashingPasswordWorked,
                address,
                phone,
                (addNgoAccountFiled, addNgoAccountSuccessed) => {
                  if (addNgoAccountFiled) {
                    res.status(500);
                  } else {
                    let id = addNgoAccountSuccessed.insertId;
                    let tokenSignUp = jwt.sign(
                      {
                        id: id,
                        email: email,
                        password: HashingPasswordWorked,
                        address: address,
                        phone: phone
                      },
                      key
                    );
                    res.send({ status: 201, id: id, token: tokenSignUp });
                  }
                }
              );
            }
          }
        );
      } else {
        res.send({ status: 226 });
      }
    });
  } else {
    res.status(400);
  }
});
//...........................
router.post(routeBase + "/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  checkPasswordDB(email, (err, FindPasswordByEmail) => {
    if (FindPasswordByEmail !== "") {
      bcrypt.comparePassword(
        password,
        FindPasswordByEmail[0].password,
        (err, CompareDone) => {
          if (CompareDone == true) {
            showNameWithLogIn(email, (error, NameUser) => {
              let idToken = NameUser[0].id;
              let passwordToken = NameUser[0].password;
              let tokenLogIn = jwt.sign(
                { id: idToken, email: email, password: passwordToken },
                key
              );
              // jwt.verify(tokenLogIn , key , (err , resylt)=>{
              //     if(err) {
              //         console.log(err)
              //     }else{
              //         console.log(resylt)
              //     }
              // })
              res.send({ status: 200, token: tokenLogIn, id: idToken });
            });
          } else {
            res.send({ status: 400 });
          }
        }
      );
    } else {
      res.send({ status: 404 });
    }
  });
});

router.put(routeBase + "/EditePassword", (req, res) => {
  let token = req.headers.authorization.split(" ")[0];
  let old_password = req.body.old_password;
  let new_password = req.body.new_password;
  jwt.verify(token, key, (TokenIndefind, InfoByToken) => {
    if (TokenIndefind) {
      res.send({ status: 404 });
    }
    let id = InfoByToken.id;
    let email = InfoByToken.email;
    let password = InfoByToken.password;
    bcrypt.comparePasswordTrainee(
      old_password,
      password,
      (CompairFiled, compiesDone) => {
        if (compiesDone == false) {
          res.send({ status: 404 });
        } else {
          bcrypt.hashPasswordTrainee(
            new_password,
            8,
            (HashingFiled, HashingSuccessed) => {
              UpdatePasswordTrainee(
                id,
                HashingSuccessed,
                (FiledUpdate, SuccssedUpdate) => {
                  if (FiledUpdate) {
                    res.send({ status: 400 });
                  } else {
                    let token = jwt.sign(
                      { id: id, email: email, password: password },
                      key
                    );
                    res.send({
                      id: id,
                      status: 200,
                      result: SuccssedUpdate,
                      token: token
                    });
                  }
                }
              );
            }
          );
        }
      }
    );
  });
});

router.put(routeBase + "/EditeInformation", (req, res) => {
  let name = req.body.name;
  let phone = req.body.phone;
  let address = req.body.address;
  let token = req.headers.authorization.split(" ")[0];
  let R1 = Math.floor(Math.random() * 1000);
  let R2 = Math.floor(Math.random() * 1000);
  let R3 = Math.floor(Math.random() * 1000);
  let IMAGE_NAME = R1 + "L" + R2 + "S" + R3;
  console.log(IMAGE_NAME);
  jwt.verify(token, key, (tokenFiled, resultOfToken) => {
    let id = resultOfToken.id;
    let user_photo = req.body.photo || "";
    let imgpath = "";

    if (user_photo !== "") {
      let base64Image = user_photo.split(";base64,").pop();

      imgpath = "./api/profile/" + IMAGE_NAME + ".png";

      fs.writeFile(imgpath, base64Image, { encoding: "base64" }, function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
    if (tokenFiled) {
      res.send({ status: 400 });
    } else {
      UpdateInformationTrainee(
        id,
        imgpath,
        name,
        phone,
        address,
        (EditeFiled, EditeSuccssed) => {
          console.log(EditeFiled);
          if (EditeFiled) {
            res.send({ status: 404 });
          } else {
            let tokenTrainee = jwt.sign(
              { id: id, name: name, phone: phone, address: address },
              key
            );
            res.send({
              id: id,
              result: EditeSuccssed,
              token: tokenTrainee
            });
          }
        }
      );
    }
  });
});

// let pagesize = 9;
router.get(routeBase + "/id/:id", (req, res) => {
  let id = req.params.id;
  getmyprofile(id, (FiledGetTrainee, FoundTrainee) => {
    if (FiledGetTrainee) {
      res.send({ status: 404 });
    } else {
      res.send(FoundTrainee);
    }
  });
});

router.post(routeBase + "/addimage", (req, res) => {
    let R1 = Math.floor(Math.random() * 1000);
    let R2 = Math.floor(Math.random() * 1000);
    let R3 = Math.floor(Math.random() * 1000);
    let IMAGE_NAME = R1 + "L" + R2 + "S" + R3;
    let name = req.body.data.name;
    let sallery = req.body.data.sallery;
    let size = req.body.data.size;
    let photo = req.body.data.photo;
    let kind = req.body.data.kind;
    let notes = req.body.data.notes;
    let id = req.body.data.id;
   let imgpath = "./api/images/" + IMAGE_NAME + ".png";  
   addImage(id, name, imgpath, sallery, size, kind, notes, result => {
    console.log(result);
    res.send({s:result})
  });


  fs.writeFile(imgpath, photo, { encoding: "base64" }, function(err) {
    if (err) {
      console.log(err);
    }
  });
});
router.get(routeBase + "/:id", (req, res) => {
let id = req.params.id;
getImages(id,data=>{
    res.send({data:data})
})


})
router.get(routeBase, (req, res) => {
    getAllImages(data=>{
        res.send({data:data})
    })
    
    
    })
    
  router.get(routeBase+"/dataimage/:id", (req, res) => {
    let id = req.params.id;

      getDataImage(id,data=>{
          res.send({data:data})
      })
      
      
      })
          
  router.put(routeBase+"/editimage/:id", (req, res) => {
    let id = req.params.id;
    let name=req.body.name
    let sallery=req.body.sallery
    console.log(req.body)
     editImage(id,name,sallery,data=>{
          res.send({data:data})
      })
      })
 router.delete(routeBase+"/deleteimage/:id", (req, res) => {
        let id = req.params.id;
        console.log(req.body)
         deleteImage(id,data=>{
              res.send({data:data})
          })
          })
          router.get(routeBase + "/image/:id", (req, res) => {
            let id = req.params.id;
            getByIDImages(id,data=>{
                res.send({data:data})
            })
            
            
            })

            
    
module.exports = router;

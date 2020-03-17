// for text under the input Signup
let Name_SignUp_P = document.getElementById("alert_name");
let Pass_SignUp_P = document.getElementById("alert_password");
let ConfermPass_SignUp_P = document.getElementById("Conferm_password");
let Email_SignUp_P = document.getElementById("alert_Email");
let Address_SignUp_P = document.getElementById("alert_address");
let Phone_SignUp_P = document.getElementById("alert_phone");

// for input text Signup
let Name_SignUp = document.getElementById("name");
let Pass_SignUp = document.getElementById("password");
let ConfermPass_SignUp = document.getElementById("confermPassword");
let Email_SignUp = document.getElementById("eml");
let Address_SignUp = document.getElementById("address");
let Phone_SignUp = document.getElementById("phone");

// for check Name By RegExp  .............
const checkName = /^[a-z]|[0-9]/i;
function checkNameRegExp() {
  if (Name_SignUp.value == "") {
    Name_SignUp_P.innerHTML = "Your Name is empty";
    Name_SignUp.style.borderBottomColor = "red";
  }
  else if (checkName.test(Name_SignUp.value) == false) {
    Name_SignUp_P.innerHTML = "enter your name right way";
    Name_SignUp.style.borderBottomColor = "red";
  }
  else {
    Name_SignUp.style.borderBottomColor = "green";
    Name_SignUp_P.innerHTML = "";
  }
}

// for check Phone By RegExp  .............

const checkPhone = /[0-9]/;
function checkPhoneRegExp() {
  if (Phone_SignUp.value == "") {
        Phone_SignUp_P.innerHTML = "Your Phone Number is empty";
        Phone_SignUp.style.borderBottomColor = "red";
  }
  else if (checkName.test(Phone_SignUp.value) == false) {
        Phone_SignUp_P.innerHTML = "enter your Phone right way";
        Phone_SignUp.style.borderBottomColor = "red";
  }
  else {
        Phone_SignUp.style.borderBottomColor = "green";
        Phone_SignUp_P.innerHTML = "";
  }
}

// for check Address By RegExp  .............

const checkAddress =  /[a-z0-9_\.\-]/i;
function checkAddressRegExp() {
  if (Address_SignUp.value == "") {
        Address_SignUp_P.innerHTML = "Your Phone Number is empty";
        Address_SignUp.style.borderBottomColor = "red";
  }
  else if (checkName.test(Address_SignUp.value) == false) {
        Address_SignUp_P.innerHTML = "enter your Phone right way";
        Address_SignUp.style.borderBottomColor = "red";
  }
  else {
        Address_SignUp.style.borderBottomColor = "green";
        Address_SignUp_P.innerHTML = "";
  }
}


// for check Email By RegExp ........................
const checkEmail = /[a-z0-9_\.\-]+@+[a-z_\.\-]+\.+[a-z]/i;
function checkEmailRegExp() {
  if (Email_SignUp.value == "") {
    Email_SignUp_P.innerHTML = "the Email is empty";
    Email_SignUp.style.borderBottomColor = "red";
  }
  else if (checkEmail.test(Email_SignUp.value) == false) {
    Email_SignUp_P.innerHTML = "the email is worng";
    Email_SignUp.style.borderBottomColor = "red";
  } else {
    Email_SignUp.style.borderBottomColor = "green";
    Email_SignUp_P.innerHTML = "";
  }
}

// for check Password By RegExp ........................
const checkPassword = /[a-z]+|[0-9]+|\!+|\@+|\#+|\$+|\%+|\&/i;
function checkPasswordRegExp() {
  if (Pass_SignUp.value == "") {
    Pass_SignUp_P.innerHTML = "the passowrd is empty";
    Pass_SignUp.style.borderBottomColor = "red";
  } else if (Pass_SignUp.value.length <= 7) {
    Pass_SignUp_P.innerHTML = "must be more than 8 letters";
    Pass_SignUp.style.borderBottomColor = "red";
  } else if (Pass_SignUp.value.length <= 8) {
    Pass_SignUp_P.innerHTML = "your password good";
    Pass_SignUp.style.borderBottomColor = "orange";
    Pass_SignUp_P.style.color = "orange";
  } else if (Pass_SignUp.value.length <= 9) {
    Pass_SignUp_P.innerHTML = "very good";
    Pass_SignUp.style.borderBottomColor = "rgb(255, 196, 0)";
    Pass_SignUp_P.style.color = "rgb(255, 196, 0)";
  } else if (checkPassword.test(Pass_SignUp.value) === false) {
    Pass_SignUp_P.innerHTML = "the passowrd is worng";
    Pass_SignUp.style.borderBottomColor = "red";
  } else if (Pass_SignUp.value.length <= 10) {
    Pass_SignUp_P.innerHTML = "";
    Pass_SignUp.style.borderBottomColor = "green";
   
  }
}

// for conferm password ..................................

function ConfermPasswordRegExp() {
        if(Pass_SignUp.value == ConfermPass_SignUp.value) {
                ConfermPass_SignUp_P.innerHTML = "";
                ConfermPass_SignUp.style.borderBottomColor = "green";    
        }else{
                ConfermPass_SignUp_P.innerHTML = "Your Password Dosen't match";
                ConfermPass_SignUp.style.borderBottomColor = "red";    
        }
}

let URL = 'http://localhost:3000/galleryStore/';
let header = new Headers();
header.append("Content-Type","Application/json")
// post the user information to database .......................................

function register(){
  
    fetch( URL +  "register",{
      method:"POST",
      headers:header,
      body:JSON.stringify({
        email:Email_SignUp.value,
        password:Pass_SignUp.value,
        name:Name_SignUp.value,
        address:Address_SignUp.value,
        phone:Phone_SignUp.value
      })
    }).then(re=>
      re.json()
    ).then(data=>{
      console.log(data)
        if(data.status == 226) {
          Email_SignUp_P.innerHTML = "your Email is Exists";
          Email_SignUp.style.border="2px solid red";
        }else{
          localStorage.setItem("_EW",true)
          Email_SignUp_P.innerHTML = "";
          localStorage.setItem("token",data.token)
          localStorage.setItem("id" , data.id)    
          window.location.replace("../profile/profile.html")
        }
    })
  }
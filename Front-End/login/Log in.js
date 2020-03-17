// for input Log In
let Email_LogIn = document.getElementById("email");
let Pass_LogIn = document.getElementById("password");

// for input text Log in
let Email_LogIn_p = document.getElementById("alert_email");
let Pass_LogIn_p = document.getElementById("alert_password");

let URL = 'http://localhost:3000/galleryStore/';
let header = new Headers();
header.append("Content-Type","Application/json")

function LogIn() {

    fetch( URL + 'login', {
        method: 'post',
        headers: header,
        body: JSON.stringify({
            email: Email_LogIn.value,
            password: Pass_LogIn.value
        })
    }).then(re => re.json()).then(data => {
      console.log(data)
     

        if(data.status == 200) {
          Pass_LogIn.style.borderBottomColor = 'green';
          Email_LogIn.style.borderBottomColor = 'green';
          Pass_LogIn.value = "";
          Email_LogIn.value = "";      
          localStorage.setItem("token" , data.token)
          localStorage.setItem("id" , data.id)
          localStorage.setItem("_EW",true)
          window.location.replace("../home/index.html")
        }else if(data.status == 400) {
          Pass_LogIn_p.innerHTML = "your password dosen't exist";
          Pass_LogIn.style.borderBottomColor = 'red';
          Pass_LogIn.value = "";
        }else if(data.status == 404){
          Email_LogIn_p.innerHTML = "your email wrong or dosen't exist";
          Email_LogIn.style.borderBottomColor = 'red';
        }


    })
 
}
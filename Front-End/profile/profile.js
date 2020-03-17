let inputs = document.getElementsByName("input");
let buttons = document.getElementById("buttons");
let save = document.getElementById("save");
let hide = document.getElementById("hide");
let file = document.getElementById("file");
let edit_btn = document.getElementById("edit");
let CHANGE_IMAGE = 0;
let profile_image = document.getElementById("image");
let name = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let address = document.getElementById("address");
let dataa = document.getElementById("data");
let b64 = "";

let id = localStorage.getItem("id");
let URL = "http://localhost:3000/galleryStore/";

gettrainers();
check_is_have_token();

save.addEventListener("click", e => {
  // fetch
  CHANGE_IMAGE = 0;
  buttons.style.display = "none";
  edit_btn.style.display = "block";
  for (let i = 0; i < inputs.length; i++) {
    if (i == 1) {
    } else {
      inputs[i].setAttribute("disabled", "");
    }
  }
});
hide.addEventListener("click", e => {
  buttons.style.display = "none";
  edit_btn.style.display = "block";
  CHANGE_IMAGE = 0;
  for (let i = 0; i < inputs.length; i++) {
    if (i == 1) {
    } else {
      inputs[i].setAttribute("disabled", "");
    }
  }
});
function edit() {
  edit_btn.style.display = "none";
  CHANGE_IMAGE = 1;
  for (let i = 0; i < inputs.length; i++) {
    if (i == 1) {
    } else {
      inputs[i].removeAttribute("disabled");
    }
  }
  buttons.style.display = "block";
}
function change_image() {
  if (CHANGE_IMAGE == 1) {
    file.click();
  } else {
  }
}
file.addEventListener("change", e => {
  let data = e.target;
  let newImage = new FileReader();
  newImage.onload = function() {
    let result = newImage.result;
    console.log(result)
    b64 = result;
    profile_image.src = result;
    console.log(profile_image);
  };
  newImage.readAsDataURL(data.files[0]);
});

function gettrainers() {
  fetch(URL + "id/" + id)
    .then(Response => Response.json())
    .then(data => {
      name.value = data[0].name;
      email.value = data[0].email;
      phone.value = data[0].phone;
      address.value = data[0].address;
      if(data[0].photo===null){

      }else{
        profile_image.src = "http://localhost:3000/" + data[0].photo;

      }
      console.log(data);
    });
}

console.log(b64);
function editeDate() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const num = document.getElementById("phone").value;
  const Id = localStorage.getItem("id");
  console.log(Id);
  const myheader = new Headers();

  myheader.append("Content-Type", "application/json");
  myheader.append("authorization", localStorage.getItem("token"));

  const body = {
    name: name,
    address: address,
    phone: num,
    photo: b64
  };
  if (b64 !== "") {
    body.photo = b64;
  }
  console.log(body);
  fetch(URL + "EditeInformation", {
    method: "put",
    headers: myheader,
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.setItem("_EW", false);
  window.location.href = "../home/index.html";
}
function check_is_have_token() {
  let sign_up = document.getElementById("sign_ups");
  let login = document.getElementById("logins");
  let span = document.getElementById("span");
  let logouts = document.getElementById("logout");

  let token = localStorage.getItem("token");
  let id = localStorage.getItem("id");
  let _EW = localStorage.getItem("_EW");
  if (token == undefined) {
    localStorage.setItem("_EW", false);
    NO_TOKEN();
  }
  if (id == undefined) {
    localStorage.setItem("_EW", false);
    NO_TOKEN();
  }
  if (_EW == undefined && _EW === "false") {
    localStorage.setItem("_EW", false);
    window.location.href = "../home/index.html";
    NO_TOKEN();
  }
  if (_EW ==="true") {
    console.log("YES TOKEN");
    let btn = document.getElementsByClassName("profile");

    sign_up.style.display = "none";
    span.style.display = "none";
    login.style.display = "none";
    logouts.style.display = "block";
    for (let i = 0; i < btn.length; i++) {
      btn[i].style.display = "block";
    }
  } else {
    logouts.style.display = "none";
  
    console.log("NO TOKEN");
    window.location.href = "../home/index.html";

  }
}
function NO_TOKEN() {

  let btn = document.getElementsByClassName("profile");
  for (let i = 0; i < btn.length; i++) {
    if (i == 0 || i == 3) {
    } else {
      btn[i].style.display = "none";
    }
   
  }
}


let dialog = document.getElementById("dialog");
let items = document.getElementsByName("item");
let dialog_add = document.getElementById("dialog_add");
let file = document.getElementById("file");
let user_image = document.getElementById("image");
let name = document.getElementById("name");
let size = document.getElementById("size");
let sallery = document.getElementById("sallery");
let notes = document.getElementById("notes");
let kind = document.getElementById("kind");
let list = document.getElementById("list");
let image_name=document.getElementById("image_name")
let number=document.getElementById("number")

let b64 = "";
let URL = "http://localhost:3000/galleryStore/";
check_is_have_token();
const myheader = new Headers();
myheader.append("Content-Type","Application/json");
myheader.append("authorization", localStorage.getItem("token"));

user_image.addEventListener("click",e=>{
    file.click()
})


file.addEventListener("change", e => {
  let data = e.target;
  let newImage = new FileReader();
  newImage.onload = function() {
    let result = newImage.result;
    b64 = result;
    b64 = b64.split(";base64,").pop();

    user_image.src = result;
  };
  newImage.readAsDataURL(data.files[0]);
});

/////////////////////////////////////////////////////////
for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("click", e => {
    dialog.style.display = "block";
  });
}
function delete_image() {
  dialog.style.display = "none";
  fetch(URL +"deleteimage/"+localStorage.getItem("_Ics"),{
    method:"DELETE",
    headers:myheader
    
  }).then(re=>re.json()).then(res=>{
    window.location.reload()
  })
}


function save() {
  dialog.style.display = "none";

  fetch(URL +"editimage/"+localStorage.getItem("_Ics"),{
    method:"PUT",
    headers:myheader,
    body:JSON.stringify({
      name:image_name.value,
      sallery:number.value
    })
  }).then(re=>re.json()).then(res=>{
    window.location.reload()
  })
}
function add() {
  dialog.style.display = "none";
  // FETCH
  let data = {
    name: name.value,
    sallery: sallery.value,
    size: size.value,
    photo: b64,
    notes: notes.value,
    kind: kind.value,
    id: localStorage.getItem("id")
  };

  fetch(URL + "addimage",{
   method:"POST",
   headers:myheader,
    body: JSON.stringify({data})
  }).then(re=>re.json()).then(res=>{
      console.log(res)
     
  })
}

fetch(URL +localStorage.getItem("id")).then(re=>re.json()).then(res=>{
    console.log(res)
       for(let i=0;i<res.data.length;i++){
        
        let item =`<div class="item" name="item" id-img=${res.data[i].id}>
        <div class="img-border">
            <img src="${"http://localhost:3000/"+res.data[i].photo}" class="img">
        </div>
        <div class="header-item">
            <span class="name">${res.data[i].sallery}</span>
            <span class="name">JD</span>
        </div>
        
        </div>
        
        `
        list.innerHTML+=item
        for (let i = 0; i < items.length; i++) {
          items[i].addEventListener("click", e => {
            dialog.style.display = "block";
            let id=e.target.parentElement.parentElement.getAttribute("id-img")
            console.log(id)
            fetch(URL+"dataimage/"+id).then(re=>re.json()).then(data=>{
                 image_name.value=data.data[0].name
                 number.value=data.data[0].sallery
                 localStorage.setItem("_Ics",id)
            })
          
          });
        }         
       }

      
})
 
 

















function close_dialog() {
  dialog.style.display = "none";
  // FETCH
}
function close_dialog_add() {
  dialog_add.style.display = "none";
  // FETCH
}

function show_dialog_add() {
  dialog_add.style.display = "block";
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
  if (_EW === "true") {
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




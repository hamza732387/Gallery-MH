check_is_have_token()
let URL = "http://localhost:3000/galleryStore/";
let list = document.getElementById("list");

let items = document.getElementsByClassName("item");





    list.innerHTML = `<div class="popup" id="popup" id="hh">
    <div class="popup-inner">
     <div class="popup-photo">
          <img src="" id = "image"> 
        </div> 
        <div class="popup-text">
            <a href="#hh" class="popup-close">X</a>
            <h1 id="title"></h1>
            <button class = "buy" id = "buy"> Buy </button>
            <h2>  Kind of picture </h2><span id="kind"></span> <br>
            <h2> Price  </h2><span id="number">  </span> <br>
            <h2> Size of picture   </h2><span id="size"></span> <br>
            <h2> more ditels</h2><span id="date"></sapn> <br>
           
          
   
        </div>
    </div>
    `
    
    fetch(URL).then(re => re.json()).then(res => {
      console.log(res)
    
      for (let i = 0; i < res.data.length; i++) {
        let item = `<div class="item" name="item" id-img="${res.data[i].id}" id_user = "${res.data[i].id_user}"> 
          <div class="img-border">
          <a href="#popup">  <img src="${"http://localhost:3000/" + res.data[i].photo}" class="img" id = "${res.data[i].id}"> </a>
          </div>
          <div class="header-item">
              <span class="name">${res.data[i].sallery}</span>
              <span class="name">JD</span>
          </div>
          
          </div>
          `

        list.innerHTML += item
      }
    
      for (let i = 0; i < res.data.length; i++) {
        items[i].addEventListener("click", e => {
          let id = e.target.parentElement.parentElement.parentElement.getAttribute("id-img")
          let id_user = e.target.parentElement.parentElement.parentElement.getAttribute("id_user")
          localStorage.setItem('_IOkr' , id_user)
          console.log(id)
          location.href + "#popup"
          fetch(URL +"image/"+ id).then(re => re.json()).then(data => {
            console.log(data)
            let title = document.getElementById("title");
            let img = document.getElementById("image");
            let number = document.getElementById("number");
            let date = document.getElementById("date");
            let kind = document.getElementById("kind");
            let size = document.getElementById("size");
    
            let X = data.data[0]
            title.innerHTML = X.name
            number.innerHTML = X.sallery+"<span> JD </span>"
            date.innerHTML = X.notes
            kind.innerHTML = X.kind
            size.innerHTML = X.size
            img.src="http://localhost:3000/"+X.photo
            console.log(X)
            let buy = document.getElementById("buy").addEventListener('click' , moveToProfile
            
            )
          })
        })
      }
    
    })

    function moveToProfile() {
      if(localStorage.getItem('_EW') == "false") {
        window.location.href = '../login/Log in.html'
      }else if(localStorage.getItem('_EW') == "true") {
        window.location.href = "../innerProfile/profile.html";
      }
    }
////////////////////////////////////////////////////////////
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
      // login.style.display = "block";
      // sign_up.style.display = "block";
      // span.style.display = "block";
      console.log("NO TOKEN");
  
    }
  }
  function NO_TOKEN() {
  
    let btn = document.getElementsByClassName("profile");
    for (let i = 0; i < btn.length; i++) {
      if (i == 0 || i == 3) {
      } else {
        btn[i].style.display = "none";
      }
      // sign_up.style.display = "block";
      // span.style.display = "block";
      // login.style.display = "block";
      // logouts.style.display = "none";
    }
  }
  
let oldp = document.getElementById("Old");
let newp = document.getElementById("New");
let OLd_P = document.getElementById("OldP");
let NEW_P = document.getElementById("NewP");
let Conferm = localStorage.getItem('Conferm');
// console.log(token)
let token = localStorage.getItem('token')
let hamza = new Headers();
hamza.append('content-type' , 'application/json');
hamza.append('authorization',token);
let URLT = 'http://localhost:3000/galleryStore/';
function put() {
fetch(URLT + 'EditePassword',{
	method : 'put',
	headers : hamza,
	body : JSON.stringify({
		old_password : oldp.value,
		new_password : newp.value,
	})
}).then(re =>{
	return re.json()
}).then(data=>{

    if(data.status == 404) {
        OLd_P.innerHTML = 'Your Password Wrong Or dosent exist';
    }else{
	console.log(data)
	let token = data.token;
	localStorage.setItem('token',token)
	window.location.href = "../profile.html"
	}
})
}
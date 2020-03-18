const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    trainee = require('./api/trainee'),
    port = process.env.PORT || 3000
;
// 
app.use(express.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/images',express.static(__dirname + '/api/images/'));
app.use('/api/profile',express.static(__dirname + '/api/profile/'));
app.use(express.static('./Front-End/'));
app.use(trainee)

app.get("/" , (req , res)=>{
    res.sendFile(__dirname + '/Front-End/home/index.html')
})
app.get("/SignUp" , (req , res)=>{
    res.sendFile(__dirname + '/Front-End/signup/Sign Up.html')
})
app.get("/profile" , (req , res)=>{
    res.sendFile(__dirname + '/Front-End/profile/profile.html')
})
app.get("/EditePassword" , (req , res)=>{
    res.sendFile(__dirname + '/Front-End/changPassword/EditePassword.html')
})
app.get("/myphoto" , (req , res)=>{
    res.sendFile(__dirname + '/Front-End/my photo/myphoto.html')
})
app.get("/Log in" , (req , res)=>{
    res.sendFile(__dirname + '/Front-End/login/Log in.html')
})
app.get("/profile" , (req , res)=>{
    res.sendFile(__dirname + '/Front-End/innerProfile/profile.html')
})

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});


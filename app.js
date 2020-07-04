const express = require("express");
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer');
const app = express();
const {check,validationResult} =  require('express-validator');
const { response } = require("express");


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(process.env.PORT, () => 
{
    console.log("Web Server is running");
});

app.get("/", (req,res) => 
{
    res.render("index",{
        title: "Home"
    });
});

app.get("/packages", (req,res) => 
{
    res.render("packages",{
        title: "Packages"
    });
});

app.get("/ourdishes", (req,res) => 
{
    res.render("ourdishes",{
        title: "Our Dishes"
    });
});

app.get("/login", (req,res) => 
{
    res.render("login",{
        title: "Login"
    });
});
app.post('/log',(req,res)=>
{ 
    
    let pass= "";
    let mail = "";
    let TempMail = "rdpatel30@myseneca.ca";
    let TempPass = "Password";
    if(req.body.Email == ""){
                mail = "This field cannot be empty";
    }  
    else{
    let regular_expression = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(req.body.Password == "")
    {
        pass = "Enter Password";
    }else if(req.body.Password.match(regular_expression))
        {
        }else{
        pass = "Password must be 6 digit or longer and must be alpha numeric combination and must start with a capital letter";
    }
}
        const Email = req.body.Email;
    if(pass != "" || mail !="" )
    {
        res.render("login",
        {
            title: "Error in submission",
            mError: mail,
            pError: pass
        });
    }
    
});
app.get("/register", (req,res) => 
{
    res.render("register",{
        title: "Register"
    });  
});

app.post('/send',(req,res)=>
{ 
    let fname = "";
    let lname = "";
    let pass= "";
    let mail = "";
    if(req.body.firstname == ""){
        fname = "This field cannot be empty";
    }
        
        if(req.body.lastname == ""){
            lname = "This field cannot be empty";
        }
            
            if(req.body.Email == ""){
                mail = "This field cannot be empty";
            } 
   

    let regular_expression = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if(req.body.Password == "")
    {
        pass = "Enter Password";
    }else if(req.body.Password.match(regular_expression))
        {
        }else{
        pass = "Password must be 6 digit or longer and must be alpha numeric combination and must start with a capital letter";
    }
       
    if(pass != "" || fname != "" || lname != "" || mail !="" )
    {
        res.render("register", {
            title: "Error in submission",
            pError: pass,
            fError: fname,
            lError: lname,
            mError: mail
        });
    }
    else{

        
        
    const Email = req.body.Email;
    const output = `
    <h3>Contact Details</h3>
    <ul>
    <li>firstname: ${req.body.firstname}</li>
    <li>lastname: ${req.body.lirstname}</li>
    <li>Email: ${req.body.Email}</li>
    <li>Password: ${req.body.Password}</li>
    </ul>
    `;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dummyyep977@gmail.com',
          pass: 'Dumpster@101'
        }
      });
      var mailOptions = {
        from: 'dummyyep977@gmail.com',
        to: Email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    res.render("welcome",{
        title: "Welcome"
    });
    }
});
app.get("/welcome", (req,res) => 
{
    res.render("welcome",{
        title: "Congrats"
    });  
});
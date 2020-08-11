const express = require("express");
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer');
var createError = require('http-errors');
const app = express();
const {check,validationResult} =  require('express-validator');
const { response } = require("express");
var cookieParser = require('cookie-parser');
const flash = require('express-flash');
const fileUpload = require("express-fileupload");
const hbs = require('express-handlebars');
const clientSessions = require("client-sessions");
const fs = require('fs');
const multer = require('multer');
var expressSession = require("express-session");
const hbshelpers = require('handlebars-helpers');
const multihelpers = hbshelpers();
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const UsrModel = require('./database/models/User');
var mongoose = require("mongoose");
var controller = require('controller');
const auth = require("./middleware/auth");
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
  app.use(clientSessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: "week10example_web322", // this should be a long un-guessable string.
    duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
    activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
  }));
  const productListController = require("./controller/product/productList");
  const storeMealPackageController = require("./controller/product/storeMealPackage");
  const editMealPackageController = require("./controller/product/editMealPackage");
  const updateMealPackageController = require("./controller/product/updateMealPackage");
  const deleteMealPackageController = require("./controller/product/deleteMealPackage");
  const viewProductController = require("./controller/product/viewProduct");
  mongoose.connect("mongodb+srv://dbrdpatel30:Varu1004@cluster0.igecx.mongodb.net/Web322_week8?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB..."))
.catch(err => console.error("Could not connect to MongoDB..."));

  // CREATE SCHEMA

  app.engine(
    "handlebars",
    hbs({
      helpers: multihelpers,
      // partialsDir: ["views/partials"],
      extname: ".handlebars",
      layoutsDir: "views/layouts",
      defaultLayout: "main"
    })
  );
  app.set('view engine', 'handlebars');
  app.use(fileUpload());
  app.use(flash());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static("Public"))

  function ensureLogin(req, res, next) {
      console.log("ahiya aayu");
    if (!req.session.account2) {
      res.redirect("/login");
    } else {
      next();
    }
  }
  function ensureAdmin(req, res, next) {
    if (!req.session.account1) {
      res.redirect("/login");
    } else {
      next();
    }
  }
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const companySchema = new Schema({
  "firstname":  String,
  "lastname": String,
  "Email": String,
  "Password": String,
  "employee": String
});



const MealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    cate: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    mealImage: {
        data: Buffer,
        contentType: String
    },
});

const MealPost = require('./database/models/Meal');
const Meal = require("./database/models/Meal");


app.listen(4000, () =>
{
    console.log("Web Server is running");
});
function onHttpStart() {
    console.log("Express http server listening on: ");
  }

app.get("/", (req,res) => 
{
    res.render("index",{
        title: "Home"
    });
});

app.get("/logout", function(req, res) {
    req.session.reset();
    res.redirect("/login");
  });

  app.get('/packages', productListController);

app.get("/ourdishes", (req,res) => 
{
    res.render("ourdishes",{
        title: "Our Dishes"
    });
});
app.get('/view_product', (req, res) => {  
    MealPost.findOne({ name: req.query.name }, function (err, docs3) {
      if (err)
        res.json(err)
      else {
        res.render("view_product", {
          title: "Meal Package",
          name: docs3.name,
          price: docs3.price,
          desc: docs3.desc,
          number: docs3.number,
        });
      }
    });
  })
app.get("/deleteMeal",ensureAdmin,(req,res) =>
{
    res.render("deleteMeal",{
        title: "Delete"
    })
});
app.post("/delete",ensureAdmin,(req,res) =>
{
    if(req.body.delete != ""){
        MealPost.findOne({name:`${req.body.delete}`})
        .exec()
        .then((account)=>{
            if(!account){
                res.render("login",{title:"Login",});
            }else{
                console.log("account.Password");
                console.log(account.name);
                console.log(account.desc);
                console.log(account.cate);
                MealPost.deleteOne({ name: `${req.body.delete}` }, function(err, result) {
                    if (err) {
                      console.log("maja");
                    } else {
                        console.log(result);
                      res.redirect("packages");
                    }
                  });
        }
        });
    }
});
app.get("/editMealPackage",ensureAdmin,(req,res) =>
{
    res.render("editMealPackage",{
        title: "Delete"
    })
});
app.post("/update",ensureAdmin,(req,res) =>
{ 
    if(req.body.name != "" && req.body.desc != "" && req.body.cate != "" && req.body.Price != "" && req.body.number != ""){
        MealPost.findOne({name:`${req.body.name}`})
        .exec()
        .then((account)=>{
            if(!account){
                res.render("editMealPackage",{title:"Does not exist",});
            }else{
                console.log("account.Password");
                console.log(account.name);
                console.log(account.desc);
                console.log(account.cate);
                MealPost.updateOne({ name : `${req.body.name}` }, [ 
                   { $set: {name : `${req.body.name}`}},
                   { $set: {Price : `${req.body.Price}`}},
                   { $set: {desc : `${req.body.desc}`}},
                   { $set: {number : `${req.body.number}`}},
                   { $set: {cate : `${req.body.cate}`}}
                ],function(err, result) {
                    if (err) {
                      console.log("maja");
                    } else {
                        console.log(result);
                      res.redirect("packages");
                    }
                    });
        }
        });
    }
});
app.get("/edit/meal/package/:id", auth, editMealPackageController);
app.get("/view_product",ensureAdmin, viewProductController);
app.post("/update/meal/package/:id", auth, updateMealPackageController);
app.get("/delete/meal/package/:id", auth, deleteMealPackageController);
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
    }else{
        const v = req.body.email;
       
        UsrModel.findOne({Email:`${req.body.Email}`})
        .exec()
        .then((account)=>{
            if(!account){
                res.render("login",{title:"Login",});
            }else{
                console.log(account.Password);
                if(!bcrypt.compareSync(req.body.Password,account.Password)){
                        console.log(account.employee);
                        if(account.employee == 'employee')
                              {
                                  console.log("andar ave che");
                                  console.log(account.firstname);
                                  req.session.account1 = {Email: account.Email}
                                  res.render("ad_db",{fname : account.firstname , lname :account.lastname});
                              }
                              else{
                                console.log("andar ave che");
                                  req.session.account2 = {Email: account.Email}
                                  res.render("welcome",{fname : account.firstname , lname :account.lastname});
                               }        
                    }
                    else{
                        res.render("login",{title:"Wrong Password,"});
                    }
                };
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
   
    const newData = new UsrModel({
        firstname : `${req.body.firstname}`,
        lastname : `${req.body.lastname}`,
        Email: `${req.body.Email}`,
        Password: `${req.body.Password}`,
        employee: `${req.body.employee}`
     });
     
     console.log(newData);
    UsrModel.findOne({Email:`${req.body.Email}`})
    .exec()
    .then((account)=>{
        if(account){
            console.log("Part 1");
            res.render("register",{title:"user exists",});
        }else{
            console.log("Part ");
            req.body.Password = bcrypt.hashSync(req.body.Password,10);
            const newData = new UsrModel({
               firstname : `${req.body.firstname}`,
               lastname : `${req.body.lastname}`,
               Email: `${req.body.Email}`,
               Password: `${req.body.Password}`,
               employee: `${req.body.employee}`
            });
            
            console.log(newData);
        
            newData.save((err) => {
                if(err) {
                  console.log("Error1");
                  res.render("register", {
                    title: "Submission"
                });
        
                } else {
        
                    bcrypt.genSalt(12, function (err, salt) {
                    if (err) {
                            console.log("Error2");
                    }else{
        
                        bcrypt.hash(req.body.Password, salt, function (err, hash) {
        
                            if (err) {
                                console.log(err);
                            } else {
        
                                UsrModel.updateOne(
                                    {Email: req.body.Email},
                                    {$set: {Password: hash}}
                                ).exec();
        
                            }
                        });
                    }
                });
              }
                
            });
            };
    });
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

    res.render("login",{
        title: "Login"
    });

    }
    });

app.get("/welcome", ensureLogin, (req, res) => {
    console.log("working");
    res.render("welcome", {user: req.session.user, layout: false});
  });

  app.get("/ad_db", ensureAdmin, (req, res) => {
    console.log("working");
    res.render("ad_db", {user: req.session.user, layout: false});
  });
  app.get("/add_meal", ensureAdmin,(req,res) => 
  {
      res.render("add_meal",{
          title: "Register"
      });  
  });
  app.get("/editMealPackage", ensureAdmin,(req,res) => 
  {
      res.render("editMealPackage",{
          title: "editMealPackage"
      });  
  });
app.post("/editMealPackage",ensureAdmin,editMealPackageController);

app.post("/update/meal/package/:id",ensureAdmin, updateMealPackageController);

  app.post("/store/meal/package",ensureAdmin,  storeMealPackageController);
//   app.post("/add",(req,res)=>
//   {    
//       const { mealImage }= req.files;
//       let imageData = mealImage.data;
//       letimageType = mealImage.immetype
//       console.log("ander to ayu");   
//         MealPost.create({
//             name : `${req.body.name}`,
//             price : `${req.body.price}`,
//             desc : `${req.body.desc}`,
//             cate:`${req.body.cate}`,
//             number:`${req.body.number}`,
//             mealImage: {
//                 data: imageData,
//                 contentType: imageType
//             },
//         });
        
//   });
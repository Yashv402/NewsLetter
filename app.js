const https= require("https");
const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const app= express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("images"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const first_Name= req.body.fn;
    const last_Name= req.body.ln;
    const e_mail= req.body.mail;
    const data = {
        members: [{
            email_address: e_mail,
            status: "subscribed",
            merge_fields: {
                FNAME: first_Name,
                LNAME: last_Name
            }
        }]
    };
    const jsonData = JSON.stringify(data);


    const url = "https://us9.api.mailchimp.com/3.0/lists/76af56bc01";
    const options= {
        method: "POST",
        auth: "Yashvi:b8288d99d82eb28ac735279ac37c455d-us9"
    }
    const reqst = https.request(url, options ,function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    reqst.write(jsonData);
    reqst.end();
});
app.post("/failure.html", function(req,res){
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("Working");
});



// API Key b8288d99d82eb28ac735279ac37c455d-us9

// 76af56bc01
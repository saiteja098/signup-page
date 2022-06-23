const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
        res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var checkbox = req.body.checkbox;

    console.log(fname + lname + email + checkbox);

    const url = "https://us13.api.mailchimp.com/3.0/lists/6896f76f0a";

    const options = {
        method: "POST",
        auth : "saiteja:e4a0baad47cff0f1f4a165e817793d61-us13"

    }

    var data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME: lname,
                },
                
            }
        ]

    }

    const jsonData = JSON.stringify(data);
    
    const request = https.request(url, options, function(response){
        
        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname +"/failure.html");
        }
                       


                       response.on("data", function(data){
                        console.log(JSON.parse(data));
                       })
                     });

      request.write(jsonData);
      request.end();
   
});


app.post( "/failure", function(req, res){
    res.redirect("/");
})




app.listen(process.env.PORT || 3000, function(){
    console.log("server is up and running on port 3000.");
})








//api key
//e4a0baad47cff0f1f4a165e817793d61-us13

//audience id
//6896f76f0a
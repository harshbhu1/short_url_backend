
const URL = require("../models/url");
async function allUrlgenereatedOneByUser(req,res) {
     if (!req.user) return res.redirect("/login");
     const allurls = await URL.find({ createdBy: req.user._id });

     return res.render("home", {
       urls: allurls,
     });
    
}

// for user not login 

async function handleLogin(req,res) {

   return res.render("login");
    
}

async function handleSignUp(req,res) {
     return res.render("signup");
}

module.exports = { allUrlgenereatedOneByUser, handleLogin, handleSignUp };
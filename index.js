const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
  path: "./.env", 
});

const cookieParser = require("cookie-parser");

const path = require("path");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const app = express();
console.log(process.env.DB_URL, "aniruddh");

connectToMongoDB(process.env.DB_URL)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log("connection failed", err);
  });
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   console.log(allUrls);
//   return res.render('home',{
//     urls:allUrls,
//     name:'Piyu'
//   })}
// );

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          Timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectURL);
});

app.listen(process.env.PORT, () => {
  console.log(`my app is listening on ${process.env.PORT}`);
});

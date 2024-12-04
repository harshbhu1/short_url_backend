const shortid = require("shortid");

const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", { id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

// for patch request of the router

async function handleUpdateDomain(req, res) {
  const id = req.params.id;
  try {
    const updatedpost = await URL.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedpost) {
      return res.status(400).json({ message: "data is not found" });
    }
    return res.status(200).json(updatedpost);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "server side error" });
  }
}

// put request and update all the things


module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleUpdateDomain,
};

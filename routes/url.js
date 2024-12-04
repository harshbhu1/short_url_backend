const express = require('express'); 
const {handleGenerateNewShortURL,handleGetAnalytics,handleUpdateDomain} = require('../controllers/url');



 const router = express.Router();

 router.post('/',handleGenerateNewShortURL);
 router.patch('/:id',handleUpdateDomain);
 router.get('/analytics/:shortId',handleGetAnalytics);
 module.exports = router;
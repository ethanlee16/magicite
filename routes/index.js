var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.post('/citations', function(req, res, next) {
  Promise.all(req.body.urls.map(url => cite(url))).then(response => {
    res.json(response.map(citation => citation.data).sort());
  }).catch(err => {
    next(err);
  });
});

function cite(url) {
  return fetch('https://autocite.citation-api.com/index/json?url=' + url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + process.env.EASYBIB,
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(({status, data, message}) => {
    if(status !== 'ok') throw new Error(message);
    data.data.style = 'mla7';
    data.data.key = process.env.EASYBIB_KEY;
    return fetch('http://api.citation-api.com/2.1/rest/cite', {
      method: 'POST',
      body: JSON.stringify(data.data)
    })
  })
  .then(response => response.json())
  .catch(err => console.error(err));
}

module.exports = router;

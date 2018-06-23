var express = require('express');
var router = express.Router();
var scraper = require('../scraper/ex_scraper.js');


/* GET home page. */
router.get('/', async function(req, res, next) {
    var params = req._parsedUrl.query.split('&')
    var url ='https://www.expedia.com/carsearch/pickup/list/results?pickUpDate='+ encodeURI(params[1].split('=')[1])+'&pickUpTime=1200&dropOffDate='
            +encodeURI(params[2].split('=')[1])+'&dropOffTime=1200&pickUpSearchType=4&pickUpSearchTerm='+encodeURI(params[0].split('=')[1])+'&dropOffSearchTerm='
            +encodeURI(params[0].split('=')[1])+'&dropOffSearchType=4&radiusDistance=25&age=30&ageInRange=true&clientTimeZoneOffset=0'
    var val = "No data";
    await scraper.get(url).then(data => {val = scraper.xml_gen(scraper.parser(JSON.parse(data)))})
    res.contentType('application/xml')
    res.send(val);
});

module.exports = router;

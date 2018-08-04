var express = require('express');
var router = express.Router();
var scraper = require('../scraper/ex_scraper.js');


/* GET home page. */
//http://167.99.81.142/expedia/?pickupID=Fort%2BLauderdale+%2BFL%2B%28FLL-Fort%2BLauderdale%2B-%2BHollywood%2BIntl.%29&PickUpDateTime=06-25-2018&ReturnDateTime=06-30-2018&Currency=USD
router.get('/', async function(req, res, next) {
    var params = req._parsedUrl.query.split('&')
    
    var url ='https://www.expedia.com/carsearch/pickup/list/results?pickUpDate='+ encodeURI(params[1].split('=')[1])+'&pickUpTime='+encodeURI(params[4].split('=')[1])+'&dropOffDate='
            +encodeURI(params[2].split('=')[1])+'&dropOffTime='+encodeURI(params[4].split('=')[1])+'&pickUpSearchType=4&pickUpSearchTerm='+encodeURI(params[0].split('=')[1])+'&dropOffSearchTerm='
            +encodeURI(params[0].split('=')[1])+'&dropOffSearchType=4&radiusDistance=25&age=30&ageInRange=true&clientTimeZoneOffset=0'
    var val = "No data";
    await scraper.get(url).then(data => {val = scraper.xml_gen(scraper.parser(JSON.parse(data)))})
    res.contentType('application/xml')
    res.send(val);
});

module.exports = router;

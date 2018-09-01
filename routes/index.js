var express = require('express');
var router = express.Router();
var scraper = require('../scraper/ex_scraper.js');


/* GET home page. */
//http://167.99.81.142/expedia/?pickupID=Fort%2BLauderdale+%2BFL%2B%28FLL-Fort%2BLauderdale%2B-%2BHollywood%2BIntl.%29&PickUpDateTime=06-25-2018&ReturnDateTime=06-30-2018&Currency=USD
router.get('/', async function(req, res, next) {
    var params = req._parsedUrl.query.split('&')
    var time = 1000;
    if(params.length > 4){ 
        time = encodeURI(params[4].split('=')[1])
    }

    var url ='https://www.expedia.com/carsearch/pickup/list/results?pickUpDate='+ encodeURI(params[1].split('=')[1])+'&pickUpTime='+time+'&dropOffDate='
            +encodeURI(params[2].split('=')[1])+'&dropOffTime='+time+'&pickUpSearchType=4&pickUpSearchTerm='+encodeURI(params[0].split('=')[1])+'&dropOffSearchTerm='
            +encodeURI(params[0].split('=')[1])+'&dropOffSearchType=4&radiusDistance=25&age=30&ageInRange=true&clientTimeZoneOffset=0'
    var val = "No data";
    await scraper.get(url).then(data => {val = scraper.xml_gen(scraper.parser(JSON.parse(data)))})
    res.contentType('application/xml')
    res.send(val);
});
router.get('/uk', async function(req, res, next) {
    var params = req._parsedUrl.query.split('&')
    var time = 1000;
    if(params.length > 4){
        time = encodeURI(params[4].split('=')[1])
    }

    var url ='https://www.expedia.co.uk/carsearch/pickup/list/results?' +
        'loc2='+encodeURI(params[0].split('=')[1])+'&' +
        'time1='+time+'&' +
        'time2='+time+'&' +
        'retrieveUrgencyCount=true' +
        '&ageInRange=true&' +
        'date2='+encodeURIComponent(params[2].split('=')[1])+'&' +
        'date1='+ encodeURIComponent(params[1].split('=')[1])+'&' +
        'locn='+encodeURI(params[0].split('=')[1])+'&retrieveNeighborhoods=true&clientTimeZoneOffset=0'

    // var url ='https://www.expedia.co.uk/carsearch/pickup/list/results/script?loc2=London%2C%20England%2C%20UK%20%28LCY-London%20City%29&time1=1000AM&time2=1000AM&retrieveUrgencyCount=true&ageInRange=true&date2=13%2F09%2F2018&date1=05%2F09%2F2018&locn=London%2C%20England%2C%20UK%20%28LHR-Heathrow%29&retrieveNeighborhoods=true&'
    var val = "No data";
    await scraper.get(url).then(data => {val = scraper.xml_gen(scraper.parser(JSON.parse(data)))})
    res.contentType('application/xml')
    res.send(val);
});
// var url ='https://www.expedia.fr/carsearch/pickup/list/results?pickUpDate='+ encodeURI(params[1].split('=')[1])+'&pickUpTime='+time+'&dropOffDate='
//     +encodeURI(params[2].split('=')[1])+'&dropOffTime='+time+'&pickUpSearchType=4&pickUpSearchTerm='+encodeURI(params[0].split('=')[1])+'&dropOffSearchTerm='
//     +encodeURI(params[0].split('=')[1])+'&dropOffSearchType=4&radiusDistance=25&age=30&ageInRange=true&clientTimeZoneOffset=0'

router.get('/fr', async function(req, res, next) {
    var params = req._parsedUrl.query.split('&')
    var time = '1000AM';
    if(params.length > 4){
        time = encodeURI(params[4].split('=')[1])
    }
    var url ='https://www.expedia.fr/carsearch/pickup/list/results?pickUpDate='+ encodeURI(params[1].split('=')[1])+'&pickUpTime='+time+'&dropOffDate='
    +encodeURI(params[2].split('=')[1])+'&dropOffTime='+time+'&pickUpSearchType=4&pickUpSearchTerm='+encodeURI(params[0].split('=')[1])+'&dropOffSearchTerm='
    +encodeURI(params[0].split('=')[1])+'&dropOffSearchType=4&radiusDistance=25&age=30&ageInRange=true&clientTimeZoneOffset=0'
    console.log(url)
    var val = "No data";
    await scraper.get(url).then(data => {val = scraper.xml_gen(scraper.parser(JSON.parse(data)))})
    res.contentType('application/xml')
    res.send(val);
});
module.exports = router;

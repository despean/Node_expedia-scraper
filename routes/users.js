var express = require('express');
var router = express.Router();
var scraper = require('../scraper/booking');

/* GET users listing. */
router.get('/', async function (req, res, next) {
    var params = req._parsedUrl.query.split('&')
    var time = 1000;

    if (params.length > 4) {
        time = encodeURI(params[4].split('=')[1])
    }
    var pickupdatetime = params[1].split('=')[1].split('/').join('').concat(time);
    var dropoffdatetime = params[2].split('=')[1].split('/').join('').concat(time);
    var currency = params[3].split('=')[1]

    var id = await scraper.get_loc(decodeURI(params[0].split('=')[1]));
    var $url = 'https://www.economybookings.com/prx.php?a=&m=s&c=cars/en/' + id + '/' + id + '/' + pickupdatetime + '/' + dropoffdatetime + '/35%3Fcoupon=%26countryOfResidence=39%26customerCurrency=' + currency;
    var val = "No data";
    await scraper.get($url).then(async (data) => {
        // console.log(scraper.parser(data))
        val = await scraper.parser(data)
//         res.contentType('application/xml')
        res.send({data:val, url:$url);
    })
    // res.send(val);
});

module.exports = router;

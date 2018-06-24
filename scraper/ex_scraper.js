/**
 * Created by Administrator on 2018-06-21.
 */
const Nightmare = require('nightmare')
module.exports = {
    get: async function (url) {

        var data = 'empty';

        await Nightmare({
            show: false,
            waitTimeout: 10000,
            })
            .authentication('lum-customer-hl_36d73268-zone-static','e7xzt68aeifw')
            .goto(url)
            .evaluate(() => document.querySelector('body').textContent)
            .end()
            .then(dt => {
                data = dt;
                console.log('done')
            })
            .catch(error => {
            })
        return data
    },
    parser: function (data) {

        var output = []
        var prop = '';
        if (data.hasOwnProperty('offers')) {
            prop = 'offers';
        }
        else if (data.hasOwnProperty('offers')) {
            prop = 'offer'
        }
        var count = 0;

        for (var dt in data[prop]) {
            var response = []
            // console.log( data[prop])
            response["name"] = data[prop][count].vehicle.description.replace(" or similar", "");
            response["price"] = data[prop][count].fare.total.formattedValue;
            response["category"] = data[prop][count].vehicle.classification.name;
            response["data"] = "book-" + data[prop][count].vendor.code + "-" + data[prop][count].vehicle.classification.code + "-Car";
            if (data[prop][count].vehicle.passengerCapacity.start === data[prop][count].vehicle.passengerCapacity.end) {
                response["numberOfPassenger"] = data[prop][count].vehicle.passengerCapacity.start;
            } else {
                response["numberOfPassenger"] = data[prop][count].vehicle.passengerCapacity.start + "" + data[prop][count].vehicle.passengerCapacity.end;
            }
            if (data[prop][count].vehicle.doorCount.start === data[prop][count].vehicle.doorCount.end) {
                response["numberOfDoors"] = data[prop][count].vehicle.doorCount.start;
            } else {
                response["numberOfDoors"] = data[prop][count].vehicle.doorCount.start + "" + data[prop][count].vehicle.doorCount.end;
            }
            response["transmissionType"] = data[prop][count].vehicle.transmission;
            response["company"] = data[prop][count].vendor.name;

            output.push(response)
            count++
        }
        return output
    },
    xml_gen: function (arr) {
        var $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml += "<scrape>";
        $xml += "<searchdetails>";
        $xml += "</searchdetails>";

        if (arr.length > 0) {
            $xml += "<vehicles>";
            arr.forEach(function ($vehicle) {
                $xml += "<vehicle>";
                for (var $val in $vehicle) {

                    var value = $vehicle[$val]

                    $xml += "<" + $val + ">" + value.toString().replace("'","").replace("&", "and") + "</" + $val + ">";
                }
                $xml += "</vehicle>";
            })

            $xml += "</vehicles>";
        }
        else {
            $xml += "<error>No data</error>";
        }

        $xml += "</scrape>";
        return $xml;

    }

}

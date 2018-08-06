/**
 * Created by Administrator on 8/6/2018.
 */
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
            .authentication('lum-customer-hl_36d73268-zone-static', 'e7xzt68aeifw')
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
    parser: async function (data) {

        var data = JSON.parse(data)['cars'];
        var $response = [];
        var $transm = [
            'Manual',
            'Automatic']
        var $categories = {
            'Intermediate': 'Intermediate',
            'Standart': 'Standard',
            'Premium': 'Premium',
            'Econom': 'Economy',
            'VAN': 'VAN',
            'XD': 'Full-Size',
            'Special': 'Special',
            'Luxury': 'Luxury',
            'Compact': 'Compact',
            'Mini': 'Mini',
            'CoupeCabrio': 'Convertible'
        }


        data.forEach(function ($car) {
            var $car_data = [];
            try {
                $car_data['name'] = $car.car.name;
                $car_data['code'] = $car.car.classCode;
                $car_data['passengers'] = $car.car.seats;
                $car_data['doors'] = $car.car.doors;
                $car_data['price'] = parseFloat($car.customerPrice.total).toFixed(2);
                $car_data['company'] = $car.supplier.name;
                $car_data['transmission'] = $transm[$car.car.transmission];

                if ($car.car.carTypeForWeb.length > 1) {
                    $car_data['category'] = $categories[$car.car.carTypeForWeb[1]];
                }
                else {
                    $car_data['category'] = $categories[$car.car.carTypeForWeb[0]];
                }


                $response.push($car_data)

            }
            catch (e) {

            }
        })

// console.log(this.xml_gen($response))
        return this.xml_gen($response)
    },
    get_loc: async function ($loc) {
        var $url = 'https://www.economybookings.com/prx.php?a=&m=s&c=searchlocations/en%3Fname%3D' + encodeURIComponent($loc);

        var data = 'empty';
        await Nightmare({
            show: false,
            waitTimeout: 10000,
        })
            .authentication('lum-customer-hl_36d73268-zone-static', 'e7xzt68aeifw')
            .goto($url)
            .evaluate(() => document.querySelector('body').textContent)
            .end()
            .then(dt => {
                data = dt;
                console.log('done')
            })
            .catch(error => {
                console.log(error)
            })

        return JSON.parse(data)[0]['id']
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
                    if (value === undefined){
                        var value = ''
                    }

                    $xml += "<" + $val + ">" + value.toString().replace("'", "").replace("&", "and") + "</" + $val + ">";
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

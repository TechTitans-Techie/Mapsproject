//const request = require('request');

const accessToken = 'YdrpKHYB7s6WXWDB1Yex6o8h6Gesg50NoSCQ0lFQ';
const startLatitude = '37.625732';
const startLongitude = '-122.377807';
const endLatitude = '37.785114';
const endLongitude = '-122.406677';

// const productsEndpoint = `https://api.uber.com/v1.2/products?latitude=${startLatitude}&longitude=${startLongitude}`;

// const options = {
//     url: productsEndpoint,
//     headers: {
//         'Authorization': `Bearer ${accessToken}`
//     }
// };

// request.get(options, (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//         const products = JSON.parse(body).products;
//         products.forEach(product => {
//             const priceEstimateEndpoint = `https://api.uber.com/v1.2/estimates/price?start_latitude=${startLatitude}&start_longitude=${startLongitude}&end_latitude=${endLatitude}&end_longitude=${endLongitude}&product_id=${product.product_id}`;

//             request.get({ url: priceEstimateEndpoint, headers: { 'Authorization': `Bearer ${accessToken}` } }, (error, response, body) => {
//                 if (!error && response.statusCode === 200) {
//                     const priceEstimate = JSON.parse(body).prices[0];
//                     console.log(`${product.display_name}: ${priceEstimate.estimate}`);
//                 }
//             });
//         });
//     }
// });


$.ajax({
    method: 'GET',
    url: `https://api.uber.com/v1.2/products?latitude=${startLatitude}&longitude=${startLongitude}`,
    headers: { 'Authorization': `Bearer ${accessToken}`, "Access-Control-Allow-Origin":"http://localhost:3000",'Access-Control-Allow-Credentials': 'true', "Access-Control-Allow-Origin" :"*" },
    contentType: 'application/json',
    success: function(result) {
        console.log("Uber data")
        console.log(result)
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR);
    }
});

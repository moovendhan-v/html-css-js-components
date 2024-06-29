import request from 'request';

// Create a cookie jar
const jar = request.jar();

var options = {
  method: 'GET',
  url: 'http://localhost:4000/components/tabs/moovendhan_amazing_tooltip21',
  jar: jar, // Include the cookie jar in the request
  headers: {
    'Authorization': `Bearer ${authToken}` // Include the Authorization header if needed
  }
};

request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

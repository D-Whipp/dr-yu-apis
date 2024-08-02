import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL = 'https://secrets-api.appbrewery.com/';

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = 'newmonsterhunteruser';
const yourPassword = '123456b';
const yourAPIKey = '4364020a-b30f-4919-aa00-cefdf120b747';
const yourBearerToken = 'd4a46a1a-8d3f-4c6c-b277-0236af50d65f';

app.get('/', (req, res) => {
  res.render('index.ejs', { content: 'API Response.' });
});

app.get('/noAuth', async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const response = await axios
      .get(API_URL + 'random')
      .then(function (response) {
        const result = response.data;
        res.render('index.ejs', { content: result.secret });
      })
      .catch(function (error) {
        console.log('AXIOS ERROR: ', error);
      });
  } catch (error) {
    console.log('TRY ERROR: ', error);
  }
});

app.get('/basicAuth', async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */

  try {
    const response = await axios
      .get(`https://secrets-api.appbrewery.com/all?page=2`, {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
        params: { yourUsername },
      })
      .then(function (response) {
        const result = JSON.stringify(response.data);
        // console.log('basicAuth: ', result);
        res.render('index.ejs', { content: result });
      })
      .catch(function (error) {
        console.log('AXIOS ERROR: ', error);
      });
  } catch (error) {
    console.log('TRY ERROR: ', error);
  }
});

app.get('/apiKey', async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

  try {
    const response = await axios
      .get(
        `https://secrets-api.appbrewery.com/filter?score=5&apiKey=a0e4f1e3-d618-4bab-b7e4-010a4b90e026`
      )
      .then(function (response) {
        const result = JSON.stringify(response.data);
        console.log('API KEY Result: ', result);
        res.render('index.ejs', { content: result });
      })
      .catch(function (error) {
        console.log('AXIOS ERROR: ', error);
      });
  } catch (error) {
    console.log('TRY ERROR: ', error);
  }
});

app.get('/bearerToken', async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  try {
    const response = await axios
      .get(API_URL + 'secrets/42', {
        headers: {
          Authorization: `Bearer ${yourBearerToken}`,
        },
      })
      .then(function (response) {
        const result = response.data;
        console.log('RESPONSE DATA: ', result);
        res.render('index.ejs', { content: result.secret });
      });
  } catch (error) {
    console.log('TRY ERROR: ', error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

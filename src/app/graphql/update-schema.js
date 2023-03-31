const { getIntrospectionQuery, buildClientSchema, printSchema } = require('graphql');

const fs = require('fs');
const url = require('url');
const path = require('path');
const superagent = require('superagent');
require('dotenv').config();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

async function login() {
  try {
    const params = new url.URLSearchParams({
      grant_type: 'password',
      username: process.env.GRAPHQL_USER,
      password: process.env.GRAPHQL_PASS,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    });
    const response = await superagent
      .post(`${process.env.AUTH_URL}/realms/${process.env.REALM}/protocol/openid-connect/token`)
      .send(`${new URLSearchParams(params.toString())}`)
      .set('Content-Type', 'application/x-www-form-urlencoded');
    const token = response.body.access_token;
    fs.writeFileSync(path.resolve(__dirname, 'token.json'), JSON.stringify({ access_token: token }));
  } catch (error) {
    console.error(error);
  }
}
async function getSchema() {
  try {
    console.info('_____________________________________________________');
    console.info('Начинает скачивать схему!');
    const token = require('./token.json');
    const body = JSON.stringify({
      variables: {},
      query: getIntrospectionQuery(),
    });
    const response = await superagent
      .post(process.env.VUE_APP_GRAPHQL_ENDPOINT_SCHEMA)
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token.access_token}`);
    if (!response.body.data) return new Error('Не удалось скачать схему!');
    const clientSchema = buildClientSchema(response.body.data);
    const sdl = printSchema(clientSchema);
    fs.writeFileSync(process.env.GRAPHQL_SCHEMA_PATH, sdl);
    console.info('Схема обновилась!');
    console.info('_____________________________________________________');
  } catch (e) {
    console.log(e);
    throw new Error('Не удалось скачать схему!');
  }
}

(async () => {
  try {
    await login();
    await getSchema();
  } catch (e) {
    console.error('__________ERROR__________');
    console.error(e.message);
    console.error('__________END ERROR__________');
  }
})();

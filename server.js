const express = require('express');
const pingmydyno = require('pingmydyno');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});


const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => { res.send('Chill, it works!!') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req, res) => { image.handleApi(req, res) })


app.listen(process.env.PORT || 5000, () => {
    pingmydyno('https://b-face-detector-api.herokuapp.com/');
    console.log(`App is running on port ${process.env.PORT}`)
});
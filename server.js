const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('this works!')
})

app.listen(3000, ()=> {
    console.log('app is running on port 3000')
})

/*
 * 
 * / --> res = this works
 * /signin --> POST = success/fail
 * /register --> POST = user
 * /profile//:userId --> GET = user
 * /image --> PUT = user
 */
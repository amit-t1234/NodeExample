require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router');
app.use(express.json());


app.use('/api/users', userRouter);


// app.get('*', (req, res) => {
// 	res.send('You are on the wrong page 4sure 404');
// });

app.listen(process.env.APP_PORT, () => {
	console.log('SERVER UP AND RUNNING ON PORT:', process.env.APP_PORT);
});
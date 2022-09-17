const express = require('express');
const htmlRoute = require('./Routes/htmlRoute');
const apiRoute = require('./Routes/apiRoute');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use('/api', apiRoute);
app.use('/'. htmlRoute);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
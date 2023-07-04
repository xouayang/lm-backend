const express  = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.urlencoded({limit:100000,extended:true}));
app.use(express.json({limit:100000}));
app.use(cors());
// app.use(require('./src/routes/routes'));
app.use(require('./src/routes/routes'));
const port = process.env.SERVER_PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
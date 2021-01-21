require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());

const routes = require('./src/Routes');
app.use('/api', routes);
    
app.listen(PORT, () => console.log(`API Démarré sur le port: ${PORT}`));
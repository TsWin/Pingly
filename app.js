require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());

const v1Routes = require('./src/api/v1/Routes');
const v2Routes = require('./src/api/v2/Routes');
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
    
app.listen(PORT, () => console.log(`API Démarré sur le port: ${PORT}`));
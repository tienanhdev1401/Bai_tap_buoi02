import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import configViewEngine from './config/viewEngine.js';
import connectDB from './config/configdb.js';
import initWebRoutes from './routes/web.js';

dotenv.config();

const app = express();

// Config view engine (EJS)
configViewEngine(app);

// Config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Init web routes
initWebRoutes(app);

// Start server
const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log('✅ Backend Nodejs is running on the port : ' + port);
});

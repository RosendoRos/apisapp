const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./controllers/userController');
const sensorController = require('./controllers/sensorController');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Rutas para usuarios
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);
app.get('/users', userController.getAllUsers);

// Rutas para sensores
app.post('/registerSensorData', sensorController.registerSensorData);
app.get('/getSensorData', sensorController.getSensorData);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

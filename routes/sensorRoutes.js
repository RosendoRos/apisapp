const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.post('/registrar_datos', sensorController.registerSensorData);
router.get('/obtener_datos', sensorController.getSensorData);

module.exports = router;

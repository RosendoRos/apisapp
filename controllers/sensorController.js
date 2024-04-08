const Sensor = require('../models/sensorModels');

exports.registerSensorData = (req, res) => {
  const { temperatura, humedad, humedad_del_suelo } = req.body;
  const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');

  Sensor.create({ temperatura, humedad, humedad_del_suelo, fecha })
    .then(() => {
      console.log('Datos guardados correctamente en la base de datos');
      res.status(200).json({ message: 'Datos guardados correctamente' });
    })
    .catch((error) => {
      console.error('Error al ejecutar la consulta:', error.message);
      res.status(500).send('Error interno del servidor');
    });
};

exports.getSensorData = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const sensorData = await Sensor.findAll({
      order: [['fecha', 'DESC']],
      limit: limit,
    });
    console.log('Datos recuperados correctamente de la base de datos');
    res.status(200).json(sensorData);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message);
    res.status(500).send('Error interno del servidor');
  }
};

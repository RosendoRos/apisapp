const { Sequelize, DataTypes } = require('sequelize');

// Crear la instancia de Sequelize
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: '154.56.47.52',
    port: 3306,
    username: 'u196388150_SDC',
    password: '88#&LQu1jR&81$', 
    database: 'u196388150_SDC',
  });

// Definir el modelo para los sensores
const Sensor = sequelize.define('Sensor', {
  temperatura: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  humedad: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  humedad_del_suelo: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
});

// Se sincroniza el modelo con la base de datos (crear la tabla si no existe)
(async () => {
  try {
    await Sensor.sync();
    console.log('Modelo de sensor sincronizado correctamente con la base de datos');
  } catch (error) {
    console.error('Error al sincronizar el modelo de sensor con la base de datos:', error);
  }
})();

module.exports = Sensor;

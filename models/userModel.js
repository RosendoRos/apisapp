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

// Definir el modelo para los usuarios
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Se sincroniza el modelo con la base de datos (crear la tabla si no existe)
(async () => {
  try {
    await User.sync();
    console.log('Modelo de usuario sincronizado correctamente con la base de datos');
  } catch (error) {
    console.error('Error al sincronizar el modelo de usuario con la base de datos:', error);
  }
})();

module.exports = User;

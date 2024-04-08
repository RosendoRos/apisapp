const User = require('../models/userModel');

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.create({ username, password });
    console.log('Usuario registrado exitosamente');
    res.status(200).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar usuario: ', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username, password } });
    if (!user) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }
    console.log('Inicio de sesión exitoso');
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error al iniciar sesión: ', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios: ', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

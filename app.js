const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Tu contraseña de MySQL
  database: 'urbanagrobot'   
});

connection.connect(err => {
  if (err) {
    console.error('Error de conexión: ', err);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

// Ruta para registrar un usuario
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error, results, fields) => {
    if (error) {
      console.error('Error al registrar usuario: ', error);
      res.status(500).json({ message: 'Error al registrar usuario' });
      return;
    }
    res.status(200).json({ message: 'Usuario registrado exitosamente' });
  });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
    if (error) {
      console.error('Error al iniciar sesión: ', error);
      res.status(500).json({ message: 'Error al iniciar sesión' });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  });
});

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      console.error('Error al obtener usuarios: ', error);
      res.status(500).json({ message: 'Error al obtener usuarios' });
      return;
    }
    res.status(200).json(results); // Envía la lista de usuarios como respuesta
  });
});

// Ruta para registrar lecturas de sensores
app.post('/registrar_datos', (req, res) => {
  const { temperatura, humedad, humedad_del_suelo } = req.body;
  const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const sql = 'INSERT INTO lecturas_sensor (fecha, temperatura, humedad, humedad_del_suelo) VALUES (?, ?, ?, ?)';
  connection.query(sql, [fecha, temperatura, humedad, humedad_del_suelo], (error, result) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error.message);
      res.status(500).send('Error interno del servidor');
      return;
    }
    console.log('Datos guardados correctamente en la base de datos');
    res.status(200).json({ message: 'Datos guardados correctamente' });
  });
});

// Ruta para obtener las últimas lecturas de sensores
app.get('/obtener_datos', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const sql = 'SELECT fecha, temperatura, humedad, humedad_del_suelo FROM lecturas_sensor ORDER BY fecha DESC LIMIT ?';
  connection.query(sql, [limit], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error.message);
      res.status(500).send('Error interno del servidor');
      return;
    }
    console.log('Datos recuperados correctamente de la base de datos');
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

const Puntuacion = require('../models/puntuacion.model.js');

// Obtener todos los puntuaciones
exports.findAll = (req, res) => {

  Puntuacion.find().then(puntuaciones => {
    res.send(puntuaciones);
  }).catch(err => {
    res.status(500).send({
      message: err.message || " Algo fue mal mientras los capturabamos a todos"
    });
  });

};


// Crear y salvar
exports.create = (req, res) => {

  // Validamos el puntuacion

  console.log(req.body);

  if (!req.body) {
    return res.status(400).send({
      message: "puntuacion Vacio..."
    });
  }

  const puntuacion = new Puntuacion({
    idFalla: req.body.idFalla || "idFallaVacio",
    ip: req.body.ip || "127.0.0.1",
    puntuacion: req.body.puntuacion || 42
  })

  puntuacion.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Something was wrong creating puntuacion"
    });
  });
};

// Delete
exports.delete = (req, res) => {

  Puntuacion.findByIdAndRemove(req.params.puntuacionId)

    .then(puntuacion => {
      if (!puntuacion) {
        return res.status(404).send({
          message: "Puntiación no encontrado " + req.params.puntuacionId
        });
      }
      res.send({
        message: "Puntuación eliminada"
      });

    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Puntuación not found with id " + req.params.puntuacionId
        });
      }
      return res.status(500).send({
        message: "No se puede encontrar una Puntuación con id " + req.params.puntuacionId
      });
    });


};
// https://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html
// findOne
exports.findOne = (req, res) => {

  Puntuacion.findOne({
    _id: req.params.puntuacionId
  }).then(puntuaciones => {
    res.send(puntuaciones);
  }).catch(err => {
    res.status(500).send({
      message: err.message || " Algo fue mal mientras los capturabamos la id"
    });
  });

};

// Update
exports.update = (req, res) => {

  Puntuacion.findOne({
    _id: req.params.puntuacionId
  }).then(puntuacion => {

    puntuacion.idFalla = 'Modificado';

    puntuacion.save().then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Algo fue mal mientras se modificaba"
      });
    });


  }).catch(err => {
    res.status(500).send({
      message: err.message || " Algo fue mal mientras los capturabamos la id"
    });
  });

};

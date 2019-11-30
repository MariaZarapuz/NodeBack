module.exports = {

    insertarUsuario: function (db, document, callback) {
        const collection = db.collection('user');

        collection.insertOne(document, function (err, result) {
            if (err) {
                console.log('Error al insertar documento:'.err);
            }
            callback(err, result)
        })
    },

    findDocuments: function (db, callback) {
        // Obtener la referencia a la colección
        const collection = db.collection('user');
        // Recuperar documentos
        collection.find({}).toArray(function (err, docs) {
            if (err) {
                console.log("Error recuperando documentos: ", err);
            }

            callback(err, docs);
        });
    }



}
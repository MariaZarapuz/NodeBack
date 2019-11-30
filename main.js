const userFunction = require('./mongodb')
const http = require('http');
const querystring = require('querystring');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'nodejs-mongo';

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const port = 3000;

const server = http.createServer((request, response) => {
    // Extrear el contenido de la petición
    const {
        headers,
        method,
        url
    } = request;
    console.log('headers: ', headers);
    console.log('method: ', method);
    console.log('url: ', url);

    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {

        body.push(chunk);
    }).on('end', () => {

        body = Buffer.concat(body).toString();
        console.log('body: ', body);
        var parseado = querystring.parse(body);


        const document = {
            "name": parseado.name,
            "phone": parseado.phone
        };
        // document.save

        client.connect(function (err) {
            if (err) {
                console.log("Error al conectar al servidor: ", err);
                return;
            }
            console.log("Conectado con éxito al servidor");

            const db = client.db(dbName);

            userFunction.insertarUsuario(db, document, function (err, result) {
                if (!err) {
                    console.log('Resultado de la inseción:', result.result);
                }

            })
            userFunction.findDocuments(db, function (err, result) {
                if (!err) {

                    console.log("Documentos recuperados: ", result);

                }







                response.statusCode = 200;
                // Encabezados de la respuesta, en json
                response.setHeader('Content-Type', 'text/json');
                // Contenido de la respuesta

                response.end(JSON.stringify(result));


            })
            client.close();
        })

    });

});

server.listen(port, () => {
    console.log('Servidor ejecutándose...');
    console.log('Abrir en un navegador http://localhost:3000');
})
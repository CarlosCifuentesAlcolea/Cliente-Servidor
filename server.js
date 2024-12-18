const express = require('express');
const fs = require('fs');
const { create } = require('xmlbuilder2');

const app = express();
app.use(express.json());
app.post('/transfer', (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).send('Falta el dato para transferir');
    }

    // Crear XML dinámico
    const xmlContent = create({ version: '1.0' })
        .ele('Transferencia')
        .ele('Mensaje').txt(data).up()
        .ele('Fecha').txt(new Date().toISOString()).up()
        .end({ prettyPrint: true });

    // Guardar el XML en un archivo
    fs.writeFile('transferencia.xml', xmlContent, (err) => {
        if (err) {
            console.error('Error al guardar el XML:', err);
            return res.status(500).send('Error del servidor');
        }

        console.log('XML guardado con éxito.');
        res.send('Transferencia realizada y XML generado.');
    });
});

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



const express = require('express')
const router = express.Router()
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');


 // Ruta para imprimir
router.get('/downloadpdf', (req, res) => {
    const doc = new PDFDocument();

    let filename = 'reporte.pdf';
    // Ensure the file name is URI encoded to handle special characters
    filename = encodeURIComponent(filename);

    // Setting the response headers
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    // Pipe the PDF into the response
    doc.pipe(res);

    // Add some content to the PDF
    doc.fontSize(25).text('Hello, this is your PDF document!', 100, 100);

    // Finalize the PDF and end the stream
    doc.end();
});

module.exports = router 
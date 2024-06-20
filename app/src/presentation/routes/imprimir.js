
const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');


// Ruta para imprimir
router.get('/downloadpdf', (req, res) => {
    const doc = new PDFDocument();

    let filename = 'reporte.pdf';
    // Asegúrate de que el nombre del archivo esté codificado en URI para manejar caracteres especiales
    filename = encodeURIComponent(filename);

    // Configuración de los encabezados de la respuesta
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    // Pipe el PDF en la respuesta
    doc.pipe(res);

    // Configuraciones iniciales
    doc.fontSize(10);
    doc.font('Helvetica');

    // Encabezado
    doc.text('RECIBO', { align: 'center' });
    doc.text('No. 000001', { align: 'right' });

    // Fecha
    doc.text('DIA      MES      AÑO', 50, 50);

    // Recibí de
    doc.text('Recibí de:', 50, 70);
    doc.text('__________________________', 120, 70);

    // La suma de
    doc.text('La suma de:', 50, 90);
    doc.text('__________________________', 120, 90);
    doc.text('Bolivianos/Dólares', 320, 90);

    // Por concepto de
    doc.text('Por concepto de:', 50, 110);
    doc.text('________________________________________________________________', 150, 110);

    // Forma de pago
    doc.text('En efectivo', 50, 130);
    doc.rect(120, 128, 10, 10).stroke();
    doc.text('Cheque No.', 150, 130);
    doc.rect(220, 128, 10, 10).stroke();
    doc.text('_________________', 235, 130);

    // Banco
    doc.text('Banco', 350, 130);
    doc.text('_________________', 385, 130);

    // A cuenta
    doc.text('A Cuenta', 50, 150);
    doc.text('_________________', 110, 150);

    // Saldo
    doc.text('Saldo', 250, 150);
    doc.text('_________________', 290, 150);

    // Total
    doc.text('TOTAL', 400, 150);
    doc.text('_________________', 440, 150);

    // Firmas
    doc.text('Recibí conforme', 50, 180);
    doc.text('_________________', 140, 180);
    doc.text('Entregué Conforme', 250, 180);
    doc.text('_________________', 360, 180);

    // Finaliza el PDF y cierra el stream
    doc.end();
});

module.exports = router 
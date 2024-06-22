const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const pdfprint = require('../models/imprimir')

// Función para dibujar rectángulos con esquinas redondeadas
// Función para dibujar rectángulos con esquinas redondeadas
function roundedRect(doc, x, y, width, height, radius) {
    doc.roundedRect(x, y, width, height, radius).stroke();
}


// Función para dibujar rectángulos con esquinas redondeadas
function roundedRect(doc, x, y, width, height, radius, options) {
    const { tl = true, tr = true, br = true, bl = true } = options || {};
    doc.moveTo(x + radius, y)
       .lineTo(x + width - radius, y)
       .quadraticCurveTo(x + width, y, x + width, y + (tr ? radius : 0))
       .lineTo(x + width, y + height - (br ? radius : 0))
       .quadraticCurveTo(x + width, y + height, x + width - (br ? radius : 0), y + height)
       .lineTo(x + (bl ? radius : 0), y + height)
       .quadraticCurveTo(x, y + height, x, y + height - (bl ? radius : 0))
       .lineTo(x, y + (tl ? radius : 0))
       .quadraticCurveTo(x, y, x + (tl ? radius : 0), y)
       .stroke();
}


// Ruta para generar y descargar el PDF
router.get('/downloadpdf', async (req, res) => {
    const { id_compra } = req.query; // Obtener id_compra de los parámetros de consulta

    try {
        const result = await pdfprint.getAll(id_compra);
        if (result.error) {
        return res.status(404).send(result.message);
        }

        const compra = result.data[0];
        const detallesCompra = result.data; 

        const doc = new PDFDocument({ margin: 50 });
    
        let filename = 'Recibo.pdf';
        filename = encodeURIComponent(filename);
    
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
    
        doc.pipe(res);
    
        // Configuración de fuentes y colores
        doc.font('Helvetica');
        
        // Logo
        const logoPath = path.join(__dirname, '../../../public/img/flulll (2).png');
        doc.image(logoPath, 120, 30, { width: 160 });
    
        // Logo y encabezado
        doc//.fontSize(20)
           //.text('LA HOLANDESA', 120, 57)
           .fontSize(10)
           .text('La Holandesa', 200, 50, { align: 'right' })
           .text('Santa Cruz - Bolivia', 200, 65, { align: 'right' })
           .text('NIT: 121347267', 200, 80, { align: 'right' })
           .text('Teléfono: 76641600', 200, 95, { align: 'right' })
           .text('Email: la_holandesa@gmail.com', 200, 110, { align: 'right' })
           .moveDown();
    
        // Factura detalles
        doc.fillColor('#444444')
           .fontSize(20)
           .text('RECIBO', 50, 160);
    
        doc.fontSize(10)
           .text(`Nº Compra: ${compra.id_compra}`, 50, 200) // Aquí deberías obtener el número de compra específico del resultado
           .text(`Fecha: ${compra.fecha_compra}`, 50, 215) // Formatea la fecha según necesites
           .text(`Hora: ${compra.hora_compra}`, 50, 230) // Formatea la hora según necesites
           .text(`Vendedor: ${compra.usuario_nombres} ${compra.usuario_apellidos}`, 50, 245)
    
        // Cliente información
        doc.fillColor('#000000')
           .fontSize(14)
           .text('Proveedor', 50, 290);
    
        // Tabla para datos del cliente con todos los bordes redondeados
        const clientY = 310;
        roundedRect(doc, 50, clientY, 515, 60, 5); // Borde exterior de la tabla con todas las esquinas redondeadas
        doc.roundedRect(50, clientY, 515,20,5).fillAndStroke('#1465BB', '#000000'); // Encabezado de la tabla
    
        doc.fillColor('#D2F7FF').fontSize(14);
        doc.text('Proveedor', 55, clientY + 5, { align: 'center' });
    
        doc.fillColor('#000000').fontSize(10);
        doc.text('Razon social:', 55, clientY + 25)
           .text(`${compra.proveedor_razon_social}`, 120, clientY + 25)
           .text('Telefono:', 55, clientY + 40)
           .text(`${compra.proveedor_telefono}`, 100, clientY + 40)
           .text('Direccion:', 300, clientY + 25)
           .text(`${compra.proveedor_direccion}`, 350, clientY + 25)
           //.text('Dirección:', 300, clientY + 40)
           //.text('Lima - Perú', 370, clientY + 40);
    
        // Tabla de items sin bordes redondeados
        const tableY = clientY + 80;
        doc.rect(50, tableY, 515, 20).fillAndStroke('#FF0000', '#000000'); // Encabezado de la tabla
        doc.fillColor('#FFFFFF')
           .text('Cant.', 55, tableY + 5)
           .text('Descripción', 100, tableY + 5)
           .text('Precio Unitario', 390, tableY + 5)
           .text('Precio Total', 490, tableY + 5);
    
        doc.fillColor('#000000');
        
        let y = tableY + 20;
        detallesCompra.forEach((item) => {
            const precioTotal = item.cantidad_producto * item.precio_compra;
            
            doc.text(item.cantidad_producto, 55, y + 5)
               .text(item.nombre_producto, 100, y + 5)
               .text(item.precio_compra, 400, y + 5)
               .text(precioTotal.toFixed(2), 500, y + 5);
            y += 20;
        });
    
        // Subtotales
        y += 20;
        doc//.text('SUBTOTAL S/.', 400, y)
           //.text('IGV (1.18%)', 400, y + 20)
           .text('TOTAL S/.', 400, y);
           //.text('TOTAL S/.', 400, y + 40);
    
        doc//.text(`${compra.monto_compra}`, 500, y)
           //.text('1095.25', 500, y + 20)
           .text(`${compra.monto_compra}`, 500,y);
           //.text(`${compra.monto_compra}`, 500, y + 40);
    
        // Footer
        doc.fontSize(10)
           .text('Si usted tiene preguntas sobre esta factura,', 50, y + 80)
           .text('póngase en contacto con nombre, teléfono y su correo electrónico.', 50, y + 95);
    
        doc.end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
});


// Ruta para generar y descargar el PDF
router.get('/downloadpdfventa', async (req, res) => {
    const { id_venta } = req.query; // Obtener id_compra de los parámetros de consulta

    try {
        const result = await pdfprint.getAllventa(id_venta);
        if (result.error) {
        return res.status(404).send(result.message);
        }

        const venta = result.data[0];
        const detallesVenta = result.data; 

        const doc = new PDFDocument({ margin: 50 });
    
        let filename = 'Recibo.pdf';
        filename = encodeURIComponent(filename);
    
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
    
        doc.pipe(res);
    
        // Configuración de fuentes y colores
        doc.font('Helvetica');
        
        // Logo
        const logoPath = path.join(__dirname, '../../../public/img/flulll (2).png');
        doc.image(logoPath, 120, 30, { width: 160 });
    
        // Logo y encabezado
        doc//.fontSize(20)
           //.text('LA HOLANDESA', 120, 57)
           .fontSize(10)
           .text('La Holandesa', 200, 50, { align: 'right' })
           .text('Santa Cruz - Bolivia', 200, 65, { align: 'right' })
           .text('NIT: 121347267', 200, 80, { align: 'right' })
           .text('Teléfono: 76641600', 200, 95, { align: 'right' })
           .text('Email: la_holandesa@gmail.com', 200, 110, { align: 'right' })
           .moveDown();
    
        // Factura detalles
        doc.fillColor('#444444')
           .fontSize(20)
           .text('RECIBO', 50, 160);
    
        doc.fontSize(10)
           .text(`Nº Venta: ${venta.id_venta}`, 50, 200) // Aquí deberías obtener el número de compra específico del resultado
           .text(`Fecha: ${venta.fecha_venta}`, 50, 215) // Formatea la fecha según necesites
           .text(`Hora: ${venta.hora_venta}`, 50, 230) // Formatea la hora según necesites
           .text(`Vendedor: ${venta.usuario_nombres} ${venta.usuario_apellidos}`, 50, 245)
    
        // Cliente información
        doc.fillColor('#000000')
           .fontSize(14)
           .text('Cliente', 50, 290);
    
        // Tabla para datos del cliente con todos los bordes redondeados
        const clientY = 310;
        roundedRect(doc, 50, clientY, 515, 60, 5); // Borde exterior de la tabla con todas las esquinas redondeadas
        doc.roundedRect(50, clientY, 515,20,5).fillAndStroke('#1465BB', '#000000'); // Encabezado de la tabla
    
        doc.fillColor('#D2F7FF').fontSize(14);
        doc.text('Cliente', 55, clientY + 5, { align: 'center' });
    
        doc.fillColor('#000000').fontSize(10);
        doc.text('Nombre:', 55, clientY + 25)
           .text(`${venta.cliente_nombre}`, 120, clientY + 25)
           .text('Nit:', 55, clientY + 40)
           .text(`${venta.cliente_nit}`, 100, clientY + 40)
           .text('Apellido:', 300, clientY + 25)
           .text(`${venta.cliente_apellido}`, 350, clientY + 25)
           //.text('Dirección:', 300, clientY + 40)
           //.text('Lima - Perú', 370, clientY + 40);
    
        // Tabla de items sin bordes redondeados
        const tableY = clientY + 80;
        doc.rect(50, tableY, 515, 20).fillAndStroke('#FF0000', '#000000'); // Encabezado de la tabla
        doc.fillColor('#FFFFFF')
           .text('Cant.', 55, tableY + 5)
           .text('Descripción', 100, tableY + 5)
           .text('Precio Unitario', 390, tableY + 5)
           .text('Precio Total', 490, tableY + 5);
    
        doc.fillColor('#000000');
        
        let y = tableY + 20;
        let subtotal = 0;
        detallesVenta.forEach((item) => {
            const precioTotal = item.cantidad_producto * item.precio_venta;
            subtotal += precioTotal;
            doc.text(item.cantidad_producto, 55, y + 5)
               .text(item.nombre_producto, 100, y + 5)
               .text(item.precio_venta, 400, y + 5)
               .text(precioTotal.toFixed(2), 500, y + 5);
            y += 20;
        });
    
        const igv = subtotal * 0.18;
        
        // Subtotales
        y += 20;
        doc.text('SUBTOTAL S/.', 400, y)
           .text('IGV (1.18%)', 400, y + 20)
           //.text('TOTAL S/.', 400, y);
           .text('TOTAL S/.', 400, y + 40);
    
        doc.text(subtotal.toFixed(2), 500, y)
           .text(igv.toFixed(2), 500, y + 20)
           //.text(`${venta.monto_venta}`, 500,y);
           .text(`${venta.monto_venta}`, 500, y + 40);
    
        // Footer
        doc.fontSize(10)
           .text('Si usted tiene preguntas sobre esta factura,', 50, y + 80)
           .text('póngase en contacto con nombre, teléfono y su correo electrónico.', 50, y + 95);
    
        doc.end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
});
module.exports = router;

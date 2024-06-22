/*****************conection 1*********************/

//consultas para obtener datos de base de la db
const { connectToPostgres, disconnectFromPostgres } = require('../../infrastructure/database/db');
const moment = require('moment-timezone');

class Usersmodel {
  // Método para obtener todos los proveedores
  static async getAll(idCompra) {
    try {
      const pool = await connectToPostgres();
      if (!pool) {
        throw new Error('Error al conectar con PostgreSQL');
      }
      const result = await pool.query(`
        SELECT 
          compra.*, 
          usuario.nombres AS usuario_nombres, 
          usuario.apellidos AS usuario_apellidos, 
          detalle_compra.*, 
          producto.nombre_producto,
          proveedor.razon_social AS proveedor_razon_social,
          proveedor.telefono AS proveedor_telefono,
          proveedor.descripcion AS proveedor_descripcion,
          proveedor.direccion AS proveedor_direccion
        FROM compra 
        JOIN usuario ON compra.id_usuario = usuario.id_usuario 
        JOIN detalle_compra ON compra.id_compra = detalle_compra.id_compra
        JOIN producto ON detalle_compra.id_producto = producto.id_producto
        JOIN proveedor ON compra.id_proveedor = proveedor.id_proveedor
        WHERE compra.id_compra = '${idCompra}'
        `);


      await disconnectFromPostgres(pool);
      //console.log(result.rows)
      if (result.rows.length === 0) {
        return { data: null, error: true, message: 'No hay compras registradas' };
      }

      // Formatear la fecha y hora
      const data = result.rows.map(row => ({
        ...row,
        fecha_compra: moment(row.fecha_compra).tz('America/La_Paz').format('DD/MM/YYYY'),
        hora_compra: moment(row.fecha_compra).tz('America/La_Paz').format('HH:mm:ss')
      }));

      return { data, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }


  // Método para obtener todos los clientes
  static async getAllventa(idVenta) {
    try {
      const pool = await connectToPostgres();
      if (!pool) {
        throw new Error('Error al conectar con PostgreSQL');
      }
      const result = await pool.query(`
        SELECT 
          venta.*, 
          usuario.nombres AS usuario_nombres, 
          usuario.apellidos AS usuario_apellidos, 
          detalle_venta.*, 
          producto.nombre_producto,
          cliente.nombre AS cliente_nombre,
          cliente.apellido AS cliente_apellido,
          cliente.nit AS cliente_nit
        FROM venta 
        JOIN usuario ON venta.id_usuario = usuario.id_usuario 
        JOIN detalle_venta ON venta.id_venta = detalle_venta.id_venta
        JOIN producto ON detalle_venta.id_producto = producto.id_producto
        JOIN cliente ON venta.id_cliente = cliente.id_cliente
        WHERE venta.id_venta = '${idVenta}'
        `);


      await disconnectFromPostgres(pool);
      //console.log(result.rows)
      if (result.rows.length === 0) {
        return { data: null, error: true, message: 'No hay compras registradas' };
      }

      // Formatear la fecha y hora
      const data = result.rows.map(row => ({
        ...row,
        fecha_venta: moment(row.fecha_venta).tz('America/La_Paz').format('DD/MM/YYYY'),
        hora_venta: moment(row.fecha_venta).tz('America/La_Paz').format('HH:mm:ss')
      }));

      return { data, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }
}


module.exports = Usersmodel 
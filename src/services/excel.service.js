import XlsxPopulate from 'xlsx-populate';

export const leerExcelYValidar = async (rutaArchivo) => {
  const workbook = await XlsxPopulate.fromFileAsync(rutaArchivo);
  const sheet = workbook.sheet(0);
  const productos = [];

  let fila = 2;
  while (true) {
    const nombre = sheet.cell(`A${fila}`).value();
    const grupo = sheet.cell(`B${fila}`).value();
    const precio = sheet.cell(`C${fila}`).value();
    const costo = sheet.cell(`D${fila}`).value();
    const profit = sheet.cell(`E${fila}`).value();

    if (!nombre && !grupo && !precio && !costo && !profit) break; // Fin del archivo

    if (typeof nombre !== 'string' || typeof grupo !== 'string') {
      throw new Error(`Error de formato en fila ${fila}: nombre y grupo deben ser texto`);
    }

    if (isNaN(precio) || isNaN(costo) || isNaN(profit)) {
      throw new Error(`Error de formato en fila ${fila}: precio, costo y profit deben ser números`);
    }

    productos.push({
      nombre: nombre.trim(),
      grupo: grupo.trim(),
      precio: parseFloat(precio),
      costo: parseFloat(costo),
      profit: parseFloat(profit),
    });

    fila++;
  }

  return productos;
};

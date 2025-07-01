const PDFDocument = require('pdfkit');
const { Buffer } = require('buffer');

function gerarPDFAulasAguardando(aulas, mes) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];
    
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    // Estilização do cabeçalho
    doc.fontSize(20).text('Relatório de Aulas Aguardando', { align: 'center' });
    doc.fontSize(12).text(`Mês de Referência: ${mes}`, { align: 'center' });
    doc.moveDown(2);

    // Tabela - Cabeçalho
    doc.fontSize(10).font('Helvetica-Bold');
    const tableTop = 150;
    const colWidths = [100, 80, 100, 100, 100];
    const headers = ['RENACH', 'Número', 'Data', 'Chamado', 'Mês Ref.'];

    headers.forEach((header, i) => {
      doc.text(header, 50 + colWidths.slice(0, i).reduce((a, b) => a + b, 0), tableTop, {
        width: colWidths[i],
        align: 'left'
      });
    });

    // Linha separadora
    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();
    doc.moveDown(1);

    // Dados da tabela
    doc.font('Helvetica').fontSize(10);
    let y = tableTop + 25;
    
    aulas.forEach((aula) => {
      const dataAula = new Date(aula.dataAula).toLocaleDateString('pt-BR');
      const row = [
        aula.renach,
        aula.numeroAula,
        dataAula,
        aula.numeroChamado || '-',
        aula.mesReferencia
      ];

      row.forEach((cell, i) => {
        doc.text(cell, 50 + colWidths.slice(0, i).reduce((a, b) => a + b, 0), y, {
          width: colWidths[i],
          align: 'left'
        });
      });

      y += 20;
      if (y > 700) {
        doc.addPage();
        y = 50;
      }
    });

    if (aulas.length === 0) {
      doc.text('Nenhuma aula no status "Aguardando" encontrada.', 50, y, { align: 'center' });
    }

    doc.end();
  });
}

module.exports = { gerarPDFAulasAguardando };
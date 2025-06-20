import fs from 'fs';
import PDFDocument from 'pdfkit';
// @ts-ignore
import PDFKitHTML from '@shipper/pdfkit-html-simple';


// 1️⃣ Generate PDF from code
function generateCodeBasedPdf(outputPath: string) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  doc.pipe(fs.createWriteStream(outputPath));

  doc.fontSize(20).text('📄 Code-Generated PDF', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text('This PDF was created using raw PDFKit commands.');
  doc.text('You can draw shapes, insert images, and write styled text.');

  doc.rect(50, 400, 200, 100).stroke();
  doc.text('Box drawn using rect().', 55, 410);

  doc.end();
}

// 2️⃣ Generate PDF from basic HTML
async function generateHtmlPdf(html: string, outputPath: string) {
  const transforms = await PDFKitHTML.parse(html);
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Apply HTML render transformations
  for (const transform of transforms) {
    await transform(doc);
  }

  doc.end();

  return new Promise<void>((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

// ✅ Run both generators
(async () => {
  generateCodeBasedPdf('output_code.pdf');

  const html = `
    <h1>🖋 HTML-Generated PDF</h1>
    <p>This content is rendered from HTML tags into PDF using pdfkit-html-simple.</p>
    <ul><li>Simple lists</li><li>Text formatting</li></ul>
    <p><strong>Note:</strong> Advanced CSS is not supported.</p>
  `;

  await generateHtmlPdf(html, 'output_html.pdf');

  console.log('✅ PDFs generated: output_code.pdf & output_html.pdf');
})();

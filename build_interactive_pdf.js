// build_interactive_pdf.js
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function buildInteractivePdf() {
  console.log('1. Launching headless browser...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });

  const htmlPath = path.resolve('book.html');
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  console.log('2. Loading book.html...');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  console.log('3. Extracting exact interactive field coordinates across 43 pages...');
  const fieldsData = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page'));
    const results = [];

    pages.forEach((p, pageIdx) => {
      const pageNum = pageIdx + 1;
      const pRect = p.getBoundingClientRect();
      const pageFields = [];

      // A) Fillable lines on Cover (Page 1)
      if (pageNum === 1) {
        const lines = p.querySelectorAll('.fill-line');
        const labels = ['student_name', 'school_class', 'guardian_name'];
        lines.forEach((l, idx) => {
          const r = l.getBoundingClientRect();
          pageFields.push({
            name: `cover_${labels[idx] || idx}`,
            type: 'text',
            placeholder: '',
            xRel: r.left - pRect.left,
            yRel: r.top - pRect.top,
            width: r.width,
            height: r.height,
            fontSize: 12
          });
        });
      }

      // B) Tracker Shields (Page 3)
      if (pageNum === 3) {
        const shields = p.querySelectorAll('.tracker-shield-card');
        shields.forEach((s, idx) => {
          const r = s.getBoundingClientRect();
          // Checkbox in center of shield
          pageFields.push({
            name: `tracker_shield_${idx + 1}`,
            type: 'checkbox',
            xRel: (r.left - pRect.left) + r.width / 2 - 12,
            yRel: (r.top - pRect.top) + 40,
            width: 24,
            height: 24
          });
        });
      }

      // C) Hero Timer fields (Pages 4 to 36)
      const timerLines = p.querySelectorAll('.timer-fields .t-line');
      if (timerLines.length >= 3) {
        const names = ['start', 'end', 'total'];
        timerLines.forEach((t, idx) => {
          const r = t.getBoundingClientRect();
          pageFields.push({
            name: `p${pageNum}_timer_${names[idx]}`,
            type: 'text',
            xRel: r.left - pRect.left,
            yRel: r.top - pRect.top,
            width: r.width,
            height: r.height,
            fontSize: 10
          });
        });
      }

      // D) Math Answer Boxes (Pages 4 to 36)
      const eqBoxes = p.querySelectorAll('.eq-box, .inv-box, .boss-box, .bat-box');
      eqBoxes.forEach((b, bIdx) => {
        const r = b.getBoundingClientRect();
        pageFields.push({
          name: `p${pageNum}_ans_${bIdx + 1}`,
          type: 'text',
          expectedAns: b.getAttribute('data-ans') || '',
          xRel: r.left - pRect.left,
          yRel: r.top - pRect.top,
          width: r.width,
          height: r.height,
          fontSize: 14
        });
      });

      // E) Certificate Fields (Page 43)
      if (pageNum === 43) {
        const nameLine = p.querySelector('.cert-name-line');
        if (nameLine) {
          const r = nameLine.getBoundingClientRect();
          pageFields.push({
            name: 'cert_student_name',
            type: 'text',
            xRel: r.left - pRect.left,
            yRel: r.top - pRect.top,
            width: r.width,
            height: r.height,
            fontSize: 18,
            align: 'center'
          });
        }
        const sigLines = p.querySelectorAll('.sig-line');
        const sigNames = ['cert_date', 'cert_guardian', 'cert_mentor'];
        sigLines.forEach((s, idx) => {
          const r = s.getBoundingClientRect();
          pageFields.push({
            name: sigNames[idx] || `cert_sig_${idx}`,
            type: 'text',
            xRel: r.left - pRect.left,
            yRel: r.top - pRect.top,
            width: r.width,
            height: r.height,
            fontSize: 10,
            align: 'center'
          });
        });
      }

      results.push({
        pageNum,
        pageWidthPx: pRect.width,
        pageHeightPx: pRect.height,
        fields: pageFields
      });
    });

    return results;
  });

  console.log(`Extracted field definitions for ${fieldsData.length} pages.`);
  let totalInteractiveFields = 0;
  fieldsData.forEach(p => { totalInteractiveFields += p.fields.length; });
  console.log(`Total interactive form fields mapped: ${totalInteractiveFields}`);

  console.log('4. Printing high-resolution base PDF via Chrome...');
  const basePdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();

  console.log('5. Injecting AcroForm interactive fillable fields into PDF Document...');
  const pdfDoc = await PDFDocument.load(basePdfBuffer);
  const form = pdfDoc.getForm();
  const fontHelvetica = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const PDF_W = 595.28;
  const PDF_H = 841.89;

  fieldsData.forEach(pData => {
    const pageIndex = pData.pageNum - 1;
    if (pageIndex >= pdfDoc.getPageCount()) return;

    const pdfPage = pdfDoc.getPage(pageIndex);
    const sx = PDF_W / pData.pageWidthPx;
    const sy = PDF_H / pData.pageHeightPx;

    pData.fields.forEach(f => {
      const pdfX = f.xRel * sx;
      const pdfY = PDF_H - (f.yRel + f.height) * sy;
      const pdfW = f.width * sx;
      const pdfH = f.height * sy;

      try {
        if (f.type === 'checkbox') {
          const chk = form.createCheckBox(f.name);
          chk.addToPage(pdfPage, {
            x: pdfX,
            y: pdfY,
            width: pdfW,
            height: pdfH,
            borderColor: rgb(0.85, 0.47, 0.02),
            borderWidth: 1.5
          });
        } else {
          const tf = form.createTextField(f.name);
          tf.setText('');
          tf.addToPage(pdfPage, {
            x: pdfX + 1,
            y: pdfY + 1,
            width: Math.max(10, pdfW - 2),
            height: Math.max(10, pdfH - 2),
            borderWidth: 0,
            textColor: rgb(0.06, 0.09, 0.16)
          });
          if (f.fontSize) {
            tf.setFontSize(f.fontSize * 0.85);
          }
        }
      } catch (err) {
        // Field already exists or coordinate edge case
      }
    });
  });

  console.log('6. Saving interactive PDF...');
  const finalPdfBytes = await pdfDoc.save();
  const outPdfPath = path.resolve('Missao_Tabuada_Volume_1.pdf');
  fs.writeFileSync(outPdfPath, finalPdfBytes);

  console.log(`🎉 SUCCESS! Generated ${outPdfPath}`);
  console.log(`Pages: ${pdfDoc.getPageCount()}`);
  console.log(`Interactive Form Fields: ${form.getFields().length}`);
  console.log(`Size: ${(finalPdfBytes.length / (1024 * 1024)).toFixed(2)} MB`);
}

buildInteractivePdf();

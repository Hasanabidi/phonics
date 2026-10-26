// Print Engine for Science of Reading Foldable 8-Page Mini-Books and Classroom Worksheets
import { DecodableBook, WorksheetItem } from '../data/siteData';

export function printFoldableMiniBook(book: DecodableBook) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to open the printable mini-book.');
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Printable Foldable 8-Page Book: ${book.title}</title>
  <style>
    @page {
      size: letter landscape;
      margin: 0.4in;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      color: #1e293b;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .header-bar {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px dashed #94a3b8;
      padding-bottom: 6px;
      margin-bottom: 12px;
      font-size: 11px;
      color: #64748b;
    }
    .instructions {
      font-size: 10px;
      color: #475569;
      background: #f8fafc;
      padding: 6px 12px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      margin-bottom: 12px;
    }
    /* 8-Panel Grid on single sheet (4 columns x 2 rows) */
    .grid-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 1px;
      background-color: #cbd5e1;
      border: 2px solid #334155;
      height: 6.8in;
    }
    .panel {
      background: #ffffff;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      position: relative;
    }
    /* Top row panels are printed upside down for the standard origami 8-page booklet fold */
    .upside-down {
      transform: rotate(180deg);
    }
    .page-num {
      position: absolute;
      bottom: 4px;
      right: 6px;
      font-size: 9px;
      font-weight: bold;
      color: #64748b;
    }
    .panel-title {
      font-size: 14px;
      font-weight: 900;
      color: #0f172a;
      text-align: center;
      margin-top: 15px;
    }
    .panel-sound {
      font-size: 10px;
      font-weight: bold;
      text-align: center;
      color: #e11d48;
      background: #ffe4e6;
      padding: 2px 6px;
      border-radius: 999px;
      align-self: center;
    }
    .panel-text {
      font-size: 13px;
      line-height: 1.5;
      font-family: 'Comic Sans MS', 'Chalkboard SE', cursive, sans-serif;
      text-align: center;
      margin: auto 0;
    }
    .cut-line {
      position: absolute;
      top: 50%;
      left: 25%;
      width: 50%;
      border-top: 2px dashed #ef4444;
      pointer-events: none;
    }
    .fold-guide {
      font-size: 9px;
      color: #ef4444;
      text-align: center;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="header-bar">
    <div><strong>Phonics Garden™ Systematic Decodables</strong> • ${book.phaseName}</div>
    <div>Focus Sound: <strong>${book.focusSound}</strong> | Decodability: <strong>${book.decodabilityScore}%</strong></div>
  </div>

  <div class="instructions">
    ✂️ <strong>Foldable 8-Page Pocket Book Instructions:</strong>
    1. Print this sheet on letter paper. 
    2. Fold in half lengthwise (hotdog style), then fold in half twice crosswise. 
    3. Unfold to 8 rectangles, fold in half crosswise (hamburger style), cut along center dashed line, then push sides together to create your pocket reader!
  </div>

  <div class="grid-container">
    <!-- Row 1 (Top panels, inverted for folding) -->
    <div class="panel upside-down">
      <div class="panel-sound">Target Words</div>
      <div class="panel-text" style="font-size: 11px;">
        ${book.targetWords.map(w => `<span style="display:inline-block; margin:2px 4px; padding:2px 4px; border:1px solid #cbd5e1; border-radius:4px;">${w}</span>`).join(' ')}
      </div>
      <div class="page-num">Page 8 (Back)</div>
    </div>

    <div class="panel upside-down">
      <div class="panel-text">"${book.sampleText}"</div>
      <div class="page-num">Page 7</div>
    </div>

    <div class="panel upside-down">
      <div class="panel-text">Look at ${book.targetWords[0] || 'the word'}. Can you sound it out?</div>
      <div class="page-num">Page 6</div>
    </div>

    <div class="panel upside-down">
      <div class="panel-text">We can blend and read every sound!</div>
      <div class="page-num">Page 5</div>
    </div>

    <!-- Row 2 (Bottom panels, right-side up) -->
    <div class="panel">
      <div class="panel-sound">${book.focusSound}</div>
      <div class="panel-title">${book.title}</div>
      <div style="text-align:center; font-size:36px; margin: 10px 0;">📖</div>
      <div style="font-size:10px; text-align:center; color:#64748b;">Author: Phonics Garden • Level ${book.id}</div>
      <div class="page-num">Page 1 (Cover)</div>
    </div>

    <div class="panel">
      <div class="panel-text">See ${book.targetWords[0] || 'it'}. ${book.targetWords[0] || 'It'} is here!</div>
      <div class="page-num">Page 2</div>
    </div>

    <div class="panel">
      <div class="panel-text">Now see ${book.targetWords[1] || 'next'}. Can you say the sounds?</div>
      <div class="page-num">Page 3</div>
    </div>

    <div class="panel">
      <div class="panel-text">Yes! We can read ${book.targetWords.slice(0, 3).join(', ')}!</div>
      <div class="page-num">Page 4</div>
    </div>
  </div>

  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

export function printWorksheetSheet(sheet: WorksheetItem) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to open the printable worksheet.');
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Printable Phonics Worksheet: ${sheet.title}</title>
  <style>
    @page {
      size: letter portrait;
      margin: 0.5in;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      color: #0f172a;
      background: #ffffff;
    }
    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: 3px solid #0f172a;
      padding-bottom: 8px;
      margin-bottom: 16px;
    }
    .name-line {
      font-size: 13px;
      font-weight: bold;
    }
    .title {
      font-size: 20px;
      font-weight: 900;
      margin-top: 4px;
    }
    .subtitle {
      font-size: 12px;
      color: #475569;
    }
    .student-fields {
      display: flex;
      gap: 30px;
      margin-top: 10px;
      font-size: 12px;
    }
    .field-line {
      border-bottom: 1.5px solid #334155;
      display: inline-block;
      width: 140px;
      margin-left: 6px;
    }
    /* Science of Reading Handwriting Guidelines */
    .handwriting-box {
      border: 2px solid #94a3b8;
      border-radius: 8px;
      padding: 16px;
      margin: 16px 0;
    }
    .guideline {
      height: 48px;
      border-top: 2px solid #0f172a;
      border-bottom: 2px solid #0f172a;
      position: relative;
      margin: 20px 0;
    }
    .midline {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      border-top: 1.5px dashed #94a3b8;
    }
    .exercise-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 20px;
    }
    .exercise-card {
      border: 1.5px solid #cbd5e1;
      border-radius: 8px;
      padding: 12px;
      text-align: center;
    }
    .phoneme-dots {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 12px;
    }
    .dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid #0f172a;
    }
    .footer {
      position: fixed;
      bottom: 0.3in;
      left: 0.5in;
      right: 0.5in;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #cbd5e1;
      padding-top: 8px;
      font-size: 10px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="subtitle">Phonics Garden™ Systematic Station • ${sheet.level} • Phase ${sheet.phase}</div>
      <div class="title">${sheet.title}</div>
    </div>
    <div style="text-align: right;">
      <div class="name-line">Classroom Activity Sheet</div>
      <div style="font-size: 10px; color:#64748b;">Eco-Friendly Ink Saver</div>
    </div>
  </div>

  <div class="student-fields">
    <div>Name: <span class="field-line"></span></div>
    <div>Date: <span class="field-line"></span></div>
    <div>Score: <span class="field-line" style="width: 60px;"></span> ⭐</div>
  </div>

  <div class="handwriting-box">
    <div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">
      1. Trace and write the target sound: ${sheet.focusPhonemes.map(p => `/${p}/`).join(' ')}
    </div>
    <div class="guideline"><div class="midline"></div></div>
    <div class="guideline"><div class="midline"></div></div>
  </div>

  <div style="font-weight: bold; font-size: 13px; margin-top: 15px;">
    2. Tap each sound button, blend the word, then write it on the line below:
  </div>

  <div class="exercise-grid">
    ${sheet.focusPhonemes.slice(0, 6).map((phoneme, idx) => `
      <div class="exercise-card">
        <div style="font-size: 28px; font-weight: 900; font-family: monospace;">${phoneme.toUpperCase()}</div>
        <div style="font-size: 11px; color:#64748b; margin: 4px 0;">Sound ${idx + 1}</div>
        <div class="phoneme-dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <div class="guideline" style="height: 36px; margin: 12px 0 4px 0;"><div class="midline"></div></div>
      </div>
    `).join('')}
  </div>

  <div class="footer">
    <div>Phonics Garden Classroom License • Permitted for single-teacher reproduction</div>
    <div>Page 1 of 1 • Systematic Synthetic Phonics</div>
  </div>

  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

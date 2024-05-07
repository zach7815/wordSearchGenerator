const PDFMerger = (await import('pdf-merger-js')).default;
const merger = new PDFMerger();
import { log } from 'console';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const mergePDFS = async (pdfOne: string, pdfTwo: string) => {
  try {
    const firstFile = path.resolve(pdfOne);
    const secondFile = path.resolve(pdfTwo);
    const matchResult = pdfOne.match(/\/([^\/]+)$/);
    const finalFileName = matchResult ? matchResult[1] : 'new File';

    const currentModulePath = fileURLToPath(import.meta.url);
    const currentDirectory = dirname(currentModulePath);

    await merger.add(firstFile);
    await merger.add(secondFile);

    const savePath = path.resolve(
      currentDirectory,
      `../finalPDF/`,
      finalFileName
    );

    if (!fs.existsSync(path.dirname(savePath))) {
      fs.mkdirSync(path.dirname(savePath), { recursive: true });
    }

    await merger.save(savePath);
  } catch (error) {
    log(error);
  }
};

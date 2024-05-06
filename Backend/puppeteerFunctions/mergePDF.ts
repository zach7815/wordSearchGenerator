const PDFMerger = (await import('pdf-merger-js')).default;
const merger = new PDFMerger();
import { log } from 'console';
import fs from 'fs';
import path from 'path';

export const mergePDFS = async (pdfOne: string, pdfTwo: string) => {
  log(pdfTwo);
  const firstFile = path.resolve(pdfOne);
  const secondFile = path.resolve(pdfTwo);
  log(firstFile);
  await merger.add(firstFile);
  await merger.add(secondFile);

  await merger.save('merged.pdf');
};

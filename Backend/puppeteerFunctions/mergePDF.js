const PDFMerger = (await import('pdf-merger-js')).default;
const merger = new PDFMerger();
import fs from 'fs';
import path from 'path';
export const mergePDFS = async (pdfOne, pdfTwo) => {
    const merger = new PDFMerger();
    await merger.add('/Users/zachariahkozlowski-best/Documents/personal-coding-projects/wordSearchGenerator/Backend/pdfOutput/Phonics.pdf');
    await merger.add('/Users/zachariahkozlowski-best/Documents/personal-coding-projects/wordSearchGenerator/Backend/pdfOutput/Phonicsanswers.pdf');
    await merger.setMetadata({
        producer: 'wordsearchGenerator.com',
        author: 'John',
        creator: 'wordsearchGenerator.com',
        title: 'test wordsearch sheet',
    });
    const outputDir = '../pdfOutput';
    const outputFile = 'testMerge.pdf';
    const outputPath = path.resolve(outputDir, outputFile);
    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    // Save the merged PDF
    await merger.save(outputPath);
    console.log('Merged PDF saved successfully!');
};

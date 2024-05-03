"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlToPDF = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs_1 = require("fs");
const htmlToPDF = async (htmlFile) => {
    const regex = /New (.+?)\.html$/;
    const browser = await puppeteer_1.default.launch({
        headless: 'new',
        defaultViewport: null,
        // `headless: true` (default) enables old Headless;
        // `headless: 'new'` enables new Headless;
        // `headless: false` enables “headful” mode.
    });
    const page = await browser.newPage();
    const html = (0, fs_1.readFileSync)(htmlFile, 'utf-8');
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await page.emulateMediaType('screen');
    await page.setViewport({ width: 800, height: 600 });
    const match = RegExp(regex).exec(htmlFile);
    await page.pdf({
        path: match ? `${match[1]}.pdf` : '',
        format: 'letter',
        margin: {
            top: '0.5in',
            right: '0.5in',
            bottom: '0.5in',
            left: '0.5in',
        },
    });
    await browser.close();
};
exports.htmlToPDF = htmlToPDF;

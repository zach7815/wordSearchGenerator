import puppeteer from 'puppeteer';
import fs from 'fs';

const browser = await puppeteer.launch({
	headless: 'new',
	defaultViewport: null,
	// `headless: true` (default) enables old Headless;
	// `headless: 'new'` enables new Headless;
	// `headless: false` enables “headful” mode.
});

const page = await browser.newPage();

const html = fs.readFileSync('test.html', 'utf-8');

await page.setContent(html, { waitUntil: 'domcontentloaded' });

await page.emulateMediaType('screen');

await page.setViewport({ width: 800, height: 600 });

await page.pdf({
	path: 'example.pdf',
	format: 'letter',
	margin: {
		top: '0.5in',
		right: '0.5in',
		bottom: '0.5in',
		left: '0.5in',
	},
});

await browser.close();

import puppeteer from "puppeteer";
import { readFileSync } from "fs";

export const htmlToPDF=async(htmlFile:string)=>{
	const regex = /New (.+?)\.html$/;
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: null,
    // `headless: true` (default) enables old Headless;
    // `headless: 'new'` enables new Headless;
    // `headless: false` enables “headful” mode.
  });

}
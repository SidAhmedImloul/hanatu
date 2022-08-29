import {launch} from 'puppeteer';
import notify from './notify.js';

export default async function browse(){
    const siteUrl = process.env.SITEURL;
    
    const browser = await launch({headless:true, defaultViewport:null});
    
    try { 
        const page = await browser.newPage();

        await page.goto(siteUrl)

        await clickOnBtn('#condition', page);
        await clickOnBtn('#submit_Booking > input:nth-child(1)', page);

        let formTextContent = await getTextContent('#FormBookingCreate', page)
        console.log(formTextContent);
        
        let sendFlag = formTextContent.includes("recommencer")
        if (!sendFlag) {
          await notify();
        }
        
        await page.close();
        //await page.screenshot({path: 'shot.png'}); 
    } catch(error){
         console.log(error);
    } finally {
        await browser.close();
    }
  
}

async function clickOnBtn(selector, page){
    await page.waitForSelector(selector);
    await page.click(selector);
}

async function getTextContent(selector, page){
    await page.waitForSelector(selector);
    const element = await page.$(selector);
    let value = await page.evaluate(el => el.textContent, element);
 
    return value.trim(); 
}


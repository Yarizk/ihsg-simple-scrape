import {google} from 'googleapis';
import puppeteer from 'puppeteer';
import {read, write, append} from './gsheet.js';
import {getPrice} from './price.js';
import TOKEN from './token.json' with { type: "json" };

const client = new google.auth.JWT(TOKEN.client_email, null, TOKEN.private_key, ['https://www.googleapis.com/auth/spreadsheets']);
const start = 1;
await client.authorize();
const browser = await puppeteer.launch({ headless: true });

while (true) {
    (async () => {
        try {
            const emiten = await read('Sheet1!B2:B', client);
            for (let i = 0; i < emiten.length; i++) {
                if (emiten[i] == "" || emiten[i] == undefined) {
                    continue;
                }
                const price = await getPrice(emiten[i][0], browser);
                await write(`Sheet1!C${i+1+start}`, [[price[0]]], client);
                await write(`Sheet1!A${i+1+start}`, [[new Date().toLocaleString()]], client);
            }
            browser.close();
        } catch (err) {
            console.log(err);
        }
    })();


await new Promise(r => setTimeout(r, 300000));
}

import delay from './util/delay.js';

async function getPrice(emiten, browser) {
    const page = await browser.newPage(); 
    await page.goto(`https://id.tradingview.com/symbols/IDX-${emiten}/`, {
        waitUntil: 'networkidle2',
    }).catch((err) => console.log(err));
    await delay(5000)
    
    const data = await page.evaluate(()=>{
        let price = []
        const currentPrice = document.querySelectorAll('.last-JWoJqCpY')
        price.push(currentPrice[0].innerText)
        // const percentage = document.querySelectorAll('.change-tEo1hPMj')
        // for (let i = 0; i < 8; i++) {
        //     if (percentage.length == 0) {
        //         price.push("N/A")
        //     } else {
        //         price.push(percentage[i].innerText)
        //     }
        // }
        return price
    })
    page.close();

   return data;
}

export { getPrice };
const puppeteer = require('puppeteer');
const { convertArrayToCSV } = require('convert-array-to-csv');//npm i convert-array-to-csv
const fs = require('fs');

async function fonbet(browser) {
    const page = await browser.newPage();
    await page.goto('https://www.fonbet.ru/bets/football/');
    await page.waitForSelector('.table');

    // const result= await page.content()
    const result = []
    result[0] = await page.$$eval('tbody tr.table__row td div div.table__time', options => options.map(option => option.textContent));//time
    // result[1] = await page.$$eval('tbody > tr.table__row > td > div > a > h3', options => options.map(option => option.textContent));//command
    result[1] = await page.$$eval('tbody > tr.table__row > td > div > h3,a > h3', options => options.map(option => option.textContent));//command
    
    result[2] = await page.$$eval('tbody > tr.table__row > td:nth-child(3)', options => options.map(option => option.textContent));//1 command coef
    result[3] = await page.$$eval('tbody > tr.table__row > td:nth-child(4)', options => options.map(option => option.textContent));//x coef
    result[4] = await page.$$eval('tbody > tr.table__row > td:nth-child(5)', options => options.map(option => option.textContent));//2 command coef

    result[5] = await page.$$eval('tbody > tr.table__row > td:nth-child(6)', options => options.map(option => option.textContent));//1x command coef
    result[6] = await page.$$eval('tbody > tr.table__row > td:nth-child(7)', options => options.map(option => option.textContent));//12 coef
    result[7] = await page.$$eval('tbody > tr.table__row > td:nth-child(8)', options => options.map(option => option.textContent));//2x command coef

    result[8] = await page.$$eval('tbody > tr.table__row > td:nth-child(9)', options => options.map(option => option.textContent));//fora1 command coef
    result[9] = await page.$$eval('tbody > tr.table__row > td:nth-child(10)', options => options.map(option => option.textContent));//outcome1 coef
    result[10] = await page.$$eval('tbody > tr.table__row > td:nth-child(11)', options => options.map(option => option.textContent));//fora2 command coef
    result[11] = await page.$$eval('tbody > tr.table__row > td:nth-child(12)', options => options.map(option => option.textContent));//outcome2 coef

    result[12] = await page.$$eval('tbody > tr.table__row > td:nth-child(13)', options => options.map(option => option.textContent));//total coef
    result[13] = await page.$$eval('tbody > tr.table__row > td:nth-child(14)', options => options.map(option => option.textContent));//more coef
    result[14] = await page.$$eval('tbody > tr.table__row > td:nth-child(15)', options => options.map(option => option.textContent));//less coef
    result[15] = await page.$$eval('tbody > tr.table__row > td > div > a[href]', options => options.map(option => option.href));//href
    return result; // Возвращаем данные
}

async function marafon(browser) {
    const page = await browser.newPage();
    await page.goto('https://www.marathonbet.ru/su/popular/Football');
    await page.waitForSelector('#events_content > div.events-container > div > div.sport-category-content');

    // const result= await page.content()
    const result = []
    result[0] = await page.$$eval('.category-content table > tbody > tr > td.date', options => options.map(option => option.textContent));//time
    result[1] = await page.$$eval('.category-content > div > div > div', options => options.map(option => option.dataset.eventName));//command
    result[1] = result[1].filter(vl => vl != null);

    result[2] = await page.$$eval('.category-content table > tbody > tr > td:nth-child(3) > span', options => options.map(option => option.textContent));//1 command coef
    result[3] = await page.$$eval('.category-content table > tbody > tr > td:nth-child(4) > span', options => options.map(option => option.textContent));//x coef
    result[4] = await page.$$eval('.category-content table > tbody > tr > td:nth-child(5) > span', options => options.map(option => option.textContent));//2 command coef

    result[5] = await page.$$eval('.category-content table > tbody > tr > td:nth-child(6) > span', options => options.map(option => option.textContent));//1x command coef
    result[6] = await page.$$eval('.category-content table > tbody > tr > td:nth-child(7) > span', options => options.map(option => option.textContent));//12 coef
    result[7] = await page.$$eval('.category-content table > tbody > tr > td:nth-child(8) > span', options => options.map(option => option.textContent));//2x command coef

    result[8] = await page.$$eval('.category-content table > tbody > tr > td:nth-child(9) > span', options => options.map(option => option.textContent));//fora1 command coef
    result[9] = await page.$$eval('.category-content table > tbody > tr > td:nth-child(10) > span', options => options.map(option => option.textContent));//fora2 command coef
    result[10] = await page.$$eval('.category-content table > tbody > tr > td:nth-child(11) > span', options => options.map(option => option.textContent));//less coef
    result[11] = await page.$$eval('.category-content table > tbody > tr > td:nth-child(12) > span', options => options.map(option => option.textContent));//more coef
    result[12] = await page.$$eval('.category-content > div > div > div.bg.coupon-row', options => options.map(option =>`https://www.marathonbet.ru/su/betting/${option.dataset.eventPath}`))

    return result; // Возвращаем данные
}

let scrape = async () => {
    const browser = await puppeteer.launch();
    const fonbet_result = await fonbet(browser).then((value) => {
        // создаем массив с объектами где данные по ставкам
        const dataObjects = []
        for (let i = 0; i < value[1].length; i++) {
            const nick = value[1][i].toLowerCase().replace('фк ', '').split(' - ')
            const nickname = nick[0].split(' ')[0] + ' - ' + nick[1].split(' ')[0]
            const comObj = {
                id: i,
                name: value[1][i],
                nickname: nickname,
                data: value[0][i],

                coef1: value[2][i],
                x: value[3][i],
                coef2: value[4][i],

                coef1x: value[5][i],
                x12: value[6][i],
                coef2x: value[7][i],

                // outcome1: value[8][i],
                fora1: value[9][i],
                // outcome2: value[10][i],
                fora2: value[11][i],

                // total: value[12][i],
                less: value[14][i],
                more: value[13][i],
                href: value[15][i],
            }
            dataObjects.push(comObj)
        }
        // console.log(dataObjects[1])
        return dataObjects
    });
    const marafon_result = await marafon(browser).then((value) => {
        // создаем массив с объектами где данные по ставкам
        const dataObjects = []
        for (let i = 0; i < value[1].length; i++) {
            const nick = value[1][i].toLowerCase().replace('фк ', '').split(' - ')
            const nickname = nick[0].split(' ')[0] + ' - ' + nick[1].split(' ')[0]

            const comObj = {
                id: i,
                name: value[1][i],
                nickname: nickname,
                data: value[0][i].replace(/\n  /g, ''),

                coef1: value[2][i],
                x: value[3][i],
                coef2: value[4][i],

                coef1x: value[5][i],
                x12: value[6][i],
                coef2x: value[7][i],

                fora1: value[8][i],
                fora2: value[9][i],
                less: value[10][i],
                more: value[11][i],
                href: value[12][i]

            }
            dataObjects.push(comObj)
        }
        // console.log(dataObjects[1])
        return dataObjects
    });
    browser.close();
    return [fonbet_result, marafon_result]
}
scrape().then(([fonbet, marafon]) => {
    console.log('scan fonbet '+fonbet.length)
    console.log('scan marafon '+marafon.length)
    for (fnb of fonbet) {
        for (mrf of marafon) {
            if (fnb['nickname'] === mrf['nickname']) {
                // console.log("\x1b[0m",'fonbet '+fnb['nickname'] + " совпадает " +'marafonbet  '+ mrf['nickname']+" propability  "+1/fnb['coef1']+' '+1/mrf['coef2x'])
                if ((1/fnb['coef1']+1/mrf['coef2x']<=1)&&(1/fnb['coef1']+1/mrf['coef2x']>=0.97)){
                    console.log("\x1b[31m",`1-2x fonbet-marafonbet  "${fnb['name']}" ${fnb['coef1']} - ${mrf['coef2x']}    ${(1/fnb['coef1']).toFixed(3)} - ${(1/mrf['coef2x']).toFixed(3)} доход ${(100*(1-(1/fnb['coef1']+1/mrf['coef2x']))).toFixed(3)} % \n`)
                    // console.log("\x1b[0m",`${(1/fnb['coef1']).toFixed(3)} - ${(1/mrf['coef2x']).toFixed(3)} доход ${(1-(1/fnb['coef1']+1/mrf['coef2x'])).toFixed(3)} \n`)
                    console.log("\x1b[31m",`     ${fnb['href']} \n`)
                    console.log("\x1b[31m",`     ${mrf['href']} \n`)
                }
                if ((1/fnb['coef2']+1/mrf['coef1x']<=1)&&(1/fnb['coef2']+1/mrf['coef1x']>=0.97)){
                    console.log("\x1b[32m",`2-1x fonbet-marafonbet  "${fnb['name']}" ${fnb['coef2']} - ${mrf['coef1x']}    ${(1/fnb['coef2']).toFixed(3)} - ${(1/mrf['coef1x']).toFixed(3)} доход ${(100*(1-(1/fnb['coef2']+1/mrf['coef1x']))).toFixed(3)} % \n`)
                    // console.log("\x1b[0m",`${(1/fnb['coef2']).toFixed(3)} - ${(1/mrf['coef1x']).toFixed(3)} доход ${(1-(1/fnb['coef2']+1/mrf['coef1x'])).toFixed(3)} \n`)
                    console.log("\x1b[32m",`     ${fnb['href']} \n`)
                    console.log("\x1b[32m",`     ${mrf['href']} \n`)
                }
                if ((1/fnb['fora1']+1/mrf['fora2']<=1)&&(1/fnb['fora1']+1/mrf['fora2']>=0.97)){
                    console.log("\x1b[33m",`fora1-fora2 fonbet-marafonbet  "${fnb['name']}" ${fnb['fora1']} - ${mrf['fora2']}    ${(1/fnb['fora1']).toFixed(3)} - ${(1/mrf['fora2']).toFixed(3)} доход ${(100*(1-(1/fnb['fora1']+1/mrf['fora2']))).toFixed(3)} % \n`)
                    console.log("\x1b[33m",`     ${fnb['href']} \n`)
                    console.log("\x1b[33m",`     ${mrf['href']} \n`)
                }
                if ((1/fnb['more']+1/mrf['less']<=1)&&(1/fnb['more']+1/mrf['less']>=0.97)){
                    console.log("\x1b[34m",`more-less fonbet-marafonbet  "${fnb['name']}" ${fnb['more']} - ${mrf['less']}    ${(1/fnb['more']).toFixed(3)} - ${(1/mrf['less']).toFixed(3)} доход ${(100*(1-(1/fnb['more']+1/mrf['less']))).toFixed(3)} % \n`)
                    console.log("\x1b[34m",`     ${fnb['href']} \n`)
                    console.log("\x1b[34m",`     ${mrf['href']} \n`)
                }
            }
        }
    }
    console.log("\x1b[0m",'do money stupid 8)')
})
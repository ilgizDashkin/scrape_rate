const puppeteer = require('puppeteer');
const { convertArrayToCSV } = require('convert-array-to-csv');//npm i convert-array-to-csv
const fs = require('fs');

let scrape = async () => {
    const browser = await puppeteer.launch();
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

    browser.close();
    return result; // Возвращаем данные
};
//  #category22433 > div > div > div:nth-child(3) > table > tbody > tr > td:nth-child(4)
scrape().then((value) => {
    // console.log(value); // Получилось!
    // for (let val of value) {
    //     console.log(val.length)
    //     console.log(val[val.length - 1]);
    // }

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
    console.log(dataObjects[1])

    // конвертируем обьект в строку и сохраняем в файл результат
    const csv = convertArrayToCSV(dataObjects);
    const datetime = new Date()
    const year = datetime.getFullYear()
    const month = datetime.getMonth()
    const day = datetime.getDate()
    const hour = datetime.getHours()
    const min = datetime.getMinutes()
    const filename = `${year}-${month}-${day}-${hour}-${min}_pinacle.csv`
    fs.writeFile(filename, csv, 'utf8', function (err) {
        if (err) {
            console.log('ошибка не удалось сохранить файл pinacle.csv');
        } else {
            console.log(`${filename} It\'s saved!`);
        }
    });
});
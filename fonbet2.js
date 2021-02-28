const puppeteer = require('puppeteer');
const { convertArrayToCSV } = require('convert-array-to-csv');//npm i convert-array-to-csv
const fs = require('fs');
const iPhone = puppeteer.devices['iPhone 6'];//эксперимент с постановкой устройства

let scrape = async () => {
    // const browser = await puppeteer.launch();
    console.log("Opening the browser......");
    // приходится запускать в оконном режиме хром иначе фонбет не дает рендерится странице
        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
    const page = await browser.newPage();
    await page.emulate(iPhone);//эксперимент с постановкой устройства
    await page.goto('https://www.fonbet.ru/sports/football');
    // await page.waitForSelector('#page__wrap > div.page__container.js-scroll-container.js-page-container._device_desktop._theme_red > div.page-layout--qkduQ > div > div.coupon-layout__content--gGzha > div > div > div > div.sport-area__grow--2pH-E > div.sport-area__grow__sticky--15ElV > div:nth-child(1) > div > div.table-component-text--2U5hR.sport-section__caption--2Ucnu');
    await page.waitForSelector('#tournament_11935 > div:nth-child(1) > div > div > div.c-event-header__title-wrap > span');

    // const result= await page.content()
    const result = []
    // result[0] = await page.$$eval('#page__wrap > div.page__container.js-scroll-container.js-page-container._device_desktop._theme_red > div.page-layout--qkduQ > div > div.coupon-layout__content--gGzha > div > div > div > div.sport-area__grow--2pH-E > div.custom-scrollbar-area--1ins6.has-vertical-scroll--326y7.sport-area__grow__scrollable--2ReJ_ > div.custom-scrollbar-area__view-port--1HK58 > div > div.sport-footer__wrap--emVli > div.sport-section-virtual-list--3_zcT > div:nth-child(13) > div:nth-child(3) > div.sport-base-event__main__right--3234Y > div > span', options => options.map(option => option.textContent));//time
    result[1] = await page.$$eval('#tournament_11935 > div:nth-child(2) > div:nth-child(1) > div.c-live-event > a > div > table > tbody > tr:nth-child(1) > td > div > div.ui-live-event__player-name', options => options.map(option => option.textContent));//command
    // result[2] = await page.$$eval('#page__wrap > div.page__container.js-scroll-container.js-page-container._device_desktop._theme_red > div.page-layout--qkduQ > div > div.coupon-layout__content--gGzha > div > div > div > div.sport-area__grow--2pH-E > div.custom-scrollbar-area--1ins6.has-vertical-scroll--326y7.sport-area__grow__scrollable--2ReJ_ > div.custom-scrollbar-area__view-port--1HK58 > div > div.sport-footer__wrap--emVli > div.sport-section-virtual-list--3_zcT > div:nth-child(13) > div:nth-child(4)', options => options.map(option => option.textContent));//1 command coef
    // result[3] = await page.$$eval('#page__wrap > div.page__container.js-scroll-container.js-page-container._device_desktop._theme_red > div.page-layout--qkduQ > div > div.coupon-layout__content--gGzha > div > div > div > div.sport-area__grow--2pH-E > div.custom-scrollbar-area--1ins6.has-vertical-scroll--326y7.sport-area__grow__scrollable--2ReJ_ > div.custom-scrollbar-area__view-port--1HK58 > div > div.sport-footer__wrap--emVli > div.sport-section-virtual-list--3_zcT > div:nth-child(13) > div:nth-child(5)', options => options.map(option => option.textContent));//x coef
    // result[4] = await page.$$eval('#page__wrap > div.page__container.js-scroll-container.js-page-container._device_desktop._theme_red > div.page-layout--qkduQ > div > div.coupon-layout__content--gGzha > div > div > div > div.sport-area__grow--2pH-E > div.custom-scrollbar-area--1ins6.has-vertical-scroll--326y7.sport-area__grow__scrollable--2ReJ_ > div.custom-scrollbar-area__view-port--1HK58 > div > div.sport-footer__wrap--emVli > div.sport-section-virtual-list--3_zcT > div:nth-child(13) > div:nth-child(6)', options => options.map(option => option.textContent));//2 command coef

    // result[5] = await page.$$eval('tbody > tr.table__row > td:nth-child(6)', options => options.map(option => option.textContent));//1x command coef
    // result[6] = await page.$$eval('tbody > tr.table__row > td:nth-child(7)', options => options.map(option => option.textContent));//12 coef
    // result[7] = await page.$$eval('tbody > tr.table__row > td:nth-child(8)', options => options.map(option => option.textContent));//2x command coef

    // result[8] = await page.$$eval('tbody > tr.table__row > td:nth-child(9)', options => options.map(option => option.textContent));//fora1 command coef
    // result[9] = await page.$$eval('tbody > tr.table__row > td:nth-child(10)', options => options.map(option => option.textContent));//outcome1 coef
    // result[10] = await page.$$eval('tbody > tr.table__row > td:nth-child(11)', options => options.map(option => option.textContent));//fora2 command coef
    // result[11] = await page.$$eval('tbody > tr.table__row > td:nth-child(12)', options => options.map(option => option.textContent));//outcome2 coef

    // result[12] = await page.$$eval('tbody > tr.table__row > td:nth-child(13)', options => options.map(option => option.textContent));//total coef
    // result[13] = await page.$$eval('tbody > tr.table__row > td:nth-child(14)', options => options.map(option => option.textContent));//more coef
    // result[14] = await page.$$eval('tbody > tr.table__row > td:nth-child(15)', options => options.map(option => option.textContent));//less coef

    // result[15] = await page.$$eval('tbody > tr.table__row > td > div > a[href]', options => options.map(option => option.href));//href
    browser.close();
    return result; // Возвращаем данные
};

scrape().then((value) => {
    console.log(value); // Получилось!
    // for (let val of value) {
    //     console.log(val.length)
    //     console.log(val[val.length - 1]);
    // }

    // создаем массив с объектами где данные по ставкам
    // const dataObjects = []
    // for (let i = 0; i < value[1].length; i++) {
    //     const nick=value[1][i].toLowerCase().replace('фк ','').split(' - ')
    //     const nickname=nick[0].split(' ')[0]+' - '+nick[1].split(' ')[0]
    //     const comObj = {
    //         id: i,
    //         name: value[1][i],
    //         nickname: nickname,
    //         data: value[0][i],

    //         coef1: value[2][i],
    //         x: value[3][i],
    //         coef2: value[4][i],

    //         coef1x: value[5][i],
    //         x12: value[6][i],
    //         coef2x: value[7][i],

    //         // outcome1: value[8][i],
    //         fora1: value[9][i],
    //         // outcome2: value[10][i],
    //         fora2: value[11][i],

    //         // total: value[12][i],
    //         less: value[14][i],
    //         more: value[13][i],
    //         href: value[15][i]           
    //     }
    //     dataObjects.push(comObj)
    // }
    // console.log(dataObjects[1])

    // // конвертируем обьект в строку и сохраняем в файл результат
    // const csv = convertArrayToCSV(dataObjects);
    // const datetime = new Date()
    // const year = datetime.getFullYear()
    // const month = datetime.getMonth()
    // const day = datetime.getDate()
    // const hour = datetime.getHours()
    // const min = datetime.getMinutes()
    // const filename = `${year}-${month}-${day}-${hour}-${min}_fonbet.csv`
    // fs.writeFile(filename, csv, 'utf8', function (err) {
    //     if (err) {
    //         console.log('ошибка не удалось сохранить файл fonbet.csv');
    //     } else {
    //         console.log(`${filename} It\'s saved!`);
    //     }
    // });
});

// #page__wrap > div.page__container.js-scroll-container.js-page-container._device_desktop._theme_red > div.page-layout--qkduQ > div > div.coupon-layout__content--gGzha > div > div > div > div.sport-area__grow--2pH-E > div.custom-scrollbar-area--1ins6.has-vertical-scroll--326y7.sport-area__grow__scrollable--2ReJ_ > div.custom-scrollbar-area__view-port--1HK58 > div > div.sport-footer__wrap--emVli > div.sport-section-virtual-list--3_zcT > div > div:nth-child(3) > div.sport-base-event__main__caption--3ODAV._inline--1fcAz > a
// #page__wrap > div.page__container.js-scroll-container.js-page-container._device_desktop._theme_red > div.page-layout--qkduQ > div > div.coupon-layout__content--gGzha > div > div > div > div.sport-area__grow--2pH-E > div.custom-scrollbar-area--1ins6.has-vertical-scroll--326y7.sport-area__grow__scrollable--2ReJ_ > div.custom-scrollbar-area__view-port--1HK58 > div > div.sport-footer__wrap--emVli > div.sport-section-virtual-list--3_zcT > div:nth-child(12) > div:nth-child(3) > div.sport-base-event__main__caption--3ODAV._inline--1fcAz > a
// #page__wrap > div.page__container.js-scroll-container.js-page-container._device_desktop._theme_red > div.page-layout--qkduQ > div > div.coupon-layout__content--gGzha > div > div > div > div.sport-area__grow--2pH-E > div.custom-scrollbar-area--1ins6.has-vertical-scroll--326y7.sport-area__grow__scrollable--2ReJ_ > div.custom-scrollbar-area__view-port--1HK58 > div > div.sport-footer__wrap--emVli > div.sport-section-virtual-list--3_zcT > div:nth-child(16) > div:nth-child(3) > div.sport-base-event__main__caption--3ODAV._inline--1fcAz > div
// #page__wrap > div.page__container.js-scroll-container.js-page-container._device_desktop._theme_red > div.page-layout--qkduQ > div > div.coupon-layout__content--gGzha > div > div > div > div.sport-area__grow--2pH-E > div.custom-scrollbar-area--1ins6.has-vertical-scroll--326y7.sport-area__grow__scrollable--2ReJ_ > div.custom-scrollbar-area__view-port--1HK58 > div > div.sport-footer__wrap--emVli > div.sport-section-virtual-list--3_zcT > div:nth-child(10) > div:nth-child(3) > div.sport-base-event__main__caption--3ODAV._inline--1fcAz > a
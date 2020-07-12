// простой скрапер
// для статических сайтов https://medium.com/nuances-of-programming/%D0%BA%D0%B0%D0%BA-%D0%B2%D1%8B%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D1%8C-%D0%B2%D0%B5%D0%B1-%D1%81%D0%BA%D1%80%D0%B0%D0%BF%D0%B8%D0%BD%D0%B3-%D1%81-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-node-js-7285b5d8d53c
const axios = require('axios');
const cheerio = require('cheerio');

const url='http://news.ycombinator.com'

//функция для разбора хтмл
let getData=html=>{
    data=[]
    const $=cheerio.load(html)
    $('table.itemlist tr td:nth-child(3)').each((i,elem)=>{
        data.push({
            title:$(elem).text(),
            link:$(elem).find('a.storylink').attr('href')
        })
    })
    console.log(data)
}

//выполняем запрос и получаем json результат
axios.get(url)
// .then(response=>{console.log(response.data)})
.then(response=>getData(response.data))
.catch(error=>{console.log(error)})

// const datetime = new Date()
// const year=datetime.getFullYear()
// const month=datetime.getMonth()
// const day=datetime.getDate()
// const hour=datetime.getHours()
// const min=datetime.getMinutes()
// console.log(`${year}${month}`)
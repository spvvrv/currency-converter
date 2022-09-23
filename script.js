const rates = {
}; //создали объект для нужных нам валют
const elementUSD = document.querySelector('[data-value="USD"]'); //ищем по атрибуту data-value. Внимание на кавычки!
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

//элементы формы, ввод суммы, выбор валюты, поле с результатом
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');


//функкция получения курса валют и отображение их на странице
getCurrencies();

// fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(function (result) {
//     return result.json()
// }).then(function (data) {
//     console.log(data)
// }) //fetch вернет промис. Из него нам нужно будет достать ответ, он будет в виде json строки - будет записан в result. Мы из redult преобразуем в объект js, после чего полученный промис мы снова преобразуем (data) и это как раз будет нужным нам объектом. 

//или другой вариант записи: 

// const response = fetch('https://www.cbr-xml-daily.ru/daily_json.js'); //это асинхронная операция, так как мы не можем продолжить код, пока не получим ответ от сервера! Этот ответ нужен в первую очереь, то того как будет продолжен следующий код! Поэтому все нужно обернуть в функцию: 

async function getCurrencies() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js'); //В константу response запишем значение fetch, но await значит подождать пока fetch выполнится, записать response и только потом двигаться дальше. Если бы await не было, код не дождался бы выполнения fetch и пошел бы делать код дальше
    const data = await response.json(); //fetch вернул объект, у которого есть метод json (см. документацию). Снова исползуем await, так как нам вернулся промис(но внутри него сидит нужный нам js объект)
    const result = await data; //достаем нужный нам объект из промиса через await   
    // console.log(result);
    // console.log(result.Valute.USD.Value)



    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP; //записали переменные в объект rates
    console.log(rates);

    //Выводим на страницу и округлим до 2 знаков после  точки
    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);


    //если курс пошел вверх по сравнению со вчерашним днем - красная подсветка, если вниз - зеленая

    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('top');
    } else {
        elementUSD.classList.add('bottom');
    }

    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('top');
    } else {
        elementEUR.classList.add('bottom');
    }

    if (rates.GBP.Value > rates.GBP.Previous) {
        elementGBP.classList.add('top');
    } else {
        elementGBP.classList.add('bottom');
    }
}


//функция конвертации

//слушаем ввод в input - получаем результат
// input.oninput = function () { //метод oninput определяет ту функцию, которая запустится, когда будет меняться значение input
//     result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2); //select.value в квадратных скобках 
// }
// select.oninput = function () { //добавляем функицю, чтобы изменения происходили еще и тогда, когда обновляем выбор валюты
//     result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2); 
// }

//преобразовали это в функции:
function convertValue() {
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}
select.oninput = convertValue;
input.oninput = convertValue;

//чтобы автоматически обновлялось каждые пол часа
setInterval(getCurrencies, 600000);
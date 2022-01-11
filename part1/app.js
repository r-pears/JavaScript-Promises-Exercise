let favoriteNumber = 9;
let url = `http://numbersapi.com`;

// Solution nr 1.
axios.get(`${url}/${favoriteNumber}?json`)
  .then((resp) => console.log(resp))

// Solution nr 2.
let favoriteNumbers = [7, 9, 12, 21]
axios.get(`${url}/${favoriteNumbers}?json`)
  .then((resp) => {
    console.log(resp)
  })

// Solution nr 3.
const result = document.querySelector('#result');

Promise.all(
  Array.from({ length: 4 }, () => {
    return axios.get(`${url}/${favoriteNumber}?json`);
  })
).then((resps) => {
  resps.forEach(resp => result.append(`${resp.data.text}`));
});
let url = `https://deckofcardsapi.com/api/deck`;

// Solution nr 1.
axios.get(`${url}/new/draw/`)
  .then((resp) => {
    let { suit, value } = resp.data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
  })

// Solution nr 2.
let firstCard = null;

axios.get(`${url}/new/draw/`)
  .then((resp) => {
    firstCard = resp.data.cards[0];
    let deckId = resp.data.deck_id;
    return axios.get(`${url}/${deckId}/draw/`);
  })
  .then((resp) => {
    let secondCard = resp.data.cards[0];
    [firstCard, secondCard].forEach((card) => {
      console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`)
    })
  })

// Solution nr 3.
let thisDeckId = null;
const drawCardBtn = document.querySelector('#draw-button');
let cardSection = document.querySelector('#card-section');

axios.get(`${url}/new/shuffle/`)
  .then(resp => {
    thisDeckId = resp.data.deck_id;
  })

function drawCard() {
  axios.get(`${url}/${thisDeckId}/draw/`)
    .then(resp => {
      let cardImg = resp.data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let newX = Math.random() * 100 - 20;
      let newY = Math.random() * 100 - 20;

      let newImg = document.createElement('img');
      newImg.setAttribute('src', cardImg);
      newImg.setAttribute('style', `transform: translate(${newX}px, ${newY}px) rotate(${angle}deg)`);
      cardSection.append(newImg);

      if (resp.data.remaining === 0) {
        drawCardBtn.classList.add('display-none');
      }
    })
}
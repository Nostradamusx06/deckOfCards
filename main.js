import './style.css'

const cards = document.querySelectorAll('.card');
const shuffleBtn = document.querySelector('.shuffle-btn');

let deckId;
let cardsData = [];
let openedCards = 0;

// Fetch a new deck of cards
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
  .then(response => response.json())
  .then(data => {
    deckId = data.deck_id;
    shuffleCards();
  })
  .catch(error => console.error(error));

// Shuffle the cards
function shuffleCards() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
    .then(response => response.json())
    .then(data => {
      cardsData = data.cards;
      updateCards();
    })
    .catch(error => console.error(error));
}

// Update the cards with new data
function updateCards() {
  cards.forEach((card, index) => {
    card.dataset.value = cardsData[index].value;
    card.querySelector('.back').style.backgroundImage = 'url(https://deckofcardsapi.com/static/img/back.png)';
    card.querySelector('.front').style.backgroundImage = `url(${cardsData[index].image})`;
    card.classList.remove('flipped');
  });
  openedCards = 0;
  shuffleBtn.classList.add('hidden');
}

// Handle card click
cards.forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.add('flipped');
    openedCards++;

    if (openedCards === 4) {
      shuffleBtn.classList.remove('hidden');
    }

    if (cards.every(card => card.classList.contains('flipped'))) {
      shuffleBtn.classList.remove('hidden');
    } else {
      shuffleBtn.classList.add('hidden');
    }
  });
});

// Handle shuffle button click
shuffleBtn.addEventListener('click', () => {
  shuffleBtn.classList.add('hidden');

  cards.forEach((card, index) => {
    setTimeout(() => {
      const cardAnimation = card.animate([
        { transform: 'translateY(-280px) rotateY(180deg)' },
        { transform: 'translateY(-280px) rotateX(40deg)' },
        { transform: 'rotateX(40deg)' }
      ], {
        duration: 1000,
        easing: 'ease-in-out'
      });

      cardAnimation.onfinish = () => {
        card.classList.remove('flipped');
        card.style.transform = 'rotateX(40deg)';
      };
    }, index * 200);
  });

  setTimeout(() => {
    shuffleCards();
  }, (cards.length * 200) + 1000);
});

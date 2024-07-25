(function () {
  const cards = document.querySelectorAll('.card');
  const shuffleBtn = document.querySelector('.shuffle-button');

  let deckId;
  let cardsData = [];
  let openedCards = 0;

  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,AD,AC,AH')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      deckId = data.deck_id;
      shuffleCards();
    })
    .catch(error => {
      console.error('Ошибка:', error);
      alert('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
    });

  const shuffleCards = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        cardsData = data.cards;
        updateCards();
      })
      .catch(error => {
        console.error('Ошибка:', error);
        alert('Не удалось загрузить карты. Пожалуйста, попробуйте позже.');
      });
  }

  const updateCards = () => {
    cards.forEach((card, index) => {
      card.dataset.value = cardsData[index].value;
      card.querySelector('.front').style.backgroundImage = `url(${cardsData[index].image})`;
      card.classList.remove('flipped');
    });
    openedCards = 0;
    shuffleBtn.classList.add('hidden');
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
        openedCards++;

        if (openedCards === 4) {
          shuffleBtn.classList.remove('hidden');
        }
      }
    });
  });

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
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          shuffleCards();
        })
        .catch(error => {
          console.error('Ошибка:', error);
          alert('Не удалось перетасовать карты. Пожалуйста, попробуйте позже.');
        });
    }, (cards.length * 200));
  });
})();

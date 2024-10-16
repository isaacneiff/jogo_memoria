const grid = document.querySelector('.grid')
const timerDisplay = document.querySelector('.timer')

//funcionalidade para "puxar" as imagens dos personagens
const characters = [
    'chuchky',
    'Hannibal',
    'MichaelMyers',
    'PinHead',
    'jason',
    'pennywise',
    'samara',
    'dracula'
]

//criação de elementos no HTML
const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}

//funcionalidades para as cartas

let firstCard = ''
let secondCard = ''

//funcionalidade para checar o final do jogo 
//caso o contador disablecards chegue ao tamanho de 16 cartas combinadas, ele emite um alert que finaliza o jogo

const checkEndGame = () => {

    const disableCards = document.querySelectorAll('.disable-card')
    if (disableCards.length === 16) {
        clearInterval(buttonTimer)
        alert(`Doces ou travessuras! Parabéns! Você venceu o jogo!!`)
    }

}

//funcionalidade para checar se as cartas estão iguais

const checkCards = () => {

    const firstCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disable-card')
        secondCard.firstChild.classList.add('disable-card')

        firstCard = ''
        secondCard = ''
        //chama a função para finalizar o jogo
        checkEndGame()
    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firstCard = ''
            secondCard = ''
        }, 500)
    }
}


//funcionalidade para revelar as cartas

const revealCard = ({ target }) => {

    //condição para impedir o jogador de iniciar o jogo sem que o conometro seja ligado 

    if (!buttonTimer) {
        alert('Você deve iniciar o cronômetro antes de virar as cartas')
        return
    }


    if (target.parentNode.className.includes('reveal-card')) {

        return
    }


    if (firstCard === '') {

        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode

    }
    else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode
        checkCards()
    }


}

//funcionalidade para criar as divs das cartas
const createCard = (characters) => {

    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../assets/${characters}.jpg')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', characters)
    return card
}


//funcionalidade para carregar o jogo
const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters]

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5)

    shuffledArray.forEach((characters) => {
        const card = createCard(characters)
        grid.appendChild(card)

    })

}


//funcionalidade para iniciar o conometro

let buttonTimer
let totalSeconds = 0



const updateTimerDisplay = () => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const timerDisplay = document.getElementById('tempo')
    timerDisplay.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

}


const startTime = () => {

    if (buttonTimer) return

    buttonTimer = setInterval(() => {
        totalSeconds++
        updateTimerDisplay()

    }, 1000)

    style.display = 'none'


}

const stopTime = () => {

    clearInterval(buttonTimer)
    buttonTimer = null
    alert('Jogo pausado')

}

/*const resetTime = () => {

    clearInterval(buttonTimer)
    buttonTimer = null
    totalSeconds = 0
    updateTimerDisplay()
    alert('O cronômetro foi reiniciado')

}*/

const resetPag = () => {

    location.reload()

}

//funcionalidade para carregar o jogo e o timer do
window.onload = () => {

    updateTimerDisplay()

    document.getElementById('startBtn').addEventListener('click', startTime);
    document.getElementById('stopBtn').addEventListener('click', stopTime);
    //document.getElementById('resetBtn').addEventListener('click', resetTime)
    document.getElementById('resetPag').addEventListener('click', resetPag)

    const cards = document.querySelectorAll('.card')
    cards.forEach(card => {
        card.addEventListener('click', revealCard)
    })

    loadGame()
}



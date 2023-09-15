const arr = [] // Массив, для записок коробок и заключенных
const prisonerId = document.getElementById('prisoner-check') // ИД заключенного
let autoPlay = false
const createEl = () => {
    for (let i = 1; i < 101; i++) {
        const bCont = document.querySelector('.box-cont')
        const allprisoner = document.querySelector('.all-prisoner')
        const box = document.createElement('div')
        const boxNum = document.createElement('div')
        const secretNum = document.createElement('div')
        const prisoner = document.createElement('div')

        arr.push(i) // Добавляем числа в массив

        box.className = 'box' // Создаем коробки
        box.id = i
        box.addEventListener('click', boxClick)
        bCont.append(box)

        boxNum.className = 'box-num' // Нумерация коробок
        boxNum.innerHTML = i
        box.append(boxNum)

        secretNum.className = 'secret-num' // Записки в коробке
        box.append(secretNum)

        prisoner.className = 'prisoner' // Создаем заключенных
        prisoner.innerHTML = i
        prisoner.addEventListener('click', prisonerClick);
        allprisoner.append(prisoner)
    }
}

const updatePrisionStatus = () => {
    document.querySelector('.prisoner.check').classList.add('free') // Обновляем класс у заключенного
    document.querySelector('.prisoner.check').classList.remove('check') // Удаляем класс заключенного
}

function boxClick() { // Слушатель нажатия по коробкам
    const countPrisoner = document.querySelectorAll('.free').length

    if (prisonerId.innerHTML) { // Выбран ли заключенный
        this.classList.add('open')
        counter()
        if (prisonerId.innerHTML === this.children[1].innerHTML) { // Совпало ли число в коробке с выбранным заключенным
            if (countPrisoner === 99) { // Победа если все заключенные свободны
                updatePrisionStatus()
                alert('Ты выиграл! Ура! Все заключенные свободны')
            } else {
                setTimeout(nextPrisoner, 50)
            }
        }
    } else {
        alert('Прежде, чем начать, нужно выбрать заключенного')
    }
}

function prisonerClick() { // Слушатель нажатия по заключенным
    const prisonerCheck = document.querySelector('.prisoner.check')

    if (document.querySelector('.open')) { // Открыта ли коробка
        alert('Нельзя выбрать другого заключенного, когда открыты коробки')
    } else {
        if (prisonerCheck) { // Отменить другого выбранного
            prisonerCheck.classList.remove('check')
        }
        if (!this.classList.contains('free')) { // Свободен ли выбранный заключенный
            prisonerId.innerHTML = this.innerHTML
            this.classList.add('check')
        } else {
            alert('Заключенный уже свободен')
        }
    }
}

const shuffle = (array) => { // Перемешать массив
    const secretNum = document.querySelectorAll('.secret-num')

    array.sort(() => Math.random() - 0.5); // Перемешиваем числа в массиве
    secretNum.forEach((el, index) => { // Обновляем номер в коробке
        el.innerHTML = arr[index]
    })
}

createEl() // Создаем элементы
shuffle(arr) // Перемешиваем

const counter = () => { // Счетчик открытых коробок
    const countBox = document.querySelectorAll('.open').length

    if (countBox < 51) {
        document.getElementById('count').innerHTML = countBox
    } else { // Проигрыш в игре и рестарт
        alert('Ты проиграл')
        restart()
    }
}

const closeAllBoxes = () => {
    document.querySelectorAll('.open').forEach(el => el.classList.remove('open')) // Закрываем все коробки
}

const nextPrisoner = () => {
    if (!autoPlay) alert('Ура, заключенный № ' + prisonerId.innerHTML + ' свободен')
    updatePrisionStatus()
    closeAllBoxes()
    document.getElementById('count').innerHTML = 0 // Обнуляем счетчик
    prisonerId.innerHTML = '' // Удаляем текст
    if (autoPlay) autoplay()
}

const restart = () => { // Перезапуск игры
    closeAllBoxes()
    document.querySelectorAll('.free').forEach(el => el.classList.remove('free')) // Удаляем свободных заключенных
    document.getElementById('count').innerHTML = 0 // Обнуляем счетчик
    document.querySelectorAll('.prisoner.check').forEach(el => el.classList.remove('check')) // Удаляем выбранных заключенных
    prisonerId.innerHTML = '' // Удаляем текст
    shuffle(arr) // Перемешиваем
}

const answer = () => { // Ответ
    document.querySelector('.modal').classList.add('open')
}

const autoplayOn = () => { // Показать кнопку автоигры
    document.querySelector('.modal').classList.remove('open')
    document.querySelector('.btn-autoplay').classList.add('visible')
}

const autoplay = () => {
    autoPlay = true
    let prisioner = document.querySelector('.prisoner:not(.check, .free)')
    prisioner.click()
    let prisionerNum = prisonerId.innerHTML
    findCorob(prisionerNum)
}

const findCorob = (corobNum) => {
    const countBox = document.querySelectorAll('.open').length
    let corob = document.getElementById(corobNum)
    corob.click()
    let nextCorob = corob.querySelector('.secret-num').innerHTML
    if (prisonerId.innerHTML !== nextCorob && countBox < 50) {
        setTimeout(() => findCorob(nextCorob), 10)
    }
}
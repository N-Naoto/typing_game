let scores, roundScore, activePlayer, gamePlaying;

function init() {
    activePlayer = 1
    roundScore = 0
    scores = [0,0]
    gamePlaying = true

    document.getElementById('dice-1').style.display = 'none'
    document.getElementById('dice-2').style.display = 'none'
    document.getElementById('score-1').textContent = 0
    document.getElementById('score-2').textContent = 0
    document.getElementById('points-1').textContent = 0
    document.getElementById('points-2').textContent = 0
    document.getElementById('name-1').textContent = 'player 1'
    document.getElementById('name-2').textContent = 'player 2'

    // player1だけactiveクラスを持つようにする
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-2-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.add('active')

}

document.querySelector('.btn-roll').addEventListener('click',() => {
    if (gamePlaying) {
        // サイコロの出た目を表示させる
        let dice1 = Math.floor(Math.random()*6)+1
        let dice2 = Math.floor(Math.random()*6)+1
        document.getElementById('dice-1').style.display = 'block'
        document.getElementById('dice-2').style.display = 'block'
        document.getElementById('dice-1').src = '../../static/images/js_1/dice-'+ dice1 +'.png'
        document.getElementById('dice-2').src = '../../static/images/js_1/dice-'+ dice2 +'.png'
    
        // 出た目を足してpointsに表示させる。
        roundScore += dice1 + dice2
        document.getElementById('points-' + activePlayer).textContent = roundScore

        if (dice1 == 1 || dice2 == 1) {
            document.getElementById('dice-1').style.display = 'none'
            document.getElementById('dice-2').style.display = 'none' 
            document.getElementById('points-' + activePlayer).textContent = 0

            activePlayer === 1 ? activePlayer = 2 : activePlayer = 1
            document.querySelector('.player-1-panel').classList.toggle('active')
            document.querySelector('.player-2-panel').classList.toggle('active')
            roundScore = 0
        }
    }
    
})

document.querySelector('.btn-new').addEventListener('click',init)

document.querySelector('.btn-hold').addEventListener('click',() => {
    if (gamePlaying) {
        let input = document.querySelector('.final-score').value;
        
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        // scoreを確定させる。
        scores[activePlayer-1] += roundScore
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer-1]
        document.getElementById('points-' + activePlayer).textContent = 0
        // サイコロを見えなくする。
        document.getElementById('dice-1').style.display = 'none'
        document.getElementById('dice-2').style.display = 'none' 
    }

    if (winningScore <= scores[activePlayer-1]) {
        document.getElementById('name-' + activePlayer).textContent = 'Win!'
        gamePlaying = false
    } else {
        // activePlayerを交換してactive状態も交換する
        activePlayer === 1 ? activePlayer = 2 : activePlayer = 1
        document.querySelector('.player-1-panel').classList.toggle('active')
        document.querySelector('.player-2-panel').classList.toggle('active')
        roundScore = 0
    }
})

init()
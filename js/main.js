const words = ['baseball','tennis','golf','karate']
let word
let endwords= []
let loc
let isPlaying = false
let flag = false // spaceとenterの制御
let count=0

const target = document.getElementById('target')
const result = document.getElementById('result')
const remainingCount = document.getElementById('remainingCount')
const records = document.getElementById('records')

function setWord() {
    remainingCount.textContent = words.length
    word = words.splice(Math.floor(Math.random() * words.length),1)[0]
    target.textContent = word
    endwords.push(word)
    loc = 0
} 

document.addEventListener('keydown',(e) => {
    if (flag === false) {
        if (e.key === ' ' || e.key === 'Enter') {
            if (isPlaying) {
                return
            }
            flag = true
            target.textContent = '1'
            setTimeout(() => {
                isPlaying = true
                startTime = performance.now()
                setWord()
            }, 1000)
        }
    }

    if (isPlaying) {
        if(e.key === word[loc]) {
            loc++
            target.textContent = word.substring(loc)
        }
        if (word.length === loc) {
            if(words.length === 0) {
                endTime = performance.now()
                time = ((endTime - startTime)/1000).toFixed(3)
                result.textContent = '終わった！' + time + '秒です。'
                remainingCount.textContent = ''
                isPlaying = false
                
                count += 1
                let li = document.createElement('li')
                let a = document.createTextNode(count + '回目  ' + time + '秒')
                li.appendChild(a)
                records.appendChild(li)
                return
            }
            setWord()
        }
    }

    if (e.key === 'Escape') {
        target.textContent = 'Space or Enter to start!'
        result.textContent = ''
        remainingCount.textContent = ''
        loc = 0
        isPlaying = false
        startTime = 0
        flag = false
        for (let i=0; i<endwords.length; i++) {
            words.push(endwords[i])
        }
        endwords = []
    }

})
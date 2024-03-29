const textArea = document.getElementById('text') as HTMLTextAreaElement
const wordCount = document.getElementById('wordCount')
const charCount = document.getElementById('charCount')
const sentenceCount = document.getElementById('sentenceCount')
const copyBtn = document.getElementById('copy')
const copiedText = document.getElementById('copied')

let text = localStorage.getItem('text')
textArea.value = text ?? ''

updateCounts()

textArea.addEventListener('input', updateCounts)

function updateCounts() {
    text = textArea.value
    localStorage.setItem('text', text)

    charCount.innerHTML = `${text.length}`

    let words = text.split('.').join().split('\n').join().split(' ')
    const formattedWords = words.filter((element) => {
        return element !== ''
    })

    wordCount.innerHTML = `${formattedWords.length}`

    let numSentences = text.split('.').length - 1

    sentenceCount.innerHTML = `${numSentences}`
}

copyBtn.addEventListener('click', () => {
    copyBtn.style.backgroundColor = 'mediumseagreen'
    copyBtn.innerHTML = 'Copied!'
    try {
        navigator.clipboard.writeText(textArea.value)
    } catch (error) {
        console.log("Issue copying to clipboard.");
    }
    setTimeout(() => {
        copyBtn.innerHTML = 'Copy Text'
        copyBtn.style.color = 'white'
        copyBtn.style.backgroundColor = 'dodgerblue'
    }, 500)
})
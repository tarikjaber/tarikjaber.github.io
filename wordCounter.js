const textArea = document.getElementById('text')
const wordCount = document.getElementById('wordCount')
const charCount = document.getElementById('charCount')

let text = localStorage.getItem('text')
textArea.value = text

updateCounts();

textArea.addEventListener('input', updateCounts);

function updateCounts() {
    text = textArea.value
    localStorage.setItem('text', text)

    charCount.innerHTML = `Characters: ${text.length}`

    let words = text.split(' ')
    const results = words.filter((element) => {
        return element !== ''
    })

    wordCount.innerHTML = `Words: ${results.length}`
}
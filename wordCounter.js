const textArea = document.getElementById('text')
const wordCount = document.getElementById('wordCount')
const charCount = document.getElementById('charCount')

textArea.addEventListener('input', function (e) {
    let text = e.target.value

    charCount.innerHTML = `Characters: ${text.length}`
    wordCount.innerHTML = `Words: ${text.split(' ').length}`
})

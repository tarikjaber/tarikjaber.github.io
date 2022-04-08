const textArea = document.getElementById('text')
const wordCount = document.getElementById('wordCount')
const charCount = document.getElementById('charCount')

textArea.addEventListener('input', function (e) {
    let text = e.target.value

    charCount.innerHTML = `Characters: ${text.length}`

    let words = text.split(' ');
    const results = words.filter((element) => {
        return element !== ''
    })

    wordCount.innerHTML = `Words: ${results.length}`
})

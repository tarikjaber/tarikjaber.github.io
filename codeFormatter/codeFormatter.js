let printBtn = document.getElementById('print');
let codeTextArea = document.getElementById('code-textarea');
let code = document.getElementById('code');
let documentNameInput = document.getElementById('document-name-input');
let documentTitle = document.getElementById('document-title');
let languageSelector = document.getElementById('languages')
let codeLines = document.getElementById('line-nums');

let selectedLanguage = 'javascript';

hljs.configure({
    languages: ['java', 'javascript', 'html', 'typescript', 'cpp']
})

hljs.highlightAll();

printBtn.addEventListener('click', () => {
    console.log('clicked');

    console.log(documentTitle.textContent);
    document.title = documentTitle.textContent ?? "code.pdf";

    window.print();

    document.title = "Code Formatter"
})

function escape(s) {
    return s.replace(
        /[^0-9A-Za-z ]/g,
        c => "&#" + c.charCodeAt(0) + ";"
    );
}

codeTextArea.addEventListener('input', () => {

    if (codeTextArea.value !== '') {
        code.innerHTML = escape(codeTextArea.value);

        hljs.highlightAll();

        let lines = codeTextArea.value.split('\n');

        if (lines[lines.length - 1] === '') {
            code.style.paddingBottom = "31px"
        } else {
            code.style.paddingBottom = "14px"
        }

        let numLines = lines.length
        let numLinesDigits = numLines.toString().length;

        codeLines.innerHTML = ""

        for (let i = 1; i <= numLines; i++) {

            codeLines.innerHTML += `<pre>${i.toString().padStart(numLinesDigits)} </pre>`;

        }

        codeLines.classList.add("hljs")


    } else {
        code.innerHTML = " ";
    }

})

documentNameInput.addEventListener('input', () => {
    console.log("hello");

    documentTitle.innerHTML = documentNameInput.value;
})

languageSelector.addEventListener('change', () => {
    console.log(languageSelector.value);
    code.classList.remove(`language-${selectedLanguage}`);
    selectedLanguage = languageSelector.value.replace("<", "&lt;").replace(">", "&gt;");
    code.classList.add(`language-${selectedLanguage}`);
    hljs.highlightAll()
})
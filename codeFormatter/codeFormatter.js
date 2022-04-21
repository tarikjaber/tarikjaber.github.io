let printBtn = document.getElementById('print');
let codeTextArea = document.getElementsByTagName('textarea')[0];
let code = document.getElementById('code');
let documentNameInput = document.getElementById('document-name-input');
let documentTitle = document.getElementById('document-title');
let languageSelector = document.getElementById('languages')
let codeLines = document.getElementById('line-nums');
let themeStylesheet = document.getElementById('theme-style');
let themeSelector = document.getElementById('themes');

let selectedLanguage = 'javascript';
let selectedTheme = 'default';
let codeText = 'console.log("Hello World")';

selectedTheme = localStorage.getItem('theme') ?? 'github-dark'
themeStylesheet.href = getStylesheet(selectedTheme);
themeSelector.value = selectedTheme;

code.classList.remove(`language-${selectedLanguage}`);
selectedLanguage = localStorage.getItem('language') ?? 'javascript'
code.classList.add(`language-${selectedLanguage}`);
languageSelector.value = selectedLanguage;
themeStylesheet.href = getStylesheet(selectedTheme);

codeText = localStorage.getItem('code') ?? 'console.log("Hello World")';
console.log(codeText);
localStorage.setItem('code', codeText);
codeTextArea.value = codeText;
code.innerHTML = escape(codeText)
updateLineNumbers();

console.log("javascript run");

hljs.configure({
    languages: ['java', 'javascript', 'html', 'typescript', 'cpp']
})

hljs.highlightAll();

printBtn.addEventListener('click', () => {
    console.log("Print button clicked.");
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

codeTextArea.addEventListener('onChange', () => {

    if (codeTextArea.value !== '') {
        localStorage.setItem('code', codeTextArea.value);
        code.innerHTML = escape(codeTextArea.value);

        hljs.highlightAll();

        updateLineNumbers();
    } else {
        code.innerHTML = "";
        localStorage.setItem('code', '');
        updateLineNumbers();
    }

})

function updateLineNumbers() {
    let lines = codeTextArea.value.split('\n');


    if (lines[lines.length - 1] === '') {
        code.style.paddingBottom = "31px"
    } else {
        code.style.paddingBottom = "14px"
    }

    let numLines = lines.length
    let numLinesDigits = numLines.toString().length;

    codeLines.innerHTML = ""

    for (let i = 0; i < numLines; i++) {

        codeLines.innerHTML += `<pre>${(i + 1).toString().padStart(numLinesDigits)} </pre>`;
        for (let j = 0; j < (lines[i].length) / 98 - 1; j++) {
            codeLines.innerHTML += `<pre>${"".padStart(numLinesDigits)} </pre>`;
        }
    }

    codeLines.classList.add("hljs")
}

languageSelector.addEventListener('change', () => {
    code.classList.remove(`language-${selectedLanguage}`);
    selectedLanguage = languageSelector.value.replace("<", "&lt;").replace(">", "&gt;");
    code.classList.add(`language-${selectedLanguage}`);
    hljs.highlightAll()

    localStorage.setItem('language', selectedLanguage);
})

themeSelector.addEventListener('change', () => {
    themeStylesheet.href = getStylesheet(themeSelector.value);
    documentTitle.innerHTML = documentNameInput.value;

    localStorage.setItem('theme', themeSelector.value);
})

function getStylesheet(style) {
    return `//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/${style}.min.css`
}

window.addEventListener('beforeprint', event => {
    if (!titleCheckbox.checked) {
        document.body.classList.add('hljs')
    }
});

window.addEventListener('afterprint', event => {
    if (!titleCheckbox.checked) {
        document.body.classList.remove('hljs')
    }
});

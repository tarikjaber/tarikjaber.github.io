let printBtn = document.getElementById('print');
let codeTextArea = document.getElementById('code-textarea');
let code = document.getElementById('code');
let documentNameInput = document.getElementById('document-name-input');
let documentTitle = document.getElementById('document-title');
let languageSelector = document.getElementById('languages')
let codeLines = document.getElementById('line-nums');
let titleCheckbox = document.getElementById('titleCheckbox');
let themeStylesheet = document.getElementById('theme-style');
let themeSelector = document.getElementById('themes');
let clearBtn = document.getElementById('clear');

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
codeTextArea.value = codeText;
code.innerHTML = escape(codeText)
updateLineNumbers();

hljs.configure({
    languages: ['java', 'javascript', 'html', 'typescript', 'cpp']
})

hljs.highlightAll();

printBtn.addEventListener('click', () => {
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
        code.style.paddingBottom = "22px"
    } else {
        code.style.paddingBottom = "10px"
    }

    let numLines = lines.length
    let numLinesDigits = numLines.toString().length;

    codeLines.innerHTML = ""

    for (let i = 0; i < numLines; i++) {

        codeLines.innerHTML += `<pre>${(i + 1).toString().padStart(numLinesDigits)} </pre>`;
        if (lines[i].length > 84 && titleCheckbox.checked) {
            console.log("Hello");
            for (let j = 0; j < (lines[i].length - 1) / 84 - 1; j++) {
                console.log("In here");
                console.log(lines[i].length);
                console.log(lines[i]);
                console.log((lines[i].length - 1) / 84);
                codeLines.innerHTML += `<pre>${"".padStart(numLinesDigits)} </pre>`;
            }
        } else if (lines[i].length > 94 && !titleCheckbox.checked) {
            for (let j = 0; j < (lines[i].length - 1) / 94 - 1; j++) {
                codeLines.innerHTML += `<pre>${"".padStart(numLinesDigits)} </pre>`;
            }
        }
    }

    codeLines.classList.add("hljs")
}

documentNameInput.addEventListener('input', () => {

    documentTitle.innerHTML = documentNameInput.value;
})

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

titleCheckbox.addEventListener('change', () => {
    let codeContainer = document.getElementById('code-container');
    let code = document.getElementById('code');
    let lineNums = document.getElementById('line-nums');

    if (titleCheckbox.checked) {
        documentTitle.value = documentNameInput.value ?? "Code"; 
        documentTitle.style.display = "block";
        codeContainer.style.marginLeft = "0px";
        codeContainer.style.marginRight = "0px";

        lineNums.style.borderRadius = "6px 0 0 6px";
        code.style.borderRadius = "0 6px 6px 0";
    } else {
        documentTitle.style.display = "none";

        codeContainer.style.marginLeft = "-20px";
        codeContainer.style.marginRight = "-20px";

        lineNums.style.borderRadius = "0"
        code.style.borderRadius = "0"
    }
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

clearBtn.addEventListener('click', () => {
    codeTextArea.value = "";
    code.innerHTML = " ";
    localStorage.setItem('code', "");
    updateLineNumbers();
})
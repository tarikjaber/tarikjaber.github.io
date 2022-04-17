let printBtn = document.getElementById('print');
let codeTextArea = document.getElementById('code-textarea');
let code = document.getElementById('code');
let documentNameInput = document.getElementById('document-name-input');
let documentTitle = document.getElementById('document-title');
let languageSelector = document.getElementById('languages')
let codeLines = document.getElementById('line-nums');
let titleCheckbox = document.getElementById('titleCheckbox');
let selectedLanguage = 'javascript';
let themeStylesheet = document.getElementById('theme-style');
let themeSelector = document.getElementById('themes');

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
            code.style.paddingBottom = "22px"
        } else {
            code.style.paddingBottom = "10px"
        }

        let numLines = lines.length
        let numLinesDigits = numLines.toString().length;

        codeLines.innerHTML = ""

        for (let i = 0; i < numLines; i++) {

            codeLines.innerHTML += `<pre>${(i + 1).toString().padStart(numLinesDigits)} </pre>`;
            if ((lines[i].length > 84 && titleCheckbox.checked) || (lines[i].length > 94 && !titleCheckbox.checked)) {
                codeLines.innerHTML += `<pre>${"".padStart(numLinesDigits)} </pre>`;
            }

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

themeSelector.addEventListener('change', () => {
    console.log("hello");
    themeStylesheet.href = getStylesheet(themeSelector.value);
    documentTitle.innerHTML = documentNameInput.value;
})

titleCheckbox.addEventListener('change', () => {
    let codeContainer = document.getElementById('code-container');
    let code = document.getElementById('code');
    let lineNums = document.getElementById('line-nums');

    if (titleCheckbox.checked) {
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
    console.log(titleCheckbox.checked);
})

function getStylesheet(style) {
    return `//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/${style}.min.css`
}

window.addEventListener('beforeprint', event => { 
    console.log("before print");
    if (!titleCheckbox.checked) {
        document.body.classList.add('hljs')
    }
});

window.addEventListener('afterprint', event => {
    console.log("after print");
    if (!titleCheckbox.checked) {
        document.body.classList.remove('hljs')
    }
});
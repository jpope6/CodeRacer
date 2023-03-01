import { binary_search } from "./binary-search.js";
// import { partition, quicksort } from "./quicksort.js";

let code = document.getElementById("text-to-type");
let python = document.getElementById("python");
let java = document.getElementById("java");
let cpp = document.getElementById("c++");
let js = document.getElementById("js");



const code_list = [binary_search]
let cur_language = "Python"
let random_index = Math.floor(Math.random() * code_list.length);
let current_block = code_list[random_index][cur_language]
export let divArray = []

let code_container = splitSnippetToDivs(divArray);

function changeLanguage(language) {
    cur_language = language;
    current_block = code_list[random_index][cur_language]

    code_container.remove();

    code_container = splitSnippetToDivs();
}

python.addEventListener("click", () => changeLanguage("Python"));
java.addEventListener("click", () => changeLanguage("Java"));
cpp.addEventListener("click", () => changeLanguage("C++"));
js.addEventListener("click", () => changeLanguage("JavaScript"));

function splitSnippetToDivs() {
    // Create new code container and divArray for new snippet
    let code_container = document.createElement("div");
    code_container.id = "code_container";
    divArray = []


    //loop through each line of the code snippet
    for (let i = 0; i < current_block.length; i++) {
        //Create a new line div
        let current_line = document.createElement("div");
        current_line.style.display = "flex";
        //loop through each character in the line
        for (let j = 0; j < current_block[i].length; j++) {
            //Create a new current chracter div and add it to array
            let current = document.createElement("div");
            current.innerHTML = current_block[i][j];
            current_line.appendChild(current);
            divArray.push(current);
        }
        code_container.appendChild(current_line);
    }

    code.appendChild(code_container);

    return code_container;
}

//Start of Character Correctness Code ---------------------------------------------
var gameIndex = 0;

//Char Check & Manipulation Functions
function keydownSend(keyName) {

    if (keyName == "Enter") {
        var isCorr = checkCharCorrectness("\n", gameIndex);
        if (isCorr) {
            unsetHighlight(gameIndex);
            //Find next space to go to
            var nextIndex = findNextNonWhiteSpace();
            gameIndex = nextIndex;
            setHighlight(gameIndex);
            return;
        }
        else {
            return;
        }

    }
    else if (keyName == "Backspace") {
        //Make sure not backspacing into nothing
        if (gameIndex > 0) {
            //Check if backspacing into a tab TODO************
            var lastNonWhiteSpace = findPreviousNonWhiteSpace();
            var distToLastNonWhiteSpace = gameIndex - lastNonWhiteSpace;

            if (distToLastNonWhiteSpace > 3) {
                unsetHighlight(gameIndex);
                gameIndex = lastNonWhiteSpace;
                setHighlight(gameIndex);
                return;
            }

            updateCursorBackward(gameIndex);
            gameIndex--;
            return;
        }
        else return;
    }
    else {
        //Legitimate letter input

        //If newline is what is needed, it is necessary to hit enter.  This prevents cursor misalignment
        if (divArray[gameIndex].innerText == '\n') {
            return;
        }
        var isCorr = checkCharCorrectness(keyName, gameIndex);
        updateCursorForward(gameIndex, isCorr);
    }

    gameIndex++;
}
function checkCharCorrectness(keyName, gameIndex) {
    var charToType = divArray[gameIndex].innerText;

    if (keyName == charToType) {
        console.log("Index: " + gameIndex + " | User: " + keyName + " | Text: " + charToType + " | CORRECT");
        return 1;
    }
    else {
        console.log("Index: " + gameIndex + " | User: " + keyName + " | Text: " + charToType + " | INCORRECT");
        return 0;
    }
}
function findNextNonWhiteSpace() {
    let currIndex = gameIndex;

    while(divArray[currIndex + 1].innerText == ' '){
        currIndex++;
    }
    currIndex++;
    return currIndex;
}
function findPreviousNonWhiteSpace() {
    let currIndex = gameIndex;

    while(divArray[currIndex - 1].innerText == ' '){
        currIndex--;
    }
    currIndex--;
    return currIndex;
}

//Highlighting functions
function updateCursorForward(gameIndex, isCorr) {
    setHighlight(gameIndex + 1);
    unsetHighlight(gameIndex);
    //Next we will update the correctness of the char that was just typed
    if (isCorr) {
        setCorrectBG(gameIndex);
    }
    else {
        setIncorrectBG(gameIndex);
    }
}
function updateCursorBackward(gameIndex) {
    unsetHighlight(gameIndex);
    setHighlight(gameIndex - 1);
}
function beginCursorHighlight() {
    setHighlight(gameIndex);
}
function setHighlight(index) {
    divArray[index].style.backgroundColor = "#c2c2c2";
}
function unsetHighlight(index) {
    divArray[index].style.backgroundColor = "";
}
function setCorrectBG(index) {
    divArray[index].style.backgroundColor = "#00ff00";
}
function setIncorrectBG(index) {
    divArray[index].style.backgroundColor = "#ff3300";
}

//Event Listener
document.addEventListener('keydown', (event) => {
    var keyName = event.key;

    const KEY_IGNR = ["Shift", "CapsLock", "Alt", "Insert", "Delete", "Home", "End", "PageUp", "PageDown", "ScrollLock", "Pause",
                        "NumLock", "Control", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "ArrowUp",
                        "ArrowDown", "ArrowLeft", "ArrowRight", "Escape"];
    if (!KEY_IGNR.includes(keyName)) {
        keydownSend(keyName);
    }
}, false);

//Begins the cursor highlight at launch
beginCursorHighlight();

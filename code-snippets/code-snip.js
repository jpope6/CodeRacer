import { binary_search } from "./binary-search.js";
import { partition, quicksort } from "./quicksort.js";
import { bfs } from "./bfs.js";
import { dfs } from "./dfs.js";
import { bubbleSort } from "./bubble-sort.js";
import { selectionSort } from "./selection-sort.js";
import { insertionSort } from "./insertion-sort.js";
import { heapSort } from "./heap-sort.js";
import { longestCommonSubsequence } from "./lcs.js";

let code = document.getElementById("text-to-type");
let python = document.getElementById("python");
let java = document.getElementById("java");
let cpp = document.getElementById("c++");
let js = document.getElementById("js");

// *******BLOCK FOR MODAL POP-UP WHEN CODE FINISHED TYPING*********

let test_button = document.getElementById("testButton");
let modal = document.getElementById("modal");
let closeModalButton = document.getElementById("modalClose");


test_button.addEventListener('click', () => {
    modal.showModal();
});

// close modal when user clicks on the close button
closeModalButton.addEventListener('click', () => {
    modal.close();
    changeToRandomSnippet();
    resetToInitialConditions();
});

// close modal when user clicks outside of the modal
modal.addEventListener('click', (e) => {
    if (e.target.nodeName === "DIALOG") {
        modal.close();
        changeToRandomSnippet();
        resetToInitialConditions();
    }
});



// **********END OF BLOCK FOR MODAL****************

const code_list = [bfs, binary_search, bubbleSort, dfs, heapSort, insertionSort, 
    longestCommonSubsequence, selectionSort, partition, quicksort]
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

    //Reset to initial conditions just incase some of the current code has been typed
    resetToInitialConditions();
}

python.addEventListener("click", () => changeLanguage("Python"));
java.addEventListener("click", () => changeLanguage("Java"));
cpp.addEventListener("click", () => changeLanguage("C++"));
js.addEventListener("click", () => changeLanguage("JavaScript"));

// Add link to learn more about the algorithm
const learnMoreButton = document.getElementById("learnMore");

learnMoreButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(code_list[random_index]["link"]);
});

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
            current.style.fontSize = "100%";
            divArray.push(current);
        }
        code_container.appendChild(current_line);
    }

    code.appendChild(code_container);

    return code_container;
}

//Start of Character Correctness Code ---------------------------------------------
var gameIndex = 0;

//User stats NOT READY YET
//From profile if available, for use in calculating next average
// GlobalUserStats = {
//     totalWords: 0,
//     totalChars: 0,
//     avgWPM: 0,
//     avgWPS: 0,
//     avgCPM: 0,
//     avgCPS: 0,
//     totalRunsCompleted: 0,
//     totalTimeTyping: 0
// };

// //Stats for current snippet
// LocalUserStats = {
//     totalWords: 0,
//     totalChars: 0,
//     avgWPM: 0,
//     avgWPS: 0,
//     avgCPM: 0,
//     avgCPS: 0,
//     totalRunsCompleted: 0,
//     totalTimeTyping: 0,
//     accuracy,
//     lifetime accuracy 
// };

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
            //Check if backspacing into a tab
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

        //Check for last character
        if (isLastChar(gameIndex)) {
            //Currently on last, we should unhighlight the current div, and for now, we can change code snippets
            //console.log("Last char!");

            unsetHighlight(gameIndex);

            if (isCorr) {
                setCorrectBG(gameIndex);
            }
            else {
                setIncorrectBG(gameIndex);
            }

            //Send local stats here TODO**
            
            modal.showModal();

            // I moved this block to execute when our pop up closes -Jared
            // 
            //For now we can change snippet
            //changeToRandomSnippet();
            //resetToInitialConditions();
            return;

        } else {
            updateCursorForward(gameIndex, isCorr);
        }
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

    while (divArray[currIndex + 1].innerText == ' ') {
        currIndex++;
    }
    currIndex++;
    return currIndex;
}
function findPreviousNonWhiteSpace() {
    let currIndex = gameIndex;

    while (divArray[currIndex - 1].innerText == ' ') {
        currIndex--;
    }
    currIndex--;
    return currIndex;
}
function isLastChar(gameIndex) {
    if (gameIndex == divArray.length - 1) {
        return 1;
    }
    else return 0;
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
    unsetHighlight(gameIndex - 1);
    setHighlight(gameIndex - 1);
}
function beginCursorHighlight() {
    setHighlight(gameIndex);
}
function setHighlight(index) {
    // divArray[index].style.backgroundColor = "#c2c2c2";
    divArray[index].style.backgroundColor = "";
    divArray[index].style.color = "";
    divArray[index].className = "activeDiv";
}
function unsetHighlight(index) {
    // divArray[index].style.backgroundColor = "";
    divArray[index].style.color = "";
    divArray[index].className = "";
    divArray[index].style.fontWeight = "400";
}
function setCorrectBG(index) {
    // divArray[index].style.backgroundColor = "#00ff00";
    divArray[index].style.color = "#009A17";
    divArray[index].style.fontWeight = "800"
}
function setIncorrectBG(index) {
    // divArray[index].style.backgroundColor = "#ff3300";
    divArray[index].style.color = "#ff3300";
    divArray[index].style.fontWeight = "800"
}
function resetToInitialConditions() {
    //clearLocalStats();
    gameIndex = 0;
    for (var i = 0; i < divArray.length; i++) {
        unsetHighlight(i);
    }
    beginCursorHighlight();
}
// function clearLocalStats() {
//     for (var i = 0; i < LocalUserStats.length; i++) {
//         LocalUserStats[i] = 0;
//     }
// }
function changeToRandomSnippet() {
    let mostRecentIndex = random_index;

    //Select new random code index, but do not select the same one as before
    do {
        random_index = Math.floor(Math.random() * code_list.length);
    } while (random_index == mostRecentIndex);

    current_block = code_list[random_index][cur_language];
    code_container.remove();
    code_container = splitSnippetToDivs();
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

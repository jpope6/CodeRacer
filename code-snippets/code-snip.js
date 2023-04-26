//Imports
import { binary_search } from "./binary-search.js";
import { partition, quicksort } from "./quicksort.js";
import { bfs } from "./bfs.js";
import { dfs } from "./dfs.js";
import { bubbleSort } from "./bubble-sort.js";
import { selectionSort } from "./selection-sort.js";
import { insertionSort } from "./insertion-sort.js";
import { heapSort } from "./heap-sort.js";
import { longestCommonSubsequence } from "./lcs.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, child, get, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

let code = document.getElementById("text-to-type");
let python = document.getElementById("python");
let java = document.getElementById("java");
let cpp = document.getElementById("c++");
let js = document.getElementById("js");

// *******BLOCK FOR MODAL POP-UP WHEN CODE FINISHED TYPING*********

let modal = document.getElementById("modal");
let closeModalButton = document.getElementById("modalClose");

// close modal when user clicks on the close button
closeModalButton.addEventListener('click', () => {
    resetBlur();
    modal.close();
    changeToRandomSnippet();
    resetToInitialConditions();
    confirmCompletion();
});

// close modal when user clicks outside of the modal
modal.addEventListener('click', (e) => {
    if (e.target.nodeName === "DIALOG") {
        resetBlur();
        modal.close();
        changeToRandomSnippet();
        resetToInitialConditions();
        confirmCompletion();
    }
});

// **********END OF BLOCK FOR MODAL****************

// *******BLOCK FOR UNBLUR CONTENT WHEN CLICKED*********

const hidden_div = document.getElementById("hidden");
const container = document.getElementById("container");
const text_to_type = document.getElementById("text-to-type");
let hidden = true;

container.addEventListener("click", () => {
    text_to_type.style.animation = 'unblur 1s ease';
    text_to_type.style.filter = 'none'
    hidden_div.style.zIndex = -3;
    hidden = false;
});

function resetBlur() {
    text_to_type.style.filter = 'blur(5px)'
    hidden_div.style.zIndex = 3;
    hidden = true;
}

// **********END OF BLOCK FOR BLURRING CONTENT****************

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

// User's statistical results

var total_words_typed = totalWords;
var total_characters_typed = totalChars;
var avg_WPM = lavg_WPM;
var avg_CPM = lavg_CPM;
var accuracy = laccuracy;

// Displays the user's statistics on the modal (Rounded to 2 decimal places)

function updateModal() {
    document.getElementById("time_h2").innerText = Math.round((getCurrentTimeSinceFirstChar() + Number.EPSILON) * 100) / 100 + " s";
    document.getElementById("wpm_h2").innerText = Math.round((avg_WPM + Number.EPSILON));
    document.getElementById("acc_h2").innerText = Math.round((accuracy + Number.EPSILON) * 100) + " %";
    document.getElementById("cpm_h2").innerText = Math.round((avg_CPM + Number.EPSILON));
}

// Updates the database after the code snippet is completed

function confirmCompletion() {

    const firebaseConfig = {
        apiKey: "AIzaSyCfqETPecXz44bqT_d5hgQAFbejf4isfIk",
        authDomain: "coderacer-4d354.firebaseapp.com",
        databaseURL: "https://coderacer-4d354-default-rtdb.firebaseio.com",
        projectId: "coderacer-4d354",
        storageBucket: "coderacer-4d354.appspot.com",
        messagingSenderId: "300760585108",
        appId: "1:300760585108:web:f1841e34b255daf97fb581"
    };

    // Initialize Firebase

    const app = initializeApp(firebaseConfig);

    const db = getDatabase();

    // Gets the user's username that's stored in the local or session storage

    var currentuser = null;

    let keepLoggedIn = localStorage.getItem("keepLoggedIn");

    if (keepLoggedIn == "yes") {
        currentuser = JSON.parse(localStorage.getItem('user'));
    }
    else {
        currentuser = JSON.parse(sessionStorage.getItem('user'));
    }

    // Database reference

    const dbRef = ref(db);

    // Updates the statistics after the user finishes the code snippet (Rounded to 2 decimal places)

    function updateStatistics() {
        get(child(dbRef, "UsersList/" + currentuser.username)).then((snapshot) => {
            var update_time = snapshot.val().total_time_spent_typing + getCurrentTimeSinceFirstChar();
            var update_acc = snapshot.val().lifetime_accuracy * snapshot.val().total_completed_runs;
            var update_runs = snapshot.val().total_completed_runs + 1;
            update_acc += accuracy * 100;
            update_acc /= update_runs;
            var update_total_words = snapshot.val().total_words_typed + totalWords;
            var update_total_chars = snapshot.val().total_characters_typed + totalChars;

            // Getting the data points individually from the database

            var retrieved_data_point_2 = snapshot.val().data_point_2;
            var retrieved_data_point_3 = snapshot.val().data_point_3;
            var retrieved_data_point_4 = snapshot.val().data_point_4;
            var retrieved_data_point_5 = snapshot.val().data_point_5;
            var retrieved_data_point_6 = snapshot.val().data_point_6;
            var retrieved_data_point_7 = snapshot.val().data_point_7;
            var retrieved_data_point_8 = snapshot.val().data_point_8;
            var retrieved_data_point_9 = snapshot.val().data_point_9;
            var retrieved_data_point_10 = snapshot.val().data_point_10;

            update(ref(db, "UsersList/" + currentuser.username),
                {
                    total_words_typed: update_total_words,
                    total_characters_typed: update_total_chars,
                    avg_WPM: Math.round((avg_WPM + Number.EPSILON)),
                    avg_CPM: Math.round((avg_CPM + Number.EPSILON)),
                    accuracy: Math.round((accuracy + Number.EPSILON) * 100),
                    lifetime_accuracy: Math.round(update_acc + Number.EPSILON),
                    total_completed_runs: update_runs,
                    total_time_spent_typing: Math.round((update_time + Number.EPSILON) * 100) / 100,
                    data_point_1: retrieved_data_point_2,
                    data_point_2: retrieved_data_point_3,
                    data_point_3: retrieved_data_point_4,
                    data_point_4: retrieved_data_point_5,
                    data_point_5: retrieved_data_point_6,
                    data_point_6: retrieved_data_point_7,
                    data_point_7: retrieved_data_point_8,
                    data_point_8: retrieved_data_point_9,
                    data_point_9: retrieved_data_point_10,
                    data_point_10: Math.round(avg_WPM + Number.EPSILON),
                })
                .catch((error) => {
                    alert("Error" + error);
                })
        });
    }

    window.onload = updateStatistics();
}

//Start of Character Correctness Code ---------------------------------------------
var gameIndex = 0;
var totalWords = 0;
var totalChars = 0;
var lavg_WPM = 0;
var lavg_CPM = 0;
var timeSpentOnCurrSnippet = 0;
var laccuracy = 1;
var currentCorrect = 0;
var isFirstCharPressed = 0;
var timeOfFirstChar = 0;
var correct = [divArray.length];

function getCurrentTimeSinceFirstChar() {
    return performance.now() / 1000 - timeOfFirstChar;
}
function resetLocalStats() {
    totalWords = 0;
    totalChars = 0;
    lavg_WPM = 0;
    lavg_CPM = 0;
    timeSpentOnCurrSnippet = 0;
    laccuracy = 1;
    isFirstCharPressed = 0;
    timeOfFirstChar = 0;
    currentCorrect = 0;

    for (var i = 0; i < correct.length; i++) {
        correct[i] = 0;
    }
}
//Char Check & Manipulation Functions
function keydownSend(keyName) {
    if (!isFirstCharPressed) {
        isFirstCharPressed = true;
        timeOfFirstChar = performance.now() / 1000;
    }

    //console.log(getCurrentTimeSinceFirstChar());
    if (keyName == "Enter") {
        var isCorr = checkCharCorrectness("\n", gameIndex);
        if (isCorr) {
            unsetHighlight(gameIndex);
            //Find next space to go to
            var nextIndex = findNextNonWhiteSpace();
            gameIndex = nextIndex;
            setHighlight(gameIndex);
            totalWords++;
            return;
        }
        else {
            return;
        }

    }
    else if (keyName == "Backspace") {
        //Make sure not backspacing into nothing
        if (gameIndex > 0) {
            totalChars--;

            if (correct[gameIndex - 1] == 1) {
                currentCorrect--;
            }
            correct[gameIndex - 1] = 0;

            //Check if backspacing into a tab
            var lastNonWhiteSpace = findPreviousNonWhiteSpace();
            var distToLastNonWhiteSpace = gameIndex - lastNonWhiteSpace;

            if (distToLastNonWhiteSpace > 3) {
                unsetHighlight(gameIndex);
                gameIndex = lastNonWhiteSpace;
                setHighlight(gameIndex);
                return;
            }

            if (divArray[gameIndex - 1].innerText == ' ') {
                totalWords--;
            }

            updateCursorBackward(gameIndex);
            gameIndex--;
            //console.log("Correct: " + currentCorrect);
            //console.log("TotalChars: " + totalChars);
            return;
        }
        else return;
    }
    else {
        //Legitimate letter input
        totalChars++;

        //If newline is what is needed, it is necessary to hit enter.  This prevents cursor misalignment
        if (divArray[gameIndex].innerText == '\n') {
            return;
        }

        if (divArray[gameIndex].innerText == ' ') {
            totalWords++;
        }

        var isCorr = checkCharCorrectness(keyName, gameIndex);
        if (isCorr) {
            correct[gameIndex] = 1;
            currentCorrect++;
        }
        else {
            correct[gameIndex] = -1;
        }

        //Check for last character
        if (isLastChar(gameIndex)) {
            //Currently on last, we should unhighlight the current div, and for now, we can change code snippets
            unsetHighlight(gameIndex);

            if (isCorr) {
                setCorrectBG(gameIndex);
            }
            else {
                setIncorrectBG(gameIndex);
            }

            //Send local stats
            lavg_WPM = (totalWords / (getCurrentTimeSinceFirstChar() / 60));
            lavg_CPM = (totalChars / (getCurrentTimeSinceFirstChar() / 60));
            timeSpentOnCurrSnippet = getCurrentTimeSinceFirstChar();
            laccuracy = currentCorrect / totalChars;

            total_words_typed = totalWords;
            total_characters_typed = totalChars;
            avg_WPM = lavg_WPM;
            avg_CPM = lavg_CPM;
            accuracy = laccuracy;

            //Debug for end of snippet stats
            console.log("TOTAL WPM: " + lavg_WPM);
            console.log("TOTAL CPM: " + lavg_CPM);
            console.log("TOTAL ACC: " + laccuracy);
            console.log("TOTAL TIME: " + timeSpentOnCurrSnippet);

            modal.showModal();
            updateModal();

            return;

        } else {
            updateCursorForward(gameIndex, isCorr);
        }
    }

    gameIndex++;
    //console.log("Correct: " + currentCorrect);
    //console.log("TotalChars: " + totalChars);
}
function checkCharCorrectness(keyName, gameIndex) {
    var charToType = divArray[gameIndex].innerText;

    if (keyName == charToType) {
        return 1;
    }
    else {
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
    if (divArray[index].innerText == " ") {
        divArray[index].style.backgroundImage = "";
    } else {
        divArray[index].style.color = "";
    }
    divArray[index].className = "";
    divArray[index].style.fontWeight = "400";
}
function setCorrectBG(index) {
    // divArray[index].style.backgroundColor = "#00ff00";
    divArray[index].style.color = "#009A17";
    divArray[index].style.fontWeight = "800";
}
function setIncorrectBG(index) {
    // divArray[index].style.backgroundColor = "#ff3300";
    if (divArray[index].innerText == " ") {
        divArray[index].style.backgroundImage = "linear-gradient(180deg, transparent 0%, transparent 90%, #ff3300 90%, #ff3300 100%)";
    } else {
        divArray[index].style.color = "#ff3300";
        divArray[index].style.fontWeight = "800"
    }
}
function resetToInitialConditions() {
    resetLocalStats();

    gameIndex = 0;
    for (var i = 0; i < divArray.length; i++) {
        unsetHighlight(i);
    }
    beginCursorHighlight();
}
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
    // if the user has not clicked to activate typing, do not do anything
    if (hidden) {
        return
    }

    var keyName = event.key;

    if (keyName == "/"){
        event.preventDefault();
        keydownSend("/");
        return;
    }

    const KEY_IGNR = ["Shift", "CapsLock", "Alt", "Insert", "Delete", "Home", "End", "PageUp", "PageDown", "ScrollLock", "Pause",
        "NumLock", "Control", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "ArrowUp",
        "ArrowDown", "ArrowLeft", "ArrowRight", "Escape"];
    if (!KEY_IGNR.includes(keyName)) {
        keydownSend(keyName);
    }
}, false);

//Begins the cursor highlight at launch
beginCursorHighlight();

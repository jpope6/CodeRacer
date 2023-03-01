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

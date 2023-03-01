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

let code_container = document.createElement("div");
code_container.id = "code_container";

for (let i = 0; i < current_block.length; i++) {
    let current_line = document.createElement("div");
    current_line.className = "line";
    for (let j = 0; j < current_block[i].length; j++) {
        let current = document.createElement("div");
        current.innerHTML = current_block[i][j];
        current_line.appendChild(current);
    }
    code_container.appendChild(current_line);
}

code.appendChild(code_container);

function changeLanguage(language) {
    cur_language = language;
    code.innerHTML = code_list[random_index][cur_language];
}

python.addEventListener("click", () => changeLanguage("Python"));
java.addEventListener("click", () => changeLanguage("Java"));
cpp.addEventListener("click", () => changeLanguage("C++"));
js.addEventListener("click", () => changeLanguage("JavaScript"));



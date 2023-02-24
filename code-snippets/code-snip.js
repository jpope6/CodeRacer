import { binary_search } from "./binary-search.js";

let code = document.getElementById("text-to-type");
let python = document.getElementById("python");
let java = document.getElementById("java");
let cpp = document.getElementById("c++");
let js = document.getElementById("js");
let c = document.getElementById("c");



const code_list = [binary_search]
let cur_language = "Python"
let random_index = Math.floor(Math.random() * code_list.length);
code.innerHTML = code_list[random_index][cur_language];

function changeLanguage(language) {
    cur_language = language;
    code.innerHTML = code_list[random_index][cur_language];
}

python.addEventListener("click", () => changeLanguage("Python"));
java.addEventListener("click", () => changeLanguage("Java"));
cpp.addEventListener("click", () => changeLanguage("C++"));
js.addEventListener("click", () => changeLanguage("JavaScript"));
c.addEventListener("click", () => changeLanguage("C"));


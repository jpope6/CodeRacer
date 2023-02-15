let main = document.getElementById("mainContent");
let text = document.getElementById("text-to-type");

function CoralTheme() 
{
    var element = document.body;
    element.classList.toggle("coralStyle"); 
    element.classList.remove("blueStyle");
    text.style.color = "red";

}

function OceanTheme() {
    main.style.backgroundColor = "blue";
}

function BlueTheme() 
{

    var element = document.body;
    element.classList.toggle("blueStyle");
    element.classList.remove("coralStyle");
}

function DefultTheme() 
{
    var element = document.body;
    element.classList.remove("coralStyle");
    element.classList.remove("blueStyle");

}

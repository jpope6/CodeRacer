function CoralTheme() 
{
    var element = document.body;
    element.classList.toggle("coralStyle"); 
    element.classList.remove("blueStyle");

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

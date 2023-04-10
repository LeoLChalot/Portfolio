let messageArray = ["Typewriter Effect"];
let textPosition = 0;
let speed = 100;

typewriter = () => {
    document.querySelector('#typewriter').innerHTML = messageArray[0].substring(0, textPosition) + "<span>|</span>";

    if(textPosition++ != messageArray[0].length){
        setTimeout(typewriter, speed);
    }
}

window.addEventListener("load", typewriter)

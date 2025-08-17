let btn = document.querySelector("#btn");
let content = document.querySelector("#content");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 2;
    // text_speak.lang = "en-GB";
    window.speechSynthesis.speak(text_speak);
}

function wishme() {
    let day = new Date();
    let hours = day.getHours();

    if (hours >= 0 && hours < 12) {
        speak("Good morning sir ...how can i help you today");
    }
    else if (hours >= 12 && hours < 16) {
        speak("Good afternoon sir... how can i help you today");
    }
    else {
        speak("good evening sir.... how can i help you today");
    }
}

// Run greeting when page loads
window.addEventListener('load', () => {
    wishme();
});

// Setup Speech Recognition
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takecommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
});

function takecommand(message) {
    if (message.includes("hello") || message.includes("hye")) {
        speak("Hello sir, what can I help you with?");
    }
    else if (message.includes("who are you")) {
        speak("I am Jarvis, created by Vivek sir.");
    }
    else if(message.includes("meet my friend")){
        speak(" hello...nice to meet you ....i am jarvis.")
    }
    else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/");
    }
    else if (message.includes("open instagram")) {
        speak("Opening instagram...");
        window.open("https://www.instagram.com/");
    }
    else if (message.includes("open chatgpt")) {
        speak("Opening chatgpt...");
        window.open("https://www.chatgpt.com/");
    }
    else if (message.includes("open whatsapp")) {
        speak("Opening whatspapp...");
        window.open("https://www.whatsapp.com/");
    }
    else if(message.includes("time")){
        let time=new Date().toLocaleDateString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }
     else if(message.includes("date")){
        let time=new Date().toLocaleDateString(undefined,{day:"numeric",month:"numeric"})
        speak(time)
    }
    else {
        speak(`This is what I found on the internet regarding ${message.replace("jarvis", "")}`);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}
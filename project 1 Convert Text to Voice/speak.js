const textarea = document.querySelector("#text");
let voiceList = document.querySelector("#voice");
let speechBtn = document.querySelector(".submit");

let synth = speechSynthesis;
let isSpeaking = true;

function voicespeech() {
  for (let voice of synth.getVoices()) {
    let option = document.createElement("option");
    option.text = voice.name;
    voiceList.addEventListener(option);
    console.log(option);
  }
}

synth.addEventListener("voiceschanged", voicespeech);

function textToSpeech(text) {
  let utterNance = new SpeechSynthesisUtterance(text);

  for (let voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      utterNance.voice = voice;
    }
  }
  speechSynthesis.speak(utterNance);
}

speechBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (textarea.value != "") {
    if (!synth.speaking) {
      textToSpeech(textarea.value);
    }
    if (textarea.value.length > 80) {
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechBtn.innerHTML = "Pause Speech";
      } else {
        synth.pause();
        isSpeaking = true;
        speechBtn.innerHTML = "Resume Speech";
      }
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechBtn.innerHTML = "Convert To Speech";
        }
      });
    } else {
      speechBtn.innerHTML = "Convert To Speech";
    }
  }
});

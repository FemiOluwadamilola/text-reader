const synt = window.speechSynthesis;
const inputForm = document.querySelector('form');
const textInput = document.querySelector('textarea');
const voiceSelect = document.querySelector('select');

const populateVoiceList = () => {
 voices = synt.getVoices();
 
 for(let i = 0; i < voices.length; i++){
   let option = document.createElement('option');
   option.textContent = voices[i].name + '(' + voices[i].lang + ')';
   if(voices[i].default){
      option.textContent += '--DEFAULT';
   }
   option.setAttribute('data-lang',voices[i].lang);
   option.setAttribute('data-name',voices[i].name);
   voiceSelect.appendChild(option);
 }
} 

populateVoiceList();

if(speechSynthesis.onvoiceschanged !== undefined){
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

inputForm.addEventListener('submit',e => {
  let utterThis = new SpeechSynthesisUtterance(textInput.value);
  let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for(var i = 0; i < voices.length; i++){
    if(voices[i].name === selectedOption){
      utterThis.voice = voices[i];
    }
  }
  synt.speak(utterThis);
  textInput.blur();
  if(textInput.value === ''){
    return;
  }else{
    document.querySelector('button').style.backgroundColor = "green";
  }
   e.preventDefault();
 })
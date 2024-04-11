// index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

// SpeakBot code
const { containerBootstrap, Nlp, LangEn } = window.nlpjs

// shortland function
const el = document.getElementById.bind(document)

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// initialize speech recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = SpeechRecognition ? new SpeechRecognition() : null

// how long to listen before sending the message
const MESSAGE_DELAY = 3000

// timer variable
let timer = null

let recognizing = false

// delay initialization until form is created
setTimeout(async () => {
  const container = await containerBootstrap()
  container.use(Nlp)
  container.use(LangEn)
  const nlp = container.get("nlp")
  nlp.settings.autoSave = false
  nlp.addLanguage("en")

  // Adds the utterances and intents for the NLP
  nlp.addDocument("en", "goodbye for now", "greetings.bye")
  nlp.addDocument("en", "bye bye take care", "greetings.bye")
  nlp.addDocument("en", "okay see you later", "greetings.bye")
  nlp.addDocument("en", "bye for now", "greetings.bye")
  nlp.addDocument("en", "i must go", "greetings.bye")
  nlp.addDocument("en", "hello", "greetings.hello")
  nlp.addDocument("en", "hi", "greetings.hello")
  nlp.addDocument("en", "howdy", "greetings.hello")

  nlp.addDocument("en", "can you help me", "help.request") // New utterance and intent
  nlp.addDocument("en", "help me book an appointment", "help.request")
  nlp.addDocument("en", "book an appointment", "help.request")

  // Train also the NLG
  nlp.addAnswer("en", "greetings.bye", "Till next time")
  nlp.addAnswer("en", "greetings.bye", "see you soon!")
  nlp.addAnswer("en", "greetings.hello", "Hey there!")
  nlp.addAnswer("en", "greetings.hello", "Greetings!")

  nlp.addAnswer("en", "help.request", "Okay, let's get started") // Response for "can you help me" intent
  nlp.addAnswer("en", "help.request", "Sure, let me guide you through it")

  await nlp.train()

  // initialize speech generation
  let synthVoice = null
  if ("speechSynthesis" in window && recognition) {
    // wait until voices are ready
    window.speechSynthesis.onvoiceschanged = () => {
      synthVoice = text => {
        clearTimeout(timer)
        const synth = window.speechSynthesis
        const utterance = new SpeechSynthesisUtterance()
        // select some english voice
        const voice = synth.getVoices().find(voice => {
          return voice.localService && voice.lang === "en-US"
        })
        if (voice) utterance.voice = voice
        utterance.text = text
        synth.speak(utterance)
        timer = setTimeout(onMessage, MESSAGE_DELAY)
      }
    }
  }

  // form submit event
  async function onMessage(event) {
    if (event) event.preventDefault()
    const msg = el("message").value
    el("message").value = ""
    if (!msg) return
    const userElement = document.createElement("div")
    userElement.innerHTML = "<b>User</b>: " + msg
    userElement.style.color = "blue"
    el("history").appendChild(userElement)
    const response = await nlp.process("en", msg)
    const answer = response.answer || "I don't understand."
    const botElement = document.createElement("div")
    botElement.innerHTML = "<b>Bot</b>: " + answer
    botElement.style.color = "green"
    el("history").appendChild(botElement)
    if (synthVoice && recognizing) synthVoice(answer)
  }

  // Add form submit event listener
  document.forms[0].onsubmit = onMessage

  // if speech recognition is supported then add elements for it
  if (recognition) {
    // add speak button
    const speakElement = document.createElement("button")
    speakElement.id = "speak"
    speakElement.innerText = "speak"
    speakElement.style.backgroundColor = "#00abe4"
    speakElement.style.color = "white"
    speakElement.onclick = e => {
      e.preventDefault()
      recognition.start()
    }
    document.forms[0].appendChild(speakElement)

    // add "interim" element
    const interimElement = document.createElement("div")
    interimElement.id = "interim"
    interimElement.style.color = "white"
    document.body.appendChild(interimElement)

    // configure continuous speech recognition
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    // switch to listening mode
    recognition.onstart = function () {
      recognizing = true
      el("speak").style.display = "none"
      el("send").style.display = "none"
      el("message").disabled = true
      el("message").placeholder = "listening..."
    }

    recognition.onerror = function (event) {
      alert(event.error)
    }

    // switch back to type mode
    recognition.onend = function () {
      el("speak").style.display = "inline-block"
      el("send").style.display = "inline-block"
      el("message").disabled = false
      el("message").placeholder = "enter your query"
      el("interim").innerText = ""
      clearTimeout(timer)
      onMessage()
      recognizing = false
    }

    // speech recognition result event;
    // append recognized text to the form input and display interim results
    recognition.onresult = event => {
      clearTimeout(timer)
      timer = setTimeout(onMessage, MESSAGE_DELAY)
      let transcript = ""
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          let msg = event.results[i][0].transcript
          if (!el("message").value) msg = capitalize(msg.trimLeft())
          el("message").value += msg
        } else {
          transcript += event.results[i][0].transcript
        }
      }
      el("interim").innerText = transcript
    }
  }
})

// Main application rendering
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

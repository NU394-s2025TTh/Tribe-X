window.fullTranscript = "";
window.speakerMap = {};  // e.g., { '1': 'Alice' }

function getSpeakerName(id) {
  return window.speakerMap[id] || `Speaker ${id}`;
}

function createSpeakerSpan(speakerId) {
  const span = document.createElement("span");
  span.classList.add("speaker-name");
  span.dataset.speaker = speakerId;
  span.textContent = getSpeakerName(speakerId);
  span.style.cursor = "pointer";
  span.style.fontWeight = "bold";
  span.addEventListener("click", () => {
    const newName = prompt(`Enter a name for Speaker ${speakerId}:`, getSpeakerName(speakerId));
    if (newName && newName.trim()) {
      window.speakerMap[speakerId] = newName.trim();
      updateTranscriptDisplay();
    }
  });
  return span;
}

window.updateTranscriptDisplay = updateTranscriptDisplay;

function updateTranscriptDisplay() {
  const lines = window.fullTranscript.trim().split("\n");
  const container = document.getElementById("transcriptDisplay");
  container.innerHTML = "";
  lines.forEach(line => {
    const match = line.match(/^Speaker (\d+):\s*(.*)/);
    const div = document.createElement("div");
    if (match) {
      const speakerId = match[1];
      const text = match[2];
      const span = createSpeakerSpan(speakerId);
      div.appendChild(span);
      div.appendChild(document.createTextNode(": " + text));
    } else {
      div.textContent = line;
    }
    container.appendChild(div);
  });
}

async function getMicrophone() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream, { mimeType: "audio/webm" });
  } catch (error) {
    console.error("error accessing microphone:", error);
    throw error;
  }
}

async function openMicrophone(microphone, socket) {
  return new Promise((resolve) => {
    microphone.onstart = () => {
      console.log("client: microphone opened");
      document.body.classList.add("recording");
      window.fullTranscript = "";
      document.getElementById("transcriptDisplay").textContent = "Recording in progress...";
      resolve();
    };

    microphone.onstop = () => {
      console.log("client: microphone closed");
      document.body.classList.remove("recording");
      // Show editable transcript after recording stops
      showEditableTranscript();
    };

    microphone.ondataavailable = (event) => {
      if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
        socket.send(event.data);
      }
    };

    microphone.start(1000);
  });
}

async function closeMicrophone(microphone) {
  microphone.stop();
}

async function start(socket) {
  const listenButton = document.querySelector("#record");
  let microphone;

  listenButton.addEventListener("click", async () => {
    if (!microphone) {
      try {
        microphone = await getMicrophone();
        await openMicrophone(microphone, socket);
      } catch (error) {
        console.error("error opening microphone:", error);
      }
    } else {
      await closeMicrophone(microphone);
      microphone = undefined;
    }
  });
}

window.addEventListener("load", () => {
  const transcriptDisplay = document.getElementById("transcriptDisplay");
  transcriptDisplay.textContent = "Recording not started.";

  const protocol = location.protocol === "https:" ? "wss" : "ws";
  const socket = new WebSocket(`${protocol}://${location.host}`);

  socket.addEventListener("open", async () => {
    console.log("client: connected to server");
    await start(socket);
  });

  socket.addEventListener("message", (event) => {
    if (!event.data) return;

    let data;
    try {
      data = JSON.parse(event.data);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return;
    }

    if (data?.channel?.alternatives?.length > 0) {
      const words = data.channel.alternatives[0].words;
      if (words && words.length > 0) {
        let currentSpeaker = words[0].speaker;
        let transcriptLine = `Speaker ${currentSpeaker}: `;
        let contextWords = [];

        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          if (word.speaker !== currentSpeaker) {
            window.fullTranscript += transcriptLine.trim() + "\n";
            currentSpeaker = word.speaker;
            transcriptLine = `Speaker ${currentSpeaker}: `;
            contextWords = [];
          }
          const finalWord = word.punctuated_word || word.word;
          transcriptLine += finalWord + " ";
          contextWords.push(word.word.toLowerCase());
          // only keep last 6 words for necessary context
          if (contextWords.length > 6) {
            contextWords.shift();
          }
          // detect phrases like "my name is ___"
          const contextText = contextWords.join(" ");
          const match = contextText.match(/(?:my name is)\s+([a-z]+)/i);
          if (match) {
            const name = match[1].charAt(0).toUpperCase() + match[1].slice(1);
            window.speakerMap[currentSpeaker] = name;
          }
        }

        window.fullTranscript += transcriptLine.trim() + "\n";
        updateTranscriptDisplay();
      }
    }
  });

  window.downloadTranscript = function downloadTranscript() {
    let vttContent = "WEBVTT\n\n";
    let currentTime = 0;
    const lines = window.fullTranscript.trim().split("\n");
    const secondsPerLine = 5;

    lines.forEach((line) => {
      const match = line.match(/^Speaker (\d+):\s*(.*)/);
      const start = new Date(currentTime * 1000).toISOString().substr(11, 12);
      const end = new Date((currentTime + secondsPerLine) * 1000).toISOString().substr(11, 12);
      if (match) {
        const speakerId = match[1];
        const speakerText = match[2];
        vttContent += `${start} --> ${end}\n${getSpeakerName(speakerId)}: ${speakerText}\n\n`;
      } else {
        vttContent += `${start} --> ${end}\n${line}\n\n`;
      }
      currentTime += secondsPerLine;
    });

    const blob = new Blob([vttContent], { type: "text/vtt" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcript.vtt";
    a.click();
    URL.revokeObjectURL(url);
  };

  socket.addEventListener("close", () => {
    console.log("client: disconnected from server");
  });
});

function showEditableTranscript() {
  const container = document.getElementById("transcriptDisplay");
  container.innerHTML = "";
  const textarea = document.createElement("textarea");
  textarea.id = "editableTranscript";
  textarea.style.width = "100%";
  textarea.style.height = "300px";
  textarea.value = window.fullTranscript.trim();
  container.appendChild(textarea);

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.style.marginTop = "10px";
  saveBtn.onclick = function() {
    window.fullTranscript = textarea.value;
    updateTranscriptDisplay();
  };
  container.appendChild(document.createElement("br"));
  container.appendChild(saveBtn);
}

window.showEditableTranscript = showEditableTranscript;

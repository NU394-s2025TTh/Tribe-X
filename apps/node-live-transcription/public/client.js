const captions = window.document.getElementById("captions");

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
      resolve();
    };

    microphone.onstop = () => {
      console.log("client: microphone closed");
      document.body.classList.remove("recording");
    };

    microphone.ondataavailable = (event) => {
      console.log("client: microphone data received");
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

  console.log("client: waiting to open microphone");

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
  const socket = new WebSocket("ws://localhost:3000");

  socket.addEventListener("open", async () => {
    console.log("client: connected to server");
    await start(socket);
  });

  socket.addEventListener("message", (event) => {
    if (event.data === "") {
      return;
    }
    
    let data;
    try {
      data = JSON.parse(event.data);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return;
    }
  
    if (data && data.channel && data.channel.alternatives.length > 0) {
      const words = data.channel.alternatives[0].words;
      
      if (words && words.length > 0) {
        //group words by speaker
        let currentSpeaker = words[0].speaker;
        let display = `<div><strong>Speaker ${currentSpeaker}:</strong> `;
    
        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          if (word.speaker !== currentSpeaker) {
            display += `</div><div><strong>Speaker ${word.speaker}:</strong> `;
            currentSpeaker = word.speaker;
          }
          display += word.punctuated_word ? `${word.punctuated_word} ` : `${word.word} `;
        }
    
        display += "</div>";
        captions.innerHTML = display;
      }
    }
  });

  socket.addEventListener("close", () => {
    console.log("client: disconnected from server");
  });
});
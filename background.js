// background.js

chrome.action.onClicked.addListener(async (tab) => {
    // Get access to the user's microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];
  
    // Start recording audio
    mediaRecorder.start();
    mediaRecorder.addEventListener("dataavailable", (e) => {
      chunks.push(e.data);
    });
  
    mediaRecorder.addEventListener("stop", async () => {
      // Combine the recorded audio chunks into a single Blob
      const audioBlob = new Blob(chunks, { type: "audio/webm" });
  
      // Convert Blob to base64 string
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(",")[1];
  
        // Send the audio data to the transcription API
        // const transcription = await transcribeAudio(base64Audio);
  
        // Use the transcribed text as needed (e.g., store, display, etc.)
        // console.log(transcription);
      };
    });
  
    // Stop recording after 5 seconds (you can adjust the duration)
    setTimeout(() => {
      mediaRecorder.stop();
    }, 5000);
  });
  
  // async function transcribeAudio(base64Audio) {
  //   // Send a POST request to your transcription API
  //   const response = await fetch("https://your-transcription-api.com/transcribe", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ audio: base64Audio }),
  //   });
  
  //   // Parse the response and extract the transcribed text
  //   const data = await response.json();
  //   return data.transcription;
  // }
  
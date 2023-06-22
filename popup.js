// popup.js

document.addEventListener("DOMContentLoaded", () => {
    const transcribeBtn = document.getElementById("transcribeBtn");
    transcribeBtn.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          function: startTranscription,
        });
      });
    });
  });
  
  function startTranscription() {
    chrome.runtime.sendMessage({ action: "transcribe" });
  }
  
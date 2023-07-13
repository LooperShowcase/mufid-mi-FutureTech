let conversationhistory;
conversationhistory = [
  { role: "user", content: "hi my name is mufid" },
  { role: "assistant", content: "hello mufid how can i help you today" },
];
async function conversationUserAdd(question, happiness) {
  conversationhistory.push({
    role: "user",
    content:
      "My Happiness out of 10: " +
      happiness +
      " . " +
      "My input is: " +
      question,
  });
}
async function conversationAssistantAdd(answer) {
  conversationhistory.push({ role: "Assistant", content: answer });
}
async function GPT_talk(question) {
  var data = {
    model: "gpt-3.5-turbo",
    messages: conversationhistory,
  };
  var url = "https://api.openai.com/v1/chat/completions";
  var apiKey = "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";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const message = responseData.choices[0].message.content;
      console.log(message);

      conversationAssistantAdd(message); // Add GPT's response to the conversation history

      const utterance = new SpeechSynthesisUtterance(message); // Create the audio object
      speechSynthesis.speak(utterance); // Play the audio
      return message;
    } else {
      console.log("Request failed with status:", response.status);
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

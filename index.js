import { client } from "openai";
import * as readline from "readline";

// Get the API key from the environment variable
const API_KEY = process.env.OPENAI_API_KEY;

const openaiClient = client({ apiKey: API_KEY });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function chatWithAI() {
  rl.question("What do you want to say to the AI? ", (input) => {
    if (input === "") {
      // Exit the chat if the user didn't enter any input
      console.log("Goodbye!");
      rl.close();
      return;
    }

    openaiClient.completions
      .create({
        engine: "text-davinci-002",
        prompt: input,
        max_tokens: 2048,
        n: 1,
        temperature: 0.5,
      })
      .then((response) => {
        const responseText = response.data.choices[0].text;
        console.log(`AI: ${responseText}`);
        chatWithAI();
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

chatWithAI();

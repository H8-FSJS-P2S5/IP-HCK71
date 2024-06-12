// openaiClient.js

async function openAI(phone1, phone2) {
  const response = await fetch("/foxy-tech", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone1, phone2 }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data from OpenAI");
  }

  const data = await response.json();
  return data;
}

export { openAI };

const { OpenAI } = require("openai");
require("dotenv").config();

module.exports = async function openAI(phone1, phone2) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `please give me a specification, plus and minus of ${phone1} vs ${phone2}. the response must be a JSON. the format is like this
    {
        "phone1": {
            "name": "iPhone 15",
            "specification": {
                ...
            },
            plus: [
                ...
            ],
            minus: [
                ...
            ]
        },
        "phone2": {
          "name": "Samsung Galaxy S24 Ultra",
          "specification": {
              ...
          },
          plus: [
              ...
          ],
          minus: [
              ...
          ]
      }
    }`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
};

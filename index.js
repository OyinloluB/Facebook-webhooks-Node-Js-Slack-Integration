const Axios = require("axios");
const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;
// start server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Welcome");
});

// GET route to register the callback URL with Facebook.
app.get("/webhook", (req, res) => {

  const VERIFY_TOKEN = "EAAE1n3c63ggBAMnVNlAyI8TWC4HmZCLbgg2SNRbA9tALZC07MEOWEyGjdAs9a5N51w3doLQBElpbf2OfPxwIUtyOuGFeNaHgj07ZBNVH0jxbC0YfliiFNjEPKyBobndwuyZANUo02xkwiS2SypMeoaehvdfJT18KxrO2ZCIYNIfGLQVcZC4A84";
  // Parse the query params
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

// POST route to handle webhook calls.
app.post("/webhook", async (req, res) => {
  try {
    console.log(req.body.entry);

    // Send message received from webhooks to slack channel
//     await Axios.post(
//       `https://hooks.slack.com/services/${process.env.SLACK_WEB_HOOK}`,
//       {
//         blocks: [
//           {
//             type: "section",
//             text: {
//               type: "mrkdwn",
//               text: `${req.body.entry[0].changes[0].value.error_message}`,
//             },
//           },
//         ],
//       }
//     );

    res.status(200).end();
  } catch (error) {
    console.error(error);
  }
});

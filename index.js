const express = require("express");

const { DISCORDMONKCHANNEL } = require("dotenv").config;

const { discordURL } = require("./hidden");

const app = express();

app.use(express.json());

const fetch = require("node-fetch");

app.post("/updatedProduct", (req, res) => {
  console.dir(req.body.title);
  const discordPayload = {
    content: `${req.body.title} was updated!`,
    embeds: [
      {
        author: {
          name: `${req.body.title}`,
          vendor: `${req.body.vendor}`,
          icon_url: "https://i.imgur.com/R66g1Pe.jpg",
        },
        title: `${req.body.title}`,
        url: "https://google.com/",
        description:
          "Text message. You can use Markdown here. *Italic* **bold** __underline__ ~~strikeout~~ [hyperlink](https://google.com) `code`",
        color: 15258703,
        fields: [
          {
            name: "Price",
            value: `$${req.body.variants[1].price}`,
            inline: true,
          },
          {
            name: "Fulfillment Service",
            value: `${req.body.variants[1].fulfillment_service}`,
            inline: true,
          },
          {
            name: 'Use `"inline": true` parameter, if you want to display fields in the same line.',
            value: "okay...",
          },
          {
            name: "Thanks Ben!",
            value: "You're welcome :wink:",
          },
        ],
        thumbnail: {
          url: "https://upload.wikimedia.org/wikipedia/commons/3/38/4-Nature-Wallpapers-2014-1_ukaavUI.jpg",
        },
        image: {
          url: "https://upload.wikimedia.org/wikipedia/commons/5/5a/A_picture_from_China_every_day_108.jpg",
        },
        footer: {
          text: "Woah! Ben is so cool! :wink:",
          icon_url: "https://i.imgur.com/fKL31aD.jpg",
        },
      },
    ],
  };

  fetch(discordURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(discordPayload),
  })
    .then((response) => {
      // Check the status code of the response to make sure it was successful
      if (response.status === 200) {
        console.log("Webhook sent successfully");
      } else {
        console.error("Error sending webhook:", response.status);
      }
    })
    .catch((error) => {
      // Catch any errors that occurred in the `fetch` or in processing the response
      console.error("Error sending webhook:", error);
    });

  res.send(console.log(`${discordPayload}`));
});

app.listen(8180, () => {
  console.log("listening for product updates...");
});

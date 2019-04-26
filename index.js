const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/index");
const FacebookBeamer = require("./helpers/index");

const app = express();
const PORT = process.env.PORT || 3000;
const f = new FacebookBeamer(config.facebook);

app.get("/", (req, res) => f.registerHook(req, res));
app.post(
  "/",
  bodyParser.json({
    verify: f.verifySignature.call(f)
  })
);
app.post("/", (req, res, next) => {
  // Messages will be received here if the signature goes through
  // we will pass the messages to FBeamer for parsing
  return f.incoming(req, res, async data => {
    console.log(data);
    try {
      if (data.type === "text") {
        // await f.txt(data.sender, 'Hi all')
        switch (data.content.toLowerCase()) {
          case "hi":
            await f.txt(data.sender, "Hi dear guest too");
            break;
          case "hello":
            await f.txt(data.sender, "Hello");
            break;
          case "gift ideas":
            await f.sendPermnamentMenu(data.sender, "search=gifts");
            break;
          case "tvs":
            await f.sendPermnamentMenu(data.sender, "search=tv");
            break;
          case "tv & home theater":
            await f.sendPermnamentMenu(
              data.sender,
              "search=tv&search=home&search=theater"
            );
            break;
          case "all flat-screen tvs":
            await f.sendPermnamentMenu(
              data.sender,
              "search=all&search=flat-screen&search=tvs"
            );
            break;
          case "tv/dvd combos":
            await f.sendPermnamentMenu(
              data.sender,
              "search=tv&search=dvd&search=combos"
            );
            break;
          case "shop":
            await f.sendProductCatalog(data.sender);
            break;
          default:
            await f.txt(data.sender, "Welcome to our shop");
        }
      } else if (data.postback.title) {
        switch (data.postback.title.toLowerCase()) {
          case "product catalog":
            await f.sendProductCatalog(data.sender);
            break;
          case "main menu":
          case "get started":
            await f.sendGetStarted(data.sender);
            break;
        }
      }
    } catch (e) {
      console.warn("app.post", e);
    }
  });
});
app.listen(PORT, () =>
  console.log(`FBeamer Bot Service running on Port ${PORT}`)
);

const express = require("express");
const app = express();
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`listening on port: ${port}`));

app.get("/", (request, response) => {
  response.send("We Did it!");
});

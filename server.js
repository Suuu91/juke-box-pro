const express = require ("express");
const app = express();
const PORT = 3000;

app.use(require("morgan")("dev"));
app.use(express.json());

app.use(require("./api/auth").router)
app.use("/tracks", require("./api/tracks"))
app.use("/playlists", require("./api/playlists"))

app.use((req, res, next) => {
  next({
    status: 404,
    message: "Not found"
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).json(err.message ?? "Something went wrong")
});

app.listen((PORT), () => {
  console.log(`listening on port ${PORT}`)
});


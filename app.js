const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();

const dbPath = path.join(__dirname, "cricketTeam.db");

const db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost/3000/");
    });
  } catch (e) {
    console.log(`DB error ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/players/", async (request, response) => {
  const books = `
    SELECT
      *
    FROM
      players
    ORDER BY
      player_id;`;
  const booksArray = await db.all(books);
  response.send(booksArray);
});

app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const books = `
    SELECT *
    FROM
    players
    WHERE
    player_id=${playerId};
    `;
  const player = await db.get(books);
  response.send(player);
});

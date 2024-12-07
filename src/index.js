require('dotenv').config();
const PORT = process.env.PORT || 5000;

const express = require('express');

const usersRoute = require('./routes/users.js');

const middlewareLogRequest = require('./middleware/log.js');

const app = express();

app.use(middlewareLogRequest);
app.use(express.json());

app.use("/user", usersRoute);

app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
})
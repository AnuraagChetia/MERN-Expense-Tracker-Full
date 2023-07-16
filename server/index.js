const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const sequelize = require("./util/database");

const expenses = require("./model/expense");
const user = require("./model/user");
const order = require("./model/order");
const download = require("./model/download");
const forgetPasswordRequests = require("./model/forgetPasswordRequests");

const app = express();

//logfile
const accessLogStream = fs.createWriteStream("access.log", { flags: "a" });

//defaults
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));

const port = 3000;

const userRouter = require("./routes/user");
const expenseRouter = require("./routes/expense");
const orderRouter = require("./routes/order");
const leaderBoardRouter = require("./routes/leaderboard");
const passwordRouter = require("./routes/password");

//Relations
user.hasMany(expenses);
expenses.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

user.hasMany(forgetPasswordRequests);
forgetPasswordRequests.belongsTo(user);

user.hasMany(download);
download.belongsTo(user);

// Routes
const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/dist");

app.use(express.static(buildPath));
app.use("/users", userRouter);
app.use("/expense", expenseRouter);
app.use("/order", orderRouter);
app.use("/leaderboard", leaderBoardRouter);
app.use("/password", passwordRouter);
app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, `../client/dist/index.html`),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

sequelize
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

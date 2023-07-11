const express = require("express");
const app = express();
const port = 3000;

const cookieParser = require("cookie-parser");

const indexRouter = require("./routes/index.js");
app.use(express.json());
app.use(cookieParser());

app.use("/api", indexRouter);
app.use((err, req, res, next) => {
  console.error(error);
  res.status(500).send("알 수 없는 에러가 발생하였습니다.");
});

app.listen(port, () => {
  console.log(port, "번 포트로 서버가 실행되었습니다.");
});

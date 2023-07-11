const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const UserController = require("../controllers/user.controller");
const userController = new UserController();
router.post("/login", userController.login);
router.post("/signup", userController.signUp);

// 회원가입
// router.post("/signup", async (req, res) => {
//   const { nickname, email, password, confirmPassword } = req.body;
//   const nicknameCheck = /[a-zA-Z0-9]{3,}$/;
//   if (!nicknameCheck.test(nickname)) {
//     return res.status(412).json({
//       errorMessage: "닉네임 형식이 일치하지 않습니다.",
//     });
//   }
//   const pwCheck = new RegExp(`^(?!.*${nickname}).{4,}$`);
//   if (!pwCheck.test(password)) {
//     return res.status(412).json({
//       errorMessage: "패스워드 형식이 일치하지 않습니다.",
//     });
//   }

//   const existingUser = await Users.findOne({
//     where: {
//       [Op.or]: [{ nickname: nickname }, { email: email }],
//     },
//   });

//   if (existingUser) {
//     if (nickname === existingUser.nickname) {
//       res.status(409).json({ errMessage: "이미 존재하는 닉네임입니다." });
//       return;
//     } else if (email === existingUser.email) {
//       res.status(409).json({ errMessage: "이미 존재하는 이메일입니다." });
//       return;
//     }
//   } else {
//     if (password !== confirmPassword) {
//       return res
//         .status(409)
//         .json({ errMessage: "비밀번호를 확인하여 주십시오." });
//     }

//     const result = await Users.create({ nickname, email, password });
//     res.status(201).json({
//       message: "회원 가입에 성공하였습니다.",
//       data: result,
//     });
//   }
// });

// 로그인

// router.post("/login", async (req, res) => {
//   const { nickname, password } = req.body;
//   const user = await Users.findOne({ where: { nickname: nickname } });
//   if (!user) {
//     return res.status(409).json({
//       errMessage: "가입되지 않은 아이디입니다. 아이디를 확인해주세요.",
//     });
//   } else if (password !== user.password) {
//     return res
//       .status(409)
//       .json({ errMessage: "비밀번호를 확인하여 주십시오." });
//   }

//   const token = jwt.sign(
//     {
//       userId: user.userId,
//     },
//     "customized-secret-key"
//   );
//   res.cookie("Authorization", `Bearer ${token}`);
//   return res.json({ message: "로그인 완료" });
// });

module.exports = router;

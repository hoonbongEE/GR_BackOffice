const express = require("express");
const { Users } = require("../models");
const router = express.Router();

router.get("/profile/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Users.findOne({
      where: { userId },
    });

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const { role, nickname, address, phone, photo, specialNote, career } = user;

    if (role === "guest") {
      return res.render("guest-profile", {
        nickname,
        address,
        phone,
        photo,
        specialNote,
      });
    } else if (role === "sitter") {
      return res.render("sitter-profile", {
        nickname,
        phone,
        photo,
        career,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "서버 에러" });
  }
});

module.exports = router;

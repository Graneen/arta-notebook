const express = require("express");

const router = express.Router();
const { Post } = require("../../db/models");


router.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "text", "createdAt", "updatedAt"],
    });
    const dataPosts = JSON.parse(JSON.stringify(posts));
    res.send({ dataPosts });
  } catch (error) {
    console.log("ERROR WHILE GET POSTS ARRAY: ", error);
    res.status(500).json({ message: "Error while get posts list" });
  }
});

module.exports = router;

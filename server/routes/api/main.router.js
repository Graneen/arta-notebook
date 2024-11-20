const express = require("express");

const router = express.Router();
const { Post } = require("../../db/models");


router.get("/api/notes", async (req, res) => {
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

router.post("/api/notes/add", async (req, res) => {
  try {
    const { text } = req.body;
    const newNote= await Post.create({ text });
    return res.json(newNote); 
  } catch (error) {
    console.log("ERROR WHILE ADD POST: ", error);
    res.status(500).json({ message: "Error while add post" });
  }
});

router.put("/api/notes/:id", async (req, res) => {
  try {
    const { id, text } = req.body;
    const redact = await Post.findByPk(id);
    const redNote = await redact.update({ text });
    return res.json(redNote); 
  } catch (error) {
    console.log("ERROR WHILE ADD POST: ", error);
    res.status(500).json({ message: "Error while add post" });
  }
});

router.delete("/api/notes/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Post.destroy({where: { id: Number(id) }});
    return res.status(209); 
  } catch (error) {
    console.log("ERROR WHILE ADD POST: ", error);
    res.status(500).json({ message: "Error while add post" });
  }
});


module.exports = router;

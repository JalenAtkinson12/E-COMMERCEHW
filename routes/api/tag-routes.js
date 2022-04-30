const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tData = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
          attributes: ["product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.status(200).json(tData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
          attributes: ["product_name", "price", "stock", "category_id"],
        },
      ],
    });

    if (!tData) {
      res.status(404).json({ message: "NO TAG LINKED WITH ID" });
      return;
    }
    res.status(200).json(tData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const tData = await Tag.create(req.body);
    res.status(200).json(tData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!tData) {
      res.status(404).json({ message: "NO TAG LINKED WITH ID" });
      return;
    }
    res.status(200).json(tData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tData) {
      res.status(404).json({ message: "NO TAG LINKED WITH ID" });
      return;
    }
    res.status(200).json(tData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

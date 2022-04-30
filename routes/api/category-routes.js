const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const cDATA = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ["product_name", "price", "stock"],
        }
      ]
    });
    res.status(200).json(cDATA);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cDATA = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["product_name", "price", "stock"],
        }
      ]
    });
    if (!cDATA) {
      res.status(404).json({message: 'NO CATEGORY WITH THIS ID'});
      return;
    }
    res.status(200).json(cDATA);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/',  async(req, res) => {
   try {
     const cDATA = await Category.create(
       {
         category_name: req.body.category_name,
       },
     );
     res.status(200).json(cDATA);
   } catch (err) {
     res.status(400).json(err);
   }
});

router.put('/:id', async (req, res) => {
   try {
     const cDATA = await Category.update(
       {
         category_name: req.body.category_name,
       },
       {
         where: {
           id: req.params.id,
         }
       },
     );

     if (!cDATA) {
       res.status(400).json({message: 'NO CATEGORY WITH THIS ID'});
       return;
     }
     res.status(200).json(cDATA);
   } catch (err) {
     res.status(500).json(err);
   }
});

router.delete('/:id', async (req, res) => {
   try {
     const cDATA = await Category.destroy({
       where: {
         id: req.params.id
       }
     });
     if (!cDATA) {
       res.status(404).json({message: 'NO CATEGORY WITH THIS ID'});
       return;
     }
     res.status(200).json(cDATA);
   } catch (err) {
     res.status(500).json(err);
   }
});

module.exports = router;

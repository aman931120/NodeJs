const express = require('express');
const router = express.Router();


const MenuItem = require('../models/Menu');
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // create a new person document using the Mongoose model
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/:menuType', async (req,res) => { 
    const menuType = req.params.menuType;
    try {
        if(menuType == 'sweet' || menuType == 'sour' || menuType=='spicy'){
            const response = await MenuItem.find({taste: menuType})
            console.log("Feteched");
            res.status(200).json(response);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

module.exports = router;
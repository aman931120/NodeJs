const express = require('express');
const router = express.Router();

const Person = require("../models/person"); 

// POST method to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // create a new person document using the Mongoose model
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:workType", async (req, res) => {
  const workType = req.params.workType;
  // above we are extracting the work type from the URL parameter

  try {
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      // ye teeno hoga tabhi hum database mai operation perform karenge nhi toh time waste nhi karenge hum

      const response = await Person.find({ work: workType });
      console.log("Feteched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put('/:id',async (req,res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId,updatedPersonData, {
      new: true,  // return the updated element
      runValidators: true   // run mongoose validation
    });

    if (!response) {
      return res.status(404).json({error: 'Person not found'});
    }

    console.log("Data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

router.delete('/:id', async (req,res) => {
  const personId = req.params.id;
  try {
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data deleted");
    res.status(200).json({message: 'person Deleted successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router;
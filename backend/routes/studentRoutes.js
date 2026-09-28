const express = require("express");
const Student = require("../models/Student");

const router = express.Router();


// GET all students
router.get("/", async (req, res) => {

    try {

        const students = await Student.find();

        res.json(students);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch students"
        });

    }

});


// ADD student
router.post("/", async (req, res) => {

    try {

        console.log("Received data:");
        console.log(req.body);

        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            course: req.body.course
        });

        const savedStudent = await student.save();

        console.log("Student saved:");
        console.log(savedStudent);

        res.status(201).json(savedStudent);

    } catch (error) {

        console.log("ERROR:");
        console.log(error);

        res.status(500).json({
            message: "Failed to add student",
            error: error.message
        });

    }

});


router.put("/:id", async (req, res) => {

    try {

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedStudent);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to update student",
            error: error.message
        });

    }

});

// DELETE student
router.delete("/:id", async (req, res) => {

    try {

        const deletedStudent = await Student.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Student deleted successfully",
            student: deletedStudent
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to delete student",
            error: error.message
        });

    }

});

module.exports = router;
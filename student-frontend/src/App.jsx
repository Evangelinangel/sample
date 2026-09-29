import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
const API_URL = import.meta.env.VITE_API_URL;
function App() {

    const [students, setStudents] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        course: ""
    });

    const [editingId, setEditingId] = useState(null);


    // Get students
    const fetchStudents = async () => {

        try {

            const response = await axios.get(`${API_URL}/students`)

            setStudents(response.data);

        } catch (error) {

            console.log(error);

        }
    };


    useEffect(() => {

        fetchStudents();

    }, []);


    // Handle input
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // Add / Update student
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await axios.put(
    `${API_URL}/students/${editingId}`,
                    formData
                );

                setEditingId(null);

            } else {

                await axios.post(
    `${API_URL}/students`,
                    formData
                );

            }

            setFormData({
                name: "",
                email: "",
                age: "",
                course: ""
            });

            fetchStudents();

        } catch (error) {

            console.log(error);

        }
    };


    // Edit
    const handleEdit = (student) => {

        setFormData({
            name: student.name,
            email: student.email,
            age: student.age,
            course: student.course
        });

        setEditingId(student._id);

    };


    // Delete
    const handleDelete = async (id) => {

        try {

            await axios.delete(
    `${API_URL}/students/${id}`
)

            fetchStudents();

        } catch (error) {

            console.log(error);

        }
    };


    return (

        <div className="container">

            <h1>Student Management System</h1>


            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Student Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="course"
                    placeholder="Course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                />

                <button type="submit">

                    {editingId ? "Update Student" : "Add Student"}

                </button>

            </form>


            <h2>Students</h2>


            <table>

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Course</th>
                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                    {students.map((student) => (

                        <tr key={student._id}>

                            <td>{student.name}</td>

                            <td>{student.email}</td>

                            <td>{student.age}</td>

                            <td>{student.course}</td>

                            <td>

                                <button
                                    onClick={() =>
                                        handleEdit(student)
                                    }
                                >
                                    Edit
                                </button>


                                <button
                                    onClick={() =>
                                        handleDelete(student._id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default App;
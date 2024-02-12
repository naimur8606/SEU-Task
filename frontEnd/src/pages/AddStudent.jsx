import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useRef, useState } from "react";


const AddStudent = () => {
    const axiosPublic = useAxiosPublic()
    const [loader, setLoader] = useState(false)
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        setLoader(true)
        e.preventDefault();
        const form = e.target;
        const student = {
            name: form.FName.value + " " + form.LName.value,
            email: form.email.value,
            number: form.number.value,
            address: form.address.value,
            department: form.department.value,
            selectedCourses: [],

        }
        console.log(student)
        axiosPublic.post('/students', student)
            .then(data => {
                if (data.data.insertedId) {
                    Swal.fire({
                        title: 'Add Successfully!',
                        text: `Name: ${student?.name}`,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    setLoader(false)
                    formRef.current.reset();
                }else{
                    Swal.fire({
                        title: 'Warning!',
                        text: `${data.data}`,
                        icon: 'warning',
                        confirmButtonText: 'Ok'
                    })
                    setLoader(false)
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Warning!',
                    text: `${error.message}`,
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                })
                setLoader(false)
            })
    }
    return (
        <div className="px-5 my-10">
            <h2 className="text-center text-4xl font-bold mb-5">Add new Student</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 mt-8 lg:w-4/5 mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-full lg:w-1/2">
                        <label className="text-lg font-bold">First Name:</label><br />
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            required
                            name="FName"
                            className="border mt-1 p-2 rounded-lg w-full lg:w-4/5" />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <label className="text-lg font-bold">Last Name:</label><br />
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            required
                            name="LName"
                            className="border mt-1 p-2 rounded-lg w-full lg:w-4/5" />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-full lg:w-1/2">
                        <label className="text-lg font-bold">Phone Number:</label><br />
                        <input
                            type="number"
                            placeholder="Enter Phone Number"
                            required
                            name="number"
                            className="border mt-1 p-2 rounded-lg w-full lg:w-4/5" />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <label className="text-lg font-bold">Department:</label><br />
                        <select name="department" id="" className="border mt-1 p-2 rounded-lg w-full lg:w-4/5" required>
                            <option value="CSE">CSE</option>
                            <option value="EEE">EEE</option>
                            <option value="BBA">BBA</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-full lg:w-1/2">
                        <label className="text-lg font-bold">Email:</label><br />
                        <input
                            type="email"
                            placeholder="Enter Email"
                            required
                            name="email"
                            className="border mt-1 p-2 rounded-lg w-full lg:w-4/5" />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <label className="text-lg font-bold">Address:</label><br />
                        <input
                            type="text"
                            placeholder="Enter Address"
                            required
                            name="address"
                            className="border mt-1 p-2 rounded-lg w-full lg:w-4/5" />
                    </div>
                </div>
                <button type="submit" className="flex items-center text-xl bg-[#FECD28] py-2 px-4 rounded-md">
                    <span>{loader || "Add Student"}</span>
                    {
                        loader && <p className="border-t rounded-xl border-black border-solid w-4 h-4 animate-spin"></p>
                    }
                </button>
            </form>
        </div>
    );
};

export default AddStudent;
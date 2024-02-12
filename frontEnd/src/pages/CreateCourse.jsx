import { useRef, useState } from "react";
import { } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const CreateCourse = () => {
    const axiosPublic = useAxiosPublic()
    const [loader, setLoader] = useState(false)
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        setLoader(true)
        e.preventDefault();
        const form = e.target;
        const course = {
            title: form.title.value,
            code: form.code.value,
            credit: form.credit.value,

        }
        axiosPublic.post('/courses', course)
            .then(data => {
                if (data.data.insertedId) {
                    Swal.fire({
                        title: 'Add Successfully!',
                        text: `Name: ${course?.title}`,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    setLoader(false)
                    formRef.current.reset();
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
            <h2 className="text-center text-4xl font-bold mb-5">Create New Course</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 mt-8 lg:w-4/5 mx-auto">
                    <div className="w-full">
                        <label className="text-lg font-bold">Course Title:</label><br />
                        <input
                            type="text"
                            placeholder="Enter Course Name"
                            required
                            name="title"
                            className="border mt-1 p-2 rounded-lg w-full " />
                    </div>
                <div className="flex flex-col lg:flex-row justify-between items-center">
                <div className="w-full lg:w-1/2">
                        <label className="text-lg font-bold">Course Code:</label><br />
                        <input
                            type="text"
                            placeholder="Enter Course Code"
                            required
                            name="code"
                            className="border mt-1 p-2 rounded-lg w-full " />
                    </div>
                    <div className="w-full lg:w-1/2 lg:pl-3">
                        <label className="text-lg font-bold">Course Credit:</label><br />
                        <input
                            type="number"
                            placeholder="Enter Course Credit"
                            required
                            name="credit"
                            className="border mt-1 p-2 rounded-lg w-full " />
                    </div>
                </div>
                <button type="submit" className="flex items-center text-xl bg-[#FECD28] py-2 px-4 rounded-md">
                    <span>{loader || "Create Course"}</span>
                    {
                        loader && <p className="border-t rounded-xl border-black border-solid w-4 h-4 animate-spin"></p>
                    }
                </button>
            </form>
        </div>
    );
};

export default CreateCourse;
import { } from "react-icons/ai";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const SetCredit = () => {
    const axiosPublic = useAxiosPublic()
    const [loader, setLoader] = useState(false)
    const formRef = useRef(null);
    const handleSubmit = async (e) => {
        setLoader(true)
        e.preventDefault();
        const form = e.target;
        const course = {
            name: form.name.value,
            credit: form.credit.value,

        }
        axiosPublic.post('/semesterCredit', course)
            .then(data => {
                if (data.data.insertedId) {
                    Swal.fire({
                        title: 'Add Successfully!',
                        text: `Name: ${course?.name}`,
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
        <div className="center">
            <form ref={formRef} onSubmit={handleSubmit} className="shadow-xl rounded-lg p-5 space-y-3">
                <div className="space-y-2">
                    <label className="">
                        <span className="text-xl font-semibold">Semester Name*</span>
                    </label><br />
                    <input
                    name="name"
                        type="text"
                        placeholder="Enter Credit"
                        required
                        className="" />
                </div>
                <div className=" space-y-2">
                    <label className="">
                        <span className="text-xl font-semibold">Maximum Credit for this semester*</span>
                    </label><br />
                    <input
                    name="credit"
                        type="number"
                        placeholder="Enter Credit"
                        required
                        className="" />
                </div>
                <button type="submit" className="flex items-center text-xl bg-[#FECD28] mt-5 py-2 px-4 rounded-md">
                    <span>{loader || "Create Course"}</span>
                    {
                        loader && <p className="border-t rounded-xl border-black border-solid w-4 h-4 animate-spin"></p>
                    }
                </button>
            </form>
        </div>
    );
};

export default SetCredit;
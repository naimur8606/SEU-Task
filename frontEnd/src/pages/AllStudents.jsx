import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const AllStudents = () => {
    const axiosPublic = useAxiosPublic()
    const [students, setStudents] = useState([])
    useEffect(()=>{
        axiosPublic.get(`/students`)
        .then(res => setStudents(res?.data))
    },[axiosPublic])
    console.log(students)
    return (
        <div className="lg:w-4/5 mx-auto my-10">
            <div>
                <h2 className="text-4xl font-medium p-3">Total Students: {students.length}</h2>
            </div>
            <div className="">
                {
                    students?.map((student, idx) =>
                        <div key={idx} className="shadow-md rounded-md p-3 my-2">
                            <div className="flex flex-col md:flex-row justify-between py-2">
                                <div className="w-full md:w-1/2 space-y-2">
                                    <h5 className="font-bold text-xl">Name: {student?.name}</h5>
                                    <p className="font-semibold">Email: {student?.email}</p>
                                </div>
                                <div className="w-full md:w-1/2 space-y-2">
                                    <h5 className="font-bold">Department: {student?.department}</h5>
                                    <p className="font-semibold">Phone: {student?.number}</p>
                                </div>
                            </div>
                                <div className="font-medium">
                                   Address: {student?.address}
                                    </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AllStudents;
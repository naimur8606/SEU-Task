import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { IoAdd } from "react-icons/io5";
import Swal from "sweetalert2";

const Registration = () => {
    const axiosPublic = useAxiosPublic();
    const [loader, setLoader] = useState(false)
    const [allSemester, setAllSemester] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [searchStudent, setSearchStudent] = useState("");
    const [searchStudents, setSearchStudents] = useState([]);
    const [studentId, setStudentId] = useState("");
    const [student, setStudent] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [maxCredit, setMaxCredit] = useState(0);
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        axiosPublic.get(`/Courses`)
            .then(res => setAllCourses(res.data));
    }, [axiosPublic]);

    useEffect(() => {
        axiosPublic.get(`/students/${studentId}`)
            .then(res => setStudent(res.data));
        setRefetch(false)
    }, [axiosPublic, studentId, refetch]);

    const handleSearchStudent = (e) => {
        setSearchStudent(e.target.value);
    };

    const handleSemesterChange = (e) => {
        setSelectedSemester(e.target.value);
    };

    useEffect(() => {
        axiosPublic.get(`/semesterCredit`)
            .then(res => setAllSemester(res.data));
    }, [axiosPublic]);

    useEffect(() => {
        const presentSemester = allSemester?.find(item => item?.name === selectedSemester);
        setMaxCredit(presentSemester?.credit)
    }, [selectedSemester, allSemester]);
    useEffect(() => {
        axiosPublic.get(`/search/${searchStudent}`)
            .then(data => setSearchStudents(data.data))
    }, [searchStudent, axiosPublic])
    const handleAddCourse = (course) => {
        setLoader(true)
        const studentPresentCredit = student?.selectedCourses.reduce(
            (totalCredits, course) => totalCredits + parseInt(course.credit, 10),
            0
        );
        if (parseInt(studentPresentCredit) + parseInt(course?.credit) > parseInt(maxCredit, 10)) {
            Swal.fire({
                title: 'warning!',
                text: `Credit limit exist! Max credit limit is ${maxCredit}!`,
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
            return setLoader(false)
        }
        axiosPublic.patch(`/Students/addCourse/${student?._id}`, course)
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Course Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    setRefetch(true)
                } else {
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
                    title: 'warning!',
                    text: `${error.message}`,
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                })
            })
        setLoader(false)
    }
    return (
        <div className="mt-10 w-4/5 mx-auto">
            <div className="flex flex-col md:flex-row justify-around items-center p-5 shadow-lg rounded-lg">
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold mb-4">Registration Form</h2>
                    <div className="relative">
                        <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                            Student Email/Name/Department*
                        </label>
                        <input
                            name="id"
                            type="text"
                            id="id"
                            placeholder="Enter Student Email/Name/Department"
                            value={searchStudent}
                            onChange={handleSearchStudent}
                            required
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                        <ol className={`${searchStudent || 'hidden'} z-50 bg-white p-2 mt-1 rounded absolute top-7 md:top-16 shadow-lg`}>
                            {
                                searchStudents?.map((student, idx) => <li
                                    key={idx}
                                    onClick={() => { setStudentId(student?._id); setSearchStudent(''); }}
                                    className='py-1 border-b'>
                                    {student?.name} ({student?.department})
                                </li>)
                            }
                        </ol>
                    </div>

                    <div>
                        <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                            Semester*
                        </label>
                        <select
                            name="semester"
                            id="semester"
                            className="border mt-1 p-2 rounded-lg w-full lg:w-4/5"
                            required
                            value={selectedSemester}  // Set the value attribute
                            onChange={handleSemesterChange}
                        >
                            <option value=''> </option>
                            {
                                allSemester?.map((item, idx) => <option key={idx} value={item?.name}>{item?.name}</option>)
                            }
                        </select>
                    </div>
                    {maxCredit && selectedSemester ? 
                    <p></p>:
                    <p className="text-red-600">Select student and semester</p>
                    }
                </div>
                <div className="lg:ml-16 space-y-4">
                    <h1 className="text-2xl">Student Name: <span className="font-bold">{student?.name}</span></h1>
                    <h3 className="text-xl">Department: <span className="font-bold">{student?.department}</span></h3>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-4xl font-bold mb-4 text-center">All Courses</h2>
                {
                    allCourses?.map((course, idx) =>
                        <div key={idx} className="w-full py-2 border-b-2 flex justify-between items-center">
                            <div className="flex justify-between space-x-2 w-4/5">
                                <h5 className="text-lg w-3/5">Title: <span className=" font-bold">{course?.title}</span></h5>
                                <p className="w-1/5">Code: <span className=" font-bold">{course?.code}</span></p>
                                <p className="w-1/5">Credit: <span className=" font-bold">{course?.credit}</span></p>
                            </div>
                            {student && selectedSemester &&
                                <div>
                                    <button onClick={() => handleAddCourse(course)} className="text-green-600 text-xl m-1 flex items-center border border-green-600 py-1 px-3 rounded-md">
                                        {loader || <span className="flex"><IoAdd className="text-2xl mr-2"></IoAdd>Add</span>}
                                        {
                                            loader && <p className="border-t rounded-xl border-black border-solid w-4 h-4 animate-spin"></p>
                                        }
                                    </button>
                                </div>
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Registration;
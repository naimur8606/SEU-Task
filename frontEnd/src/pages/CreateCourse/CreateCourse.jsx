import { } from "react-icons/ai";

const CreateCourse = () => {
    const onSubmit = (e) => {
        e.preventDefault();
        const form = e?.target;
        // const name = e.target.email.value;
        const courseCode = form?.code?.value;
        const courseTitle = form?.title?.value;
        const credit = form?.credit?.value;
        const course = {
            courseCode,
            courseTitle,
            credit
        }
        console.log(course)

    };
    return (
        <div className="center">
            <div className="shadow-l">
                <h1 className="login-h">Create Course!</h1>
                <form onSubmit={onSubmit} className="">
                    <div className="mt-5">
                        <label className="">
                            <span className="n-h text-5xl">Course Code*</span>
                        </label><br />
                        <input
                            name="code"
                            type="text"
                            placeholder="Enter Course Code"
                            required
                            className="" />
                    </div>
                    <div className="mt-5">
                        <label className="">
                            <span className="n-h">Course Title*</span>
                        </label><br />
                        <input
                            name="title"
                            type="text"
                            placeholder="Enter Course Title"
                            required
                            className="" />
                    </div>
                    <div className="mt-5">
                        <label className="">
                            <span className="n-h">Course Credits*</span>
                        </label><br />
                        <input
                            name="credit"
                            type="text"
                            placeholder="Enter Course Credits"
                            className="" />
                    </div>
                    <div className="mt-5">
                        <button type="submit" className="n-h b-1">Create Course</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCourse;
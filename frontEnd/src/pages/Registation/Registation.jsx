import { Link, useNavigate } from "react-router-dom";
import { } from "react-icons/ai";

const Registation = () => {
    const navigate = useNavigate()
    const onSubmit = async (e) => {
        const name = e.target.email.value;
        console.log(name)

    };
    return (
        <div className="mt-10">
            <div className="shadow-s">
            <form onSubmit={onSubmit} className="">
                <div className="">
                    <label className="">
                        <span className="n-h">Student ID*</span>
                    </label><br />
                    <input
                    name="id"
                        type="text"
                        placeholder="Your Email"
                        required
                        className="" />
                </div>
                <div className="mt-5">
                    <button type="submit" className="n-h b-1">Search</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default Registation;
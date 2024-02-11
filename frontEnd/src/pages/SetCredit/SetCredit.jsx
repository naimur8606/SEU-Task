import { Link, useNavigate } from "react-router-dom";
import { } from "react-icons/ai";

const SetCredit = () => {
    const navigate = useNavigate()
    const onSubmit = (e) => {
        const name = e.target.email.value;
        console.log(name)

    };
    return (
        <div className="center">
            <div className="shadow-s">
            <form onSubmit={onSubmit} className="">
                <div className="">
                    <label className="">
                        <span className="n-h">Maximum Credit*</span>
                    </label><br />
                    <input
                    name="id"
                        type="number"
                        placeholder="Your Email"
                        required
                        className="" />
                </div>
                <div className="mt-5">
                    <button type="submit" className="n-h b-1">Update</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default SetCredit;
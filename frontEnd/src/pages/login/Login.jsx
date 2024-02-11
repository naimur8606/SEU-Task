import { Link, useNavigate } from "react-router-dom";
import { } from "react-icons/ai";
import Swal from "sweetalert2";

const Login = () => {
    const navigate = useNavigate()
    const onSubmit = async (e) => {
        const name = e.target.email.value;
        console.log(name)

    };
    return (
        <div className="center">
            <div className="shadow-l">
            <h1 className="login-h">Login now!</h1>
            <form onSubmit={onSubmit} className="">
                <div className="mt-5">
                    <label className="">
                        <span className="n-h">Email*</span>
                    </label><br />
                    <input
                    name="email"
                        type="text"
                        placeholder="Your Email"
                        required
                        className="" />
                </div>
                <div className="mt-5">
                    <label className="">
                        <span className="n-h">Password*</span>
                    </label><br />
                    <input
                    name="password"
                        type="password"
                        placeholder="Enter Password"
                        className="" />
                </div>
                <div className="mt-5">
                    <button type="submit" className="n-h b-1">Login</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default Login;
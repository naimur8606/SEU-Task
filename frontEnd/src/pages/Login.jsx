import { Link, useLocation, useNavigate } from "react-router-dom";
import { } from "react-icons/ai";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const Login = () => {
    const { userLogin, setUserLocation } = useAuth()
    const location = useLocation()
    const State = location?.state
    setUserLocation(State)
    const navigate = useNavigate()
    const formSubmit = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        userLogin(email, password)
            .then(() => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Login Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                navigate(location?.state ? State : "/")
            }
            )
            .catch(error => {
                Swal.fire({
                    title: 'Warning!',
                    text: `${error.message}`,
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                })
            })
    }
    return (
        <div className="center">
            <div className="shadow-l">
            <h1 className="login-h">Login now!</h1>
            <p>email: naimur2935@gmail.com</p>
            <p>password: naimur1</p>
            <form onSubmit={formSubmit} className="">
                <div className="mt-5">
                    <label className="">
                        <span className="n-h">Email*</span>
                    </label><br />
                    <input
                    name="email"
                        type="text"
                        placeholder="Your Email"
                        defaultValue={'naimur2935@gmail.com'}
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
                        required
                        defaultValue={'naimur1'}
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
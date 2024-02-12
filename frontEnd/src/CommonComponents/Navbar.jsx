import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

function Navbar() {
    const { logOut } = useAuth()
  
  const location = useLocation()?.pathname
  const [menu, setMenu] = useState(false) 

  const navItems = [
    { name: "All Students", path: "/", },
    { name: "Add Student", path: "/addStudent", },
    { name: "Create Course", path: "/createCourse", },
    { name: "Set Credits", path: "/setCredit", },
    { name: "Course Registration", path: "/Registration", },
]
const SignOut = () => {
    logOut()
        .then(
            Swal.fire({
                title: 'Success!',
                text: 'Logout Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        )
        .catch(error => {
            Swal.fire({
                title: 'Warning!',
                text: `${error.message}`,
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        });
}

return (
    <div className="flex items-center justify-between py-2 md:py-4 px-3 lg:px-8 shadow-md">
        <img className='h-12' src="https://i.ibb.co/8MYbN5G/seu.png" alt="" />
        <div className="text-4xl lg:hidden">
            {menu ? <AiOutlineClose onClick={() => setMenu(false)}></AiOutlineClose> :
                <BiMenu onClick={() => setMenu(true)}></BiMenu>}
        </div>
        <ul className={`w-full z-50 lg:w-auto lg:space-x-8 space-y-2 lg:space-y-0 font-medium flex flex-col lg:flex-row items-center duration-1000 lg:relative lg:left-0 lg:top-0 absolute  ${menu ? "top-[64px] md:top-[80px] left-0 bg-[#fff] p-3 shadow-md" : "-left-[1100px] top-[20px]"}`}>
            {
                navItems?.map((item, idx) =>
                    <li key={idx}>
                        <Link
                            to={item?.path}
                            onClick={() => setMenu(false)}
                            className={`${location === item?.path ? 'text-[#fecd20]' : ''}`}
                        >
                            {item?.name}
                        </Link>
                    </li>
                )
            }
            <li onClick={()=> setMenu(false)}>
                <div className="flex items-center text-red-600 font-semibold">
                    <button onClick={SignOut}>Logout</button>
                </div>
        </li>
        </ul>
    </div>
);
}

export default Navbar;

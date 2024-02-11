import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../pages/login/Login";
import Registation from "../pages/Registation/Registation";
import SetCredit from "../pages/SetCredit/SetCredit";
import CreateCourse from "../pages/CreateCourse/CreateCourse";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout> ,
      children:[
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/Registation',
            element:<Registation></Registation>
        },
        {
            path:'/setCredit',
            element:<SetCredit></SetCredit>
        },
        {
            path:'/createCourse',
            element:<CreateCourse></CreateCourse>
        },
      ]
    }
  ]);

export default router;
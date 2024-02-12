import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import SetCredit from "../pages/SetCredit";
import CreateCourse from "../pages/CreateCourse";
import AddStudent from "../pages/AddStudent";
import AllStudents from "../pages/AllStudents";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout> ,
      children:[
        {
            path:'/',
            element:<PrivateRoute><AllStudents></AllStudents></PrivateRoute>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/Registration',
            element:<PrivateRoute><Registration></Registration></PrivateRoute>
        },
        {
            path:'/setCredit',
            element:<PrivateRoute><SetCredit></SetCredit></PrivateRoute>
        },
        {
            path:'/createCourse',
            element:<PrivateRoute><CreateCourse></CreateCourse></PrivateRoute>
        },
        {
            path:'/addStudent',
            element:<PrivateRoute><AddStudent></AddStudent></PrivateRoute>
        },
      ]
    }
  ]);

export default router;
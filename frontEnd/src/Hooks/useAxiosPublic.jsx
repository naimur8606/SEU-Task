import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://back-end-beta-two.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
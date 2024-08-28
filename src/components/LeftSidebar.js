import React from 'react'
import { MdHome } from "react-icons/md";
import { FiHash } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoBookmarkSharp } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { USER_API_END_POINT } from '../utils/constant';
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';
import toast from 'react-hot-toast';
import axios from 'axios';

const LeftSidebar = () => {
    const {user}= useSelector(store=>store.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`);
            dispatch(getUser(null));
            dispatch(getOtherUsers(null));
            dispatch(getMyProfile(null));
            navigate('/login');
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='w-[20%]'>
        <div>
            <div>
                <img  className="ml-3" width={"60px"} src="https://th.bing.com/th/id/OIP.1lm9KjprReA8-CMRPriawgHaEK?rs=1&pid=ImgDetMain" alt="TwitterLogo"/>
            </div>
            <div className='my-4'>
                <Link to="/" className='flex items-center my-2 px-4 py-2  hover:bg-gray-200 rounded-full cursor-pointer gap-2'>
                    <div>
                        <MdHome size="24px" />
                    </div>
                    <h1 className='font-bold text-lg'>Home</h1>
                </Link>
                <div className='flex items-center my-2 px-4 py-2  hover:bg-gray-200 rounded-full cursor-pointer gap-2'>
                    <div>
                        <FiHash size="24px" />
                    </div>
                    <h1 className='font-bold text-lg'>Explore</h1>
                </div>
                <div className='flex items-center my-2 px-4 py-2  hover:bg-gray-200 rounded-full cursor-pointer gap-2'>
                    <div>
                        <IoMdNotifications size="24px" />
                    </div>
                    <h1 className='font-bold text-lg'>Notifications</h1>
                </div>
                <Link to={`/profile/${user?._id}`} className='flex items-center my-2 px-4 py-2  hover:bg-gray-200 rounded-full cursor-pointer gap-2'>
                    <div>
                        <FaUser size="24px" />
                    </div>
                    <h1 className='font-bold text-lg'>Profile</h1>
                </Link>
                <div className='flex items-center my-2 px-4 py-2  hover:bg-gray-200 rounded-full cursor-pointer gap-2'>
                    <div>
                        <IoBookmarkSharp size="24px" />
                    </div>
                    <h1 className='font-bold text-lg'>Bookmarks</h1>
                </div>
                <div  onClick={logoutHandler} className='flex items-center my-2 px-4 py-2  hover:bg-gray-200 rounded-full cursor-pointer gap-2'>
                    <div>
                        <IoLogOutOutline size="24px" />
                    </div>
                    <h1 className='font-bold text-lg'>Logout</h1>
                </div>
                <button className='px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold'>Post</button>
            </div>
        </div>
    </div>
  )
}

export default LeftSidebar
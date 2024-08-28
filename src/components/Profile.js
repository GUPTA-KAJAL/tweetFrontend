import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import Avatar from 'react-avatar'
import useGetProfile from '../hooks/useGetProfile';
import {useDispatch, useSelector} from "react-redux"
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';

const Profile = () => {

  const {user,profile}= useSelector(store=>store.user)
  const {id}=useParams()
  useGetProfile(id);
  //console.log(profile)
  const dispatch = useDispatch();

  const followAndUnfollowHandler = async () => {
    if(user.following.includes(id)){
        // unfollow
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id});
            console.log(res);
            dispatch(followingUpdate(id));
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
        
    }else{
        // follow
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id});
            console.log(res);
            dispatch(followingUpdate(id));
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
}

  return (
    <div className='w-[50%] border-l border-r border-gray-200 '>
      <div>
        <div className='flex items-center py-1'>
          <Link  to="/" className='p-2 rounded-full  hover:bg-gray-100 cursor-pointer'>
            <IoMdArrowBack size="24px" />
          </Link>
          <div className='ml-2'>
            <h1 className='font-bold text-lg '>{profile?.name}</h1>
            <p className='text-gray-500 text-sm'>10 Post</p>
          </div>
        </div>
        <img src="https://wallpaperaccess.com/full/5277906.jpg" alt="banner"/>
        <div className='absolute top-72 ml-2 border border-whit rounded-full'>
          <Avatar src="https://th.bing.com/th/id/OIP.04DMgWld3haXBdCT8ZZUkAHaFe?rs=1&pid=ImgDetMain" size="100" round={true} />
        </div>
        <div className='text-right m-3'>
          {
            profile?._id === user?._id ? 
              (<button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400 '>Edit Profile</button>)
              :
              (
              <button onClick={followAndUnfollowHandler}  className='px-4 py-1 bg-black text-white rounded-full'>{user.following.includes(id) ? "Following" : "Follow"}</button>) 
          }
          
        </div>
        <div className='m-4'>
          <h1 className='font-bold text-xl'>{profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
        </div>
        <div className='m-4 text-sm'>
          <p>This coder is a seasoned software engineer with a passion for creating innovative solutions to complex problems. With over a decade of experience in the field, they have honed their skills in multiple programming languages and technologies. They thrive in dynamic environments where they can leverage their expertise to build robust and scalable software systems.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
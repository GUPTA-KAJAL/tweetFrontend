import React from 'react'
import Avatar from 'react-avatar'
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { TWEET_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetSlice';
import axios from 'axios';
import { timeSince } from '../utils/constant';

const Tweets = ({tweet}) => {
    const {user}=useSelector(store=>store.user)
    const dispatch=useDispatch()
    const likeorDislikeHandler =async(id)=>{
        try {
            const res=await axios.put(`${TWEET_API_END_POINT}/like/${id}`,{id:user?._id},{withCredentials:true})
            console.log(res);
            dispatch(getRefresh())
            toast.success(res.data.message)
        } catch (error) {
            toast.success(error.response.data.message)
           console.log(error)
        }
    }

    const deleteTweetHandler=async(id)=>{
        try {
            axios.defaults.withCredentials=true;
            const res=await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
            console.log(res);
            toast.success(res.data.message);
            dispatch(getRefresh());
        } catch (error) {
            toast.success(error.response.data.message);
            console.log(error);
        }
    }
  return (
    <div className='border-b border-gray-200'>
        <div>
            <div className='flex items-center p-4'>
                <Avatar src="https://cdn.pixabay.com/photo/2017/03/01/22/18/avatar-2109804_1280.png" size="40" round={true} />
                <div className='ml-2 w-full'>
                    <div className='flex items-center'>
                        <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
                        <p className='text-gray-500 text-sm ml-1'>{`@${tweet?.userDetails[0]?.username}.${timeSince(tweet?.createdAt)}`}</p>
                    </div>
                    <div>
                        <p>{tweet?.description}</p>
                    </div>
                    <div className='flex justify-between my-3'>
                        <div className='flex items-center'>
                            <div  className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                                <FaRegComment size="20px"/>
                            </div>
                            <p>0</p>
                        </div>
                        <div className='flex items-center'>
                            <div onClick={()=>likeorDislikeHandler(tweet?._id)} className='p-2 hover:bg-pink-200 rounded-full cursor-pointer'>
                                <FaRegHeart size="20px"/>
                            </div>
                            <p>{tweet?.like?.length}</p>
                        </div>
                        <div className='flex items-center'>
                            <div className='p-2 hover:bg-yellow-200 rounded-full cursor-pointer'>
                            <FaRegBookmark size="20px"/>
                            </div>                            
                            <p >0</p>

                        </div> 
                        {
                                user?._id === tweet?.userId && (
                                    <div onClick={() => deleteTweetHandler(tweet?._id)} className='flex items-center'>
                                        <div className='p-2 hover:bg-red-300 rounded-full cursor-pointer'>
                                            <AiOutlineDelete size="24px" />
                                        </div>
                                    </div>
                                )
                        }
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tweets
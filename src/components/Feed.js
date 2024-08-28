import React from 'react'
import CreatePost from './CreatePost'
import Tweets from './Tweets'
import { useSelector } from 'react-redux'



const Feed = () => {
  const {tweets}=useSelector(store=>store.tweet)

  return (
    <div className='w-[50%] border '>
      <div>
        <CreatePost/>
        {
          tweets?.map((tweet)=>
            <Tweets key={tweet?._id} tweet={tweet}/>
          )
        }
        
      </div>
    </div>
  )
}

export default Feed
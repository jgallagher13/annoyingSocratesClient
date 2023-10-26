import { createPost } from '../../../../utilities/posts-api'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PostForm from '../PostForm/PostForm'
export default function PostsPage({ quotes, user }) {
    
    const { quote } = useParams()
    // let quoteState = quotes.find(quo => quo.quote === quote)
    const [postData, setPostData] = useState()

    function handleChange(event) {
        setPostData(event.target.value)
    }


   async function handleSubmit(event) {
        event.preventDefault()
        const banana = { text: postData, user: user._id }
        console.log(banana)
        await createPost(banana)
    }

    return (
        <>
        <h2>Posts</h2>
        {/* <h3>{quoteState}</h3> */}
        <h3>{quote}</h3>
        {/* <p>{postData.text}</p> */}
        <PostForm handleChange={handleChange} handleSubmit={handleSubmit}/> 
        </>
    )
}
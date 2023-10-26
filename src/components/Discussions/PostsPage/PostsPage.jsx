import { createPost, sendRequest } from '../../../../utilities/posts-api'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PostForm from '../PostForm/PostForm'
export default function PostsPage({ user }) {
    
    const { _id } = useParams()
    const [quote, setQuote] = useState({})
    const [postData, setPostData] = useState()

    useEffect(() => {
        async function getQuote() {
            const quote = await sendRequest(`https://api.quotable.io//${_id}`)
            setQuote(quote)
        }
        getQuote()
    }, [])

    function handleChange(event) {
        setPostData(event.target.value)
    }


   async function handleSubmit(event) {
        event.preventDefault()
        const post = { text: postData, user: user._id }
        console.log(post)
        await createPost(post)
    }

    return (
        <>
        <h2>Posts</h2>
        <PostForm handleChange={handleChange} handleSubmit={handleSubmit}/> 
        </>
    )
}
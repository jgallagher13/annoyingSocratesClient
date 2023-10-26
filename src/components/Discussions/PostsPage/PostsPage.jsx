import { createPost, getAllPosts } from '../../../../utilities/posts-api'
import sendRequest from '../../../../utilities/send-request'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostForm from '../PostForm/PostForm'
export default function PostsPage({ user }) {
    
    const { _id } = useParams()
    const [quote, setQuote] = useState({})
    const [postData, setPostData] = useState()
    
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function getQuote() {
            const quote = await sendRequest(`https://api.quotable.io/quotes/${_id}`)
            setQuote(quote)
        }
        getQuote()

        async function getPosts() {
            const posts = await getAllPosts(_id)
            setPosts(posts)
        }
        getPosts()
    }, [])


    function handleChange(event) {
        setPostData(event.target.value)
    }


   async function handleSubmit(event) {
        event.preventDefault()
        const post = { text: postData, user: user._id, quoteId: _id}
        
        // setPostData('');
        console.log(post)
        await createPost(post)
    }

    return (
        <>
        <h2>Posts</h2>
        
        <ul>
  {posts.map(post => (
    <div key={post._id}>
        <p>{user.name}</p>
      <p>{post.text}</p>
    </div>
  ))}
</ul>

        <PostForm handleChange={handleChange} handleSubmit={handleSubmit}/> 
        </>
    )
}
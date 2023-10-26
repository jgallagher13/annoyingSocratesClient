import { createPost, getAllPosts, deletePost } from '../../../../utilities/posts-api'
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
        await createPost(post)
    }

    async function handleDelete(event) {
        const deletedPost = await deletePost(event.target.id)
        const updatedPostList = posts.filter(post => post._id !== deletedPost._id)
        setPosts(updatedPostList)
    }

    return (
        <>
        <h2>Quote Discussion Thread</h2>
        <h3>{quote.content}</h3>
        <ul>
  {posts.map(post => (
    <div key={post._id}>
        <p>{user.name}</p>
      <p>{post.text}</p>
      <button onClick={handleDelete} id={post._id}>Delete Post</button>
    </div>
  ))}
</ul>

        <PostForm handleChange={handleChange} handleSubmit={handleSubmit}/> 
        </>
    )
}
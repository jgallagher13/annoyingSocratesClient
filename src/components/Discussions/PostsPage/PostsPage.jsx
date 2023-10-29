import { createPost, getAllPosts, deletePost } from '../../../../utilities/posts-api'
import sendRequest from '../../../../utilities/send-request'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostForm from '../PostForm/PostForm'
import './PostsPage.css'

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
       const createdPost = await createPost(post)
       setPostData('')
       setPosts([...posts, createdPost])
       
    }

    async function handleDelete(event) {
        const deletedPost = await deletePost(event.target.id)
        const updatedPostList = posts.filter(post => post._id !== deletedPost._id)
        setPosts(updatedPostList)
    }
    return (
        <>
        <div className='postPage'>
        <h2>Quote Discussion Thread</h2>
        <h3>{quote.content}</h3>
        <h3>- {quote.author}</h3>
        <div className="line-divider"></div>
        <ul>
  {posts.map(post => (

    <div key={post._id} className='post'>
        <p>{post.user.name}</p>
        <div className="line-divider-post"></div>
      <p>{post.text}</p>
      {user && user._id === post.user._id && (
<button onClick={handleDelete} id={post._id}>Delete Post</button>
)}  
    </div>
  ))}
</ul>
<div className='postForm'>
    <div className='postFormInput'> 
        <PostForm handleChange={handleChange} handleSubmit={handleSubmit}/> 
    </div>
    </div>
</div>
        </>
    )
}
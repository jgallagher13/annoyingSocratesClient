import { createPost } from '../../../../utilities/posts-api'
import sendRequest from '../../../../utilities/send-request'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostForm from '../PostForm/PostForm'
export default function PostsPage({ user }) {
    
    const { _id } = useParams()
    const [quote, setQuote] = useState({})
    const [postData, setPostData] = useState()
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        async function getQuote() {
            const quote = await sendRequest(`https://api.quotable.io/quotes/${_id}`)
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
        setEntries([...entries, post]);
        setPostData('');
        console.log(post)
        await createPost(post)
    }

    return (
        <>
        <h2>Posts</h2>
        <ul>
            {entries.map((entry, index) => (
                <li key={index}><span>{user.name}</span>{entry.text}</li>
            ))}
        </ul>
        <PostForm handleChange={handleChange} handleSubmit={handleSubmit}/> 
        </>
    )
}
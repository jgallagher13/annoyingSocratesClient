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
            <div className='header-posts'>
                <img className='pillar' src='../../../../images/greekpillar.png' />
                <h2>Quote Discussion Thread</h2>
                <img className='pillar' src='../../../../images/greekpillar.png' />
            </div>
            <h3 className='quote-content'>{quote.content}</h3>
            <h3 className='quote-author'>- {quote.author}</h3>
            <h2 className='recc'>Socrates's Reccomendations for Posting:</h2>
             <div className='directions'>
                <p><span className='bold'>Delve into the Wisdom of Your Fellow Philosophers:</span> Begin your journey of intellectual exploration by perusing the musings of your fellow thinkers. Their ideas may serve as guideposts on your path to enlightenment.</p>
                <p><span className='bold'>Choose a Luminous Beacon:</span> Select a shining idea or argument from this intellectual agora that beckons to you. Take a bold stance, whether you find yourself drawn toward its brilliance or tempted to challenge its radiance.</p>
                <p><span className='bold'>Illuminate Your Position with Logic and Examples:</span> Shed light on your chosen stance with the torch of reason. Explain, in the spirit of dialectic, why you stand where you do. Illuminate your viewpoint with the wisdom of examples and stories from the world above.</p>
                <p><span className='bold'>Gently Probe Assumptions:</span> As I once said, "The unexamined life is not worth living." With the spirit of inquiry, probe the foundational beliefs of your fellow philosophers. Encourage them to question their convictions, much like the oracle's riddles. This is the key to being as annoying as old Socrates!</p>
                <p><span className='bold'>Kindly Raise Objections:</span> Like a philosopher in the agora, if you find shadows in the arguments of others, kindly hold up the lantern of your objections. Invite them to respond, to bring their wisdom to the fore, and to test their ideas in the crucible of dialogue.</p>
                <p><span className='bold'>Embrace the Joy of Spirited Discourse:</span> Remember, the symposium of ideas is a joyous occasion. Let the elixir of spirited discussion flow freely. Encourage your fellow thinkers to join in the dance of debate, and be ready to waltz with alternative viewpoints.
                </p>
            </div>
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
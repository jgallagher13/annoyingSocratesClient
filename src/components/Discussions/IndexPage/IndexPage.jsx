import { useEffect, useState } from 'react'
import sendRequest from '../../../../utilities/send-request'
import { Link } from 'react-router-dom'
import './IndexPage.css'

export default function IndexPage() {

    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        async function getQuotes() {
            const quotes = await sendRequest('https://api.quotable.io/quotes?limit=150')
            setQuotes(quotes.results)
        }
        getQuotes()
    }, [])
    return (
        <>
        <h1>Choose a quote to discuss!</h1>
        <div className='quoteLinks-container'>
        {quotes.map(quote => (
            <div key={quote._id} className='quoteLink'>
                <Link to={`/quotes/${quote._id}`}>{quote.content}</Link>
            </div>
        ))}
        </div>
        </>
    ) 
}
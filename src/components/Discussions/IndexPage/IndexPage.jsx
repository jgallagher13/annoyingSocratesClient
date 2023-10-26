import { useEffect, useState } from 'react'
import sendRequest from '../../../../utilities/send-request'
import { Link } from 'react-router-dom'

export default function IndexPage() {

    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        async function getQuotes() {
            const quotes = await sendRequest('https://api.quotable.io/quotes?page=2')
            setQuotes(quotes.results)
            console.log(quotes.results)
        }
        getQuotes()
    }, [])
    return (
        <>
        {quotes.map(quote => (
            <div key={quote._id}>
                <Link to={`/quotes/${quote._id}`}>{quote.content}</Link>
            </div>
        ))}
        </>
    ) 
}
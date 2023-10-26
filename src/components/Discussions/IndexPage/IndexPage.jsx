import { useEffect, useState } from 'react'
import sendRequest from '../../../../utilities/send-request'
import { Link } from 'react-router-dom'

export default function IndexPage() {

    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        async function getQuotes() {
            const quotes = await sendRequest('https://philosophy-quotes-api.glitch.me/quotes')
            setQuotes(quotes)
            
        }
        getQuotes()
    }, [])
    return (
        <>
        {quotes.map(quote => (
            <div key={quote.quote}>
                <Link to={`/${quote.quote}`} quotes={quotes}>{quote.quote}</Link>
            </div>
        ))}
        </>

    ) 
}
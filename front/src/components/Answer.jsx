import React from 'react';
import './Answer.css'

function Answer({ response, upvote }) {
    return (
        <>
            <h2>{response.response}</h2>
            <div className="flex">
                <h3>Upvotes: {response.upvotes}</h3>
                <button onClick={upvote}>Upvote</button>
            </div>
        </>
    )
}

export default Answer
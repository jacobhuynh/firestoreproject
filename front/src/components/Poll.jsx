import React from 'react'
import { useState } from 'react'

function Poll({ handleSubmit }) {
    const [answer, setAnswer] = useState("");

    const onFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(answer);
        setAnswer("");
    };

    return (
        <>
            <h2>What is your favorite animal?</h2>
            <form id="poll" onSubmit={onFormSubmit}>
                <label>Your Answer:</label><br/>
                 <input
                    type="text"
                    id="answer"
                    name="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                /><br/><br/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Poll
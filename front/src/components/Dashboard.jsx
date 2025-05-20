import React from 'react'
import { useState, useEffect } from 'react'
import Poll from './Poll'
import Answer from './Answer'

import { collection, query, doc, getDocs, addDoc, updateDoc, increment, orderBy } from "firebase/firestore";
import { db } from "../firebase";

function Dashboard() {
    const [responses, setResponses] = useState(null);
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const res = await getDocs(query(collection(db, "responses"), orderBy("upvotes", "desc")));
                const data = res.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setResponses(data)
        } catch (e) {
            console.log("Error retrieving responses: ", e);
        }
    }

    const handleSubmit = async (answer) => {
        try {
            await addDoc(collection(db, "responses"), {
                response: answer,
                upvotes: 0
            });
            fetchData();
        } catch (e) {
            console.log("Error submitting response: ", e);
        }
    }

    const upvote = async (id) => {
        try {
            await updateDoc(doc(db, "responses", id), {
                upvotes: increment(1)
            })
            fetchData();
        } catch (e) {
            console.log("Error updating upvotes: ", e);
        }
    }

    return (
        <>
            <Poll handleSubmit={handleSubmit}/>
            <h2>Responses</h2>
            {responses ? (
                <div>
                    {responses.map((response, index) => (
                            <Answer key={response.id} response={response} upvote={() => upvote(response.id)}/>
                        ))}
                </div>
            ) : (
                <div>
                    No responses yet.
                </div>
            )}
        </>
    )
}

export default Dashboard
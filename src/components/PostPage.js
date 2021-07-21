import {
    useParams
} from "react-router-dom";
import { useEffect, useState } from 'react';
import {
    Link
} from "react-router-dom";
const apiUrl = "http://localhost:3004/posts"

export default () => {
    const { postId } = useParams()
    const [postData, setPostData] = useState(null)
    const [listComments, setListComments] = useState([])
    const [commentText, setCommentText] = useState("")

    // in the scope of the component
    async function fetchSinglePost() {
        const response = await fetch(`${apiUrl}/${postId}`) // GET
        const data = await response.json()

        const responseComments = await fetch(`${apiUrl}/${postId}/comments`) // GET
        const dataComments = await responseComments.json()

        setPostData(data) // update our state
        setListComments(dataComments) // update our state
    }

    async function createComment(commentTextInput) {
        // create a post/article
        const response = await fetch("http://localhost:3004/comments", {
            method: "POST",
            body: JSON.stringify({
                "body": commentTextInput,
                "postId": postId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        // refetch and refresh the UI
        fetchSinglePost()
    }

    useEffect(() => {
        fetchSinglePost()
    }, [])


    return <div>
        <h2>{postData && postData.title}</h2>
        <p>{postData && postData.description}</p>
        <h2>Comments:</h2>
        <div>
            {listComments.map(comm => {
                return <p>{comm.body}</p>
            })}
        </div>
        <div>
            <textarea value={commentText} onChange={(e) => {
                setCommentText(e.target.value)
            }}></textarea>
            <button onClick={() => {
                createComment(commentText);
                setCommentText("") // clean the comment area
            }}> Comment</button>
        </div>
        <Link to="/">Go Back Home</Link>
    </div>
}
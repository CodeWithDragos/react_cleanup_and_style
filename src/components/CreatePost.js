import { useState } from "react"
import {
    Link
} from "react-router-dom";

const apiUrl = "http://localhost:3004/posts"

export default () => {

    const [isSuccess, setIsSuccess] = useState(false)

    async function createArticle(articleData) {
        // create a post/article
        const response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(articleData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        setIsSuccess(true)
    }

    return <div>
        <h1>Create a new post:</h1>
        {!isSuccess ? <form onSubmit={(event) => {
            event.preventDefault()
            const newPost = {
                title: event.target.title.value,
                description: event.target.description.value,
            }
            createArticle(newPost)
        }}>
            <div>
                <label>Title:</label>
                <input name="title"></input>
            </div>
            <div>
                <label>Description:</label>
                <textarea name="description"></textarea>

            </div>
            <button type="submit">Submit</button>
        </form> : <div>Post was created!</div>}
        <Link to="/">Go Back Home</Link>

    </div>
}


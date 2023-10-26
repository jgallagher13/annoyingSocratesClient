import sendRequest from './send-request'
const BASE_URL = 'http://localhost:4741/posts'

export async function createPost(postData) {
    return sendRequest(BASE_URL, 'POST', postData)
}

export async function getAllPosts(quoteId) {
    return sendRequest(`${BASE_URL}/${quoteId}`)
}
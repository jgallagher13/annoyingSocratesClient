import sendRequest from './send-request'
const BASE_URL = 'https://annoyingsocratesapi.onrender.com/posts'

export async function createPost(postData) {
    return sendRequest(BASE_URL, 'POST', postData)
}

export async function getAllPosts(quoteId) {
    return sendRequest(`${BASE_URL}/${quoteId}`)
}

export async function deletePost(postId) {
    return sendRequest(`${BASE_URL}/${postId}`, 'DELETE')
}
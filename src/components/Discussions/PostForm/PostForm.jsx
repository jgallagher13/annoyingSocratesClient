export default function PostForm({handleSubmit, handleChange}){
    return (
    <form onSubmit={handleSubmit}>
        <textarea type="text" name="text" onChange={handleChange} />
        <input type="submit" value="Post" />
    </form>
    )

}
import Post from '../../builders/Post/Post'


const PostsList = ({posts}) => {

    return (
        <>
            <section>
                <h3>Posts</h3>
                <div>
                    {posts.map((post) => {
                        return <Post artist={post.artist} username={post.username} title={post.title} photo={post.photo} />
                    })}

                </div>

            </section>
        </>
    )
}

export default PostsList;
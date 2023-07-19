import Comment from '../../builders/comment/comment'


const CommentsContainer = ({comments}) => {

    return (
        <>
            <section>
                <div>
                    {comments.map((comment) => {
                        return <Comment authorName={comment.authorName} commentContent={comment.commentContent}/>
                    })}

                </div>

            </section>
        </>
    )
}

export default CommentsContainer;
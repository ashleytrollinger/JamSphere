import Comment from '../../builders/Comment/Comment'


const CommentsContainer = ({ comments }) => {
    if (!comments) {
        return <h3>No comments have been left.</h3>;
    }
    return (
        <>
            <section>
                <div>
                    {comments.length === 0 ? (
                        <h3>No comments have been left.</h3>
                    ) : (
                        comments.map((comment) => (
                            <Comment
                                key={comment._id}
                                authorName={comment.authorName}
                                commentContent={comment.commentContent}
                            />
                        ))
                    )}
                </div>
            </section>
        </>
    );
};

export default CommentsContainer;



import { useState, useEffect, useCallback } from 'react';
import { useParams, Outlet } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentList from './CommentsList';
import LoadingSpinner from '../UI/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { quoteId } = params;

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comments;

  if (status === 'pending') {
    comments = (
      <div className='centerd'>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'completed' && loadedComments && loadedComments.length > 0) {
    comments = <CommentList comments={loadedComments} />;
  }

  if (
    status === 'completed' &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className='centered'>아직 댓글이 없습니다.</p>;
  }

  return (
    <>
      <section className={classes.comments}>
        <h2>댓글 남기기</h2>
        {!isAddingComment && (
          <button className='btn' onClick={startAddCommentHandler}>
            Click
          </button>
        )}
        {isAddingComment && (
          <NewCommentForm
            quoteId={quoteId}
            onAddedComment={addCommentHandler}
          />
        )}
        {comments}
      </section>
      <Outlet />
    </>
  );
};
export default Comments;

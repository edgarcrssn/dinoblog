import React, { useState } from 'react';
import styles from './CommentField.module.scss';
import { useLoggedUser } from '@/contexts/LoggedUserContext';
import { Input } from 'antd';
import { Button } from 'antd';
import { dinosaursServices } from '@/services/dinosaursServices';
import { CommentI } from '../CommentsSection/CommentsSection';

const { TextArea } = Input;

interface Props {
  dinosaur: string;
  commentsDisplayed: CommentI[];
  setCommentsDisplayed: React.Dispatch<React.SetStateAction<CommentI[]>>;
  setAllCommentsCount: React.Dispatch<React.SetStateAction<number>>;
}

const CommentField = ({
  dinosaur,
  commentsDisplayed,
  setCommentsDisplayed,
  setAllCommentsCount,
}: Props) => {
  const { loggedUser } = useLoggedUser();

  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState('');

  const postComment = () => {
    if (!comment) return;
    if (!dinosaur) return;

    setIsLoading(true);
    dinosaursServices
      .postComment({ dinosaur, content: comment })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then(({ comment }: { comment: CommentI }) => {
        if (comment) {
          setCommentsDisplayed([...commentsDisplayed, comment]);
          setAllCommentsCount((prev) => prev + 1);
          setComment('');
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={styles.commentField}>
      <h2 className={styles.title}>Post a comment</h2>
      {loggedUser ? (
        <>
          <TextArea
            disabled={isLoading}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            autoSize={{ minRows: 2, maxRows: 5 }}
            style={{ marginBottom: '0.5rem' }}
          />
          <Button
            disabled={comment.length === 0 || isLoading}
            type="primary"
            block
            onClick={postComment}
          >
            Comment as {loggedUser.username}
          </Button>
        </>
      ) : (
        <span>You must be logged in to comment!</span>
      )}
    </div>
  );
};

export default CommentField;

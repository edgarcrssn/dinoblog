import React, { useState } from 'react';
import styles from './CommentField.module.scss';
import { useLoggedUser } from '@/contexts/LoggedUserContext';
import { Input } from 'antd';
import { Button } from 'antd';
import { dinosaursServices } from '@/services/dinosaursServices';
import { useRouter } from 'next/router';
import { CommentI } from '@/pages/dinosaurs/[dinosaur]';

const { TextArea } = Input;

interface Props {
  commentsToDisplay: CommentI[];
  setCommentsToDisplay: React.Dispatch<React.SetStateAction<CommentI[]>>;
}

const CommentField = ({ commentsToDisplay, setCommentsToDisplay }: Props) => {
  const router = useRouter();
  const { dinosaur } = router.query;

  const { loggedUser } = useLoggedUser();

  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState('');

  const postComment = () => {
    if (!comment) return;
    if (!dinosaur || typeof dinosaur !== 'string') return;

    setIsLoading(true);
    dinosaursServices
      .postComment({ dinosaur, content: comment })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((comment: CommentI) => {
        if (comment) {
          setCommentsToDisplay([...commentsToDisplay, comment]);
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

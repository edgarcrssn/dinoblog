import React, { useEffect, useState } from 'react';
import styles from './CommentsSection.module.scss';
import { CommentI } from '@/pages/dinosaurs/[dinosaur]';
import { Button, Card } from 'antd';
import { dinosaursServices } from '@/services/dinosaursServices';
import { useRouter } from 'next/router';
import CommentField from '../CommentField/CommentField';

interface Props {
  comments: CommentI[];
  commentsCount: number;
}

const CommentsSection = ({ comments, commentsCount }: Props) => {
  const router = useRouter();
  const { dinosaur } = router.query;

  const [additionalCommentsCount, setAdditionalCommentsCount] = useState(0);
  const [commentsToDisplay, setCommentsToDisplay] = useState(comments);

  useEffect(() => {
    if (!dinosaur || typeof dinosaur !== 'string') return;
    if (!additionalCommentsCount) return;

    dinosaursServices
      .getComments({
        dinosaur,
        skip: additionalCommentsCount,
        take: 3,
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.comments) {
          setCommentsToDisplay([...commentsToDisplay, ...data.comments]);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [additionalCommentsCount]);

  const getElapsedTimeSinceDateString = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    const seconds = Math.floor(
      (now.getTime() - date.getTime()) / 1000
    ) as number;
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return `${interval} year${interval === 1 ? '' : 's'} ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `${interval} month${interval === 1 ? '' : 's'} ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `${interval} day${interval === 1 ? '' : 's'} ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `${interval} hour${interval === 1 ? '' : 's'} ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `${interval} minute${interval === 1 ? '' : 's'} ago`;
    }
    return `just now`;
  };

  return (
    <div className={styles.commentsSection}>
      <h2 className={styles.title}>
        {commentsCount} comment{commentsCount > 1 ? 's' : ''}
      </h2>
      {comments.length ? (
        <div className={styles.commentsContainer}>
          {commentsToDisplay
            .sort((a, b) => {
              const dateA = new Date(a.postedAt);
              const dateB = new Date(b.postedAt);
              return dateB.getTime() - dateA.getTime();
            })
            .map((comment) => (
              <Card key={comment.postedAt}>
                <div className={styles.comment}>
                  <div className={styles.head}>
                    <span className={styles.author}>
                      {comment.author.username}
                    </span>
                    <span className={styles.date}>
                      {getElapsedTimeSinceDateString(comment.postedAt)}
                    </span>
                  </div>
                  <p className={styles.content}>{comment.content}</p>
                </div>
              </Card>
            ))}
          {commentsCount > additionalCommentsCount + 3 ? (
            <div style={{ margin: 'auto' }}>
              <Button
                type="link"
                onClick={() => setAdditionalCommentsCount((prev) => prev + 3)}
              >
                Show more
              </Button>
            </div>
          ) : null}
        </div>
      ) : (
        <span>Be the first to comment!</span>
      )}
      <CommentField
        commentsToDisplay={commentsToDisplay}
        setCommentsToDisplay={setCommentsToDisplay}
      />
    </div>
  );
};

export default CommentsSection;

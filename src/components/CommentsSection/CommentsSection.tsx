import React, { useCallback, useEffect, useState } from 'react';
import styles from './CommentsSection.module.scss';
import { Button, Card } from 'antd';
import { dinosaursServices } from '@/services/dinosaursServices';
import CommentField from '../CommentField/CommentField';
import { useRouter } from 'next/router';
export interface CommentI {
  id: number;
  content: string;
  author: {
    username: string;
  };
  postedAt: string;
}

const CommentsSection = () => {
  const router = useRouter();
  const { dinosaur } = router.query;

  const [commentsDisplayed, setCommentsDisplayed] = useState<CommentI[]>([]);
  const [allCommentsCount, setAllCommentsCount] = useState(0);

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

  const loadThreeMoreComments = (init?: boolean) => {
    if (!dinosaur || typeof dinosaur !== 'string') return;

    dinosaursServices
      .getComments({
        dinosaur,
        skip: init ? 0 : commentsDisplayed.length,
        take: 3,
      })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then(({ comments = null, count = null }) => {
        if (comments && count) {
          if (init) setCommentsDisplayed(comments);
          else setCommentsDisplayed([...commentsDisplayed, ...comments]);
          setAllCommentsCount(count);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadThreeMoreComments(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dinosaur]);

  return (
    <div className={styles.commentsSection}>
      <h2 className={styles.title}>
        {allCommentsCount} comment{allCommentsCount > 1 ? 's' : ''}
      </h2>
      {commentsDisplayed.length > 0 ? (
        <div className={styles.commentsContainer}>
          {commentsDisplayed
            .sort((a, b) => {
              const dateA = new Date(a.postedAt);
              const dateB = new Date(b.postedAt);
              return dateB.getTime() - dateA.getTime();
            })
            .map((comment) => (
              <Card key={comment.id}>
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
          {allCommentsCount > commentsDisplayed.length ? (
            <div style={{ margin: 'auto' }}>
              <Button type="link" onClick={() => loadThreeMoreComments(false)}>
                Show more
              </Button>
            </div>
          ) : null}
        </div>
      ) : (
        <span>Be the first to comment!</span>
      )}
      <CommentField
        dinosaur={dinosaur as string}
        commentsDisplayed={commentsDisplayed}
        setCommentsDisplayed={setCommentsDisplayed}
        setAllCommentsCount={setAllCommentsCount}
      />
    </div>
  );
};

export default CommentsSection;

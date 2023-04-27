import { GetCommentsDto, PostCommentDto } from '@/pages/api/dinosaurs/comments';
import { manageToken } from '@/utils/manageToken';

export const dinosaursServices = {
  getComments({ dinosaur, skip, take }: GetCommentsDto) {
    return fetch(
      `http://localhost:3000/api/dinosaurs/comments?dinosaur=${dinosaur}&skip=${skip}&take=${take}`,
      {
        method: 'GET',
      }
    );
  },

  postComment({ dinosaur, content }: PostCommentDto) {
    return fetch(
      `http://localhost:3000/api/dinosaurs/comments?dinosaur=${dinosaur}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${manageToken.get()}`,
        },
        body: JSON.stringify({ content }),
      }
    );
  },
};

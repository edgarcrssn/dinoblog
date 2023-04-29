import {
  GetCommentsDto,
  PostCommentDto,
} from '@/pages/api/dinosaurs/[dinosaur]/comments';
import { manageToken } from '@/utils/manageToken';

export const dinosaursServices = {
  getComments({ dinosaur, skip, take }: GetCommentsDto) {
    return fetch(
      `/api/dinosaurs/${dinosaur}/comments?skip=${skip}&take=${take}`,
      {
        method: 'GET',
      }
    );
  },

  postComment({ dinosaur, content }: PostCommentDto) {
    return fetch(`/api/dinosaurs/${dinosaur}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${manageToken.get()}`,
      },
      body: JSON.stringify({ content }),
    });
  },
};

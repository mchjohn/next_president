export interface IComment {
  id: string;
  owner: string;
  content: string;
  amountLike: number;
  amountDislike: number;
  likes: [{ type: 'like' | 'dislike'; userId: string }];
}

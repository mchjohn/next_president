import { useCallback, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { IComment } from '@src/constants/comment';

export type FilterCommentsProps = 'amountLike' | 'amountDislike' | 'createdAt';

/** Hook utilizado para salvar e buscar comentários no firestore. */
export function useComments() {
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [gettingComments, setGettingComments] = useState(false);

  // Busca todos os comentários
  const getComments = useCallback(async (filter: FilterCommentsProps) => {
    setGettingComments(true);

    try {
      firestore()
        .collection('Comments')
        .orderBy(filter, 'desc')
        .onSnapshot(documentSnapshot => {
          const allComments = documentSnapshot.docs.map(doc => {
            const data = doc.data() as IComment;

            const commentWithId = {
              ...data,
              id: doc.id,
            };

            return commentWithId;
          }) as IComment[];

          setComments(allComments);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setGettingComments(false);
    }
  }, []);

  // Cadastra um comentário
  const addComment = async (id: string, owner: string, content: string) => {
    setIsCommenting(true);

    try {
      await firestore().collection('Comments').add({
        id,
        owner,
        content,
        likes: [],
        amountLike: 0,
        amountDislike: 0,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.log('error', 'Ops... Algo deu errado, tente novamente');
    } finally {
      setIsCommenting(false);
    }
  };

  // Efetua o like
  const likeComment = useCallback(async (userId: string, commentId: string) => {
    setIsLiking(true);

    try {
      await firestore()
        .doc(`Comments/${commentId}`)
        .update({
          amountLike: firestore.FieldValue.increment(1),
          likes: firestore.FieldValue.arrayUnion({ userId, type: 'like' }),
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLiking(false);
    }
  }, []);

  // Efetua o dislike
  const dislikeComment = useCallback(async (userId: string, commentId: string) => {
    setIsLiking(true);

    try {
      await firestore()
        .doc(`Comments/${commentId}`)
        .update({
          amountDislike: firestore.FieldValue.increment(1),
          likes: firestore.FieldValue.arrayUnion({ userId, type: 'dislike' }),
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLiking(false);
    }
  }, []);

  return {
    comments,
    isLiking,
    isCommenting,
    addComment,
    getComments,
    gettingComments,
    likeComment,
    dislikeComment,
  };
}

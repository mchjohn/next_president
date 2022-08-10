import { useCallback, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { IComment } from '@src/constants/comment';

/** Hook utilizado para salvar e buscar comentários no firestore. */
export function useComments() {
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [gettingComments, setGettingComments] = useState(false);

  // Busca todos os comentários
  const getComments = useCallback(async () => {
    setGettingComments(true);

    try {
      firestore()
        .collection('Comments')
        .orderBy('createdAt', 'desc')
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

  // Efetua o like/dislike
  const toggleLikeComment = useCallback(
    async (
      userId: string,
      commentId: string,
      amountLike: number,
      amountDislike: number,
      type: 'like' | 'dislike',
    ) => {
      setIsLiking(true);

      try {
        await firestore()
          .doc(`Comments/${commentId}`)
          .update({
            amountLike:
              type === 'like'
                ? firestore.FieldValue.increment(1)
                : firestore.FieldValue.increment(amountLike < 1 ? 0 : -1),
            amountDislike:
              type === 'dislike'
                ? firestore.FieldValue.increment(1)
                : firestore.FieldValue.increment(amountDislike < 1 ? 0 : -1),
            likes: firestore.FieldValue.arrayUnion({ userId, type }),
          });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLiking(false);
      }
    },
    [],
  );

  return {
    comments,
    isLiking,
    isCommenting,
    addComment,
    getComments,
    gettingComments,
    toggleLikeComment,
  };
}

import { useCallback, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { IComment } from '@src/constants/comment';

/** Hook utilizado para salvar e buscar comentários no firestore. */
export function useComments() {
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
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.log('error', 'Ops... Algo deu errado, tente novamente');
    } finally {
      setIsCommenting(false);
    }
  };

  return { comments, isCommenting, gettingComments, addComment, getComments };
}

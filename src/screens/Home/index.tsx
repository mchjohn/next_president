import React, { useEffect, useState } from 'react';

import { useStorage } from '@hooks/useStorage';
import { useCandidates } from '@hooks/useCandidates';

import { Header } from '@components/Header';
import { CandidateList } from '@components/CandidateList';

export function Home() {
  const [candidateVoted, setCandidateVoted] = useState('');

  const { getStoreData } = useStorage();
  const { candidates, getCandidates } = useCandidates();

  useEffect(() => {
    (async () => {
      const data = await getStoreData();

      setCandidateVoted(data ? data : '');
    })();
  }, [getStoreData]);

  useEffect(() => {
    getCandidates();
  }, [getCandidates]);

  return (
    <>
      <Header />

      <CandidateList candidates={candidates} candidateVoted={candidateVoted} />
    </>
  );
}

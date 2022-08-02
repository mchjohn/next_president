import React, { useEffect } from 'react';

import { useUserAuth } from '@hooks/useUserAuth';
import { useCandidates } from '@hooks/useCandidates';

import { Header } from '@components/Header';
import { CandidateList } from '@components/CandidateList';

export function Home() {
  const { user } = useUserAuth();
  const { candidates, getCandidates } = useCandidates();

  useEffect(() => {
    getCandidates();
  }, [getCandidates]);

  return (
    <>
      <Header />

      <CandidateList candidates={candidates} user={user} />
    </>
  );
}

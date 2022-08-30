import React, { useEffect } from 'react';

import { useCandidates } from '@hooks/useCandidates';

import { Header } from '@components/Header';
import { SignIn } from '@components/SignIn';
import { GlobalButton } from '@components/GlobalButton';
import { SkeletonList } from '@components/SkeletonList';
import { CandidateList } from '@components/CandidateList';

export function Home() {
  const { candidates, getCandidates } = useCandidates();

  useEffect(() => {
    getCandidates();
  }, [getCandidates]);

  return (
    <>
      <Header />

      {!candidates.length ? <SkeletonList /> : <CandidateList candidates={candidates} />}

      <SignIn />

      <GlobalButton />
    </>
  );
}

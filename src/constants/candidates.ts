export interface ICandidate {
  id: string;
  name: string;
  party: string;
  avatar: string;
  fullName: string;
  qtdVotes: number;
  numberCandidate: string;
  voters?: [
    {
      voterId: string;
      candidateId: string;
    },
  ];
}

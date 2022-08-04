import { Platform } from 'react-native';
import Analytics from 'appcenter-analytics';

type candidate = {
  id: string;
  name: string;
};

const __voteCandidatePressed = (userId: string, candidate: candidate, whereWasCalled: string) => {
  Analytics.trackEvent('Vote button pressed', {
    os: Platform.OS,
    userId: userId!,
    component: whereWasCalled,
    candidateId: candidate.id,
    candidateName: candidate.name,
  });
};

const __newUserIsLogged = (userId: string, whereWasCalled: string) => {
  Analytics.trackEvent('User has logged out', {
    os: Platform.OS,
    userId: userId!,
    component: whereWasCalled,
  });
};

export { __newUserIsLogged, __voteCandidatePressed };

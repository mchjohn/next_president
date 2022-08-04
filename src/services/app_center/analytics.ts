import { Platform } from 'react-native';
import Analytics from 'appcenter-analytics';

type candidate = {
  id: string;
  name: string;
};

const __voteCandidatePressed = (candidate: candidate, whereWasCalled: string) => {
  Analytics.trackEvent('Vote button pressed', {
    os: Platform.OS,
    component: whereWasCalled,
    candidateId: candidate.id,
    candidateName: candidate.name,
  });
};

const __newUserIsLogged = (whereWasCalled: string) => {
  Analytics.trackEvent('User has logged out', {
    os: Platform.OS,
    component: whereWasCalled,
  });
};

export { __newUserIsLogged, __voteCandidatePressed };

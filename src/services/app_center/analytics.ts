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

const __getError = (error: any, whereWasCalled: string) => {
  Analytics.trackEvent('An error has occurred', {
    os: Platform.OS,
    error: error,
    component: whereWasCalled,
  });
};

export { __getError, __voteCandidatePressed };

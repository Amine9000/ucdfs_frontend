export type PasswordScoreType = {
  score: number;
  passwordProps: {
    length: boolean;
    upperCase: boolean;
    lowerCase: boolean;
    number: boolean;
    specialChar: boolean;
  };
};

export function calculatePasswordScore(password: string) {
  const scoreData: PasswordScoreType = {
    score: 0,
    passwordProps: {
      length: false,
      upperCase: false,
      lowerCase: false,
      number: false,
      specialChar: false,
    },
  };

  if (password.length >= 8) {
    scoreData.score += 2;
    scoreData.passwordProps.length = true;
  }

  if (/[A-Z]/.test(password)) {
    scoreData.score += 2;
    scoreData.passwordProps.upperCase = true;
  }

  if (/[a-z]/.test(password)) {
    scoreData.score += 2;
    scoreData.passwordProps.lowerCase = true;
  }

  if (/[0-9]/.test(password)) {
    scoreData.score += 2;
    scoreData.passwordProps.number = true;
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    scoreData.score += 2;
    scoreData.passwordProps.specialChar = true;
  }

  return scoreData;
}

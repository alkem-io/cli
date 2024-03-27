import { UpdateFormInput } from '../generated/graphql';

export const challengeCommunityApplicationForm: UpdateFormInput = {
  description: 'wow',
  questions: [
    {
      question: 'Waarom wil je lid worden van deze Community?',
      required: true,
      sortOrder: 1,
      explanation: '',
      maxLength: 500,
    },
    {
      question:
        'Is er al een bepaalde rol of bijdrage die je in gedachte hebt?',
      required: false,
      sortOrder: 2,
      explanation: '',
      maxLength: 500,
    },
    {
      question:
        'Door welke gebruiker, organisatie or andere bron ben je bekend geraakt met deze Community?',
      required: false,
      sortOrder: 3,
      explanation: '',
      maxLength: 500,
    },
    {
      question: 'Wil je iets leuks vertellen over jezelf?!',
      required: false,
      sortOrder: 4,
      explanation: '',
      maxLength: 500,
    },
  ],
};

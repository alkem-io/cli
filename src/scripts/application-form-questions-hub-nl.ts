import { UpdateFormInput } from '../generated/graphql';

export const hubCommunityApplicationForm: UpdateFormInput = {
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
      question: 'Is er al een bepaalde rol of bijdrage dat je in gedachte heb?',
      required: false,
      sortOrder: 2,
      explanation: '',
      maxLength: 500,
    },
    {
      question:
        'Door welke gebruiker, organisatie or andere bron ben je bekend geworden met deze Community?',
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
    {
      question:
        'Wil je al lid worden van een van de Challenges in deze Community? Als ja, dan graag de naam van de Challenge(s) hier melden.',
      required: false,
      sortOrder: 5,
      explanation: '',
      maxLength: 500,
    },
  ],
};

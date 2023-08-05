export interface Question {
    questionId: string,
    questionText: string,
    category: string,
    difficulty: string,
    tags: string[],
    gameCount: number,
    checked?: boolean,
    questionAnswers: {
      answerText: string,
      isCorrect: boolean
    }[]
  }

const questionsData: Question[] = [        {
  questionId: "q1",
  questionText: "What is the capital of France?",
  category: "Geography",
  difficulty: "Easy",
  tags: ["France", "Capital", "Geography", "Cities"],
  checked: false,
  gameCount: 100,
  questionAnswers: [
    {
      answerText: "Berlin",
      isCorrect: false,
    },
    {
      answerText: "Paris",
      isCorrect: true,
    },
    {
      answerText: "London",
      isCorrect: false,
    },
    {
      answerText: "Rome",
      isCorrect: false,
    },
  ]
},
{
  questionId: "q2",
questionText: "Which planet is known as the Red Planet?",
category: "Space",
difficulty: "Medium",
tags: ["Space", "Planets", "Astronomy"],
checked: false,
gameCount: 75,
questionAnswers: [
  {
    answerText: "Venus",
    isCorrect: false,
  },
  {
    answerText: "Mars",
    isCorrect: true,
  },
  {
    answerText: "Jupiter",
    isCorrect: false,
  },
  {
    answerText: "Saturn",
    isCorrect: false,
  },
],
},
{
  questionId: "q3",
  questionText: "What is the capital of France?",
  category: "Geography",
  difficulty: "Easy",
  tags: ["France", "Capital", "Geography", "Cities"],
checked: false,
  gameCount: 100,
  questionAnswers: [
    {
      answerText: "Berlin",
      isCorrect: false,
    },
    {
      answerText: "Paris",
      isCorrect: true,
    },
    {
      answerText: "London",
      isCorrect: false,
    },
    {
      answerText: "Rome",
      isCorrect: false,
    },
  ]
},
{
  questionId: "q4",
questionText: "Which planet is known as the Red Planet?",
category: "Space",
difficulty: "Medium",
tags: ["Space", "Planets", "Astronomy"],
checked: false,
gameCount: 75,
questionAnswers: [
  {
    answerText: "Venus",
    isCorrect: false,
  },
  {
    answerText: "Mars",
    isCorrect: true,
  },
  {
    answerText: "Jupiter",
    isCorrect: false,
  },
  {
    answerText: "Saturn",
    isCorrect: false,
  },
],
},
{
  questionId: "q5",
  questionText: "What is the capital of France?",
  category: "Geography",
  difficulty: "Easy",
  tags: ["France", "Capital", "Geography", "Cities"],
checked: false,
  gameCount: 100,
  questionAnswers: [
    {
      answerText: "Berlin",
      isCorrect: false,
    },
    {
      answerText: "Paris",
      isCorrect: true,
    },
    {
      answerText: "London",
      isCorrect: false,
    },
    {
      answerText: "Rome",
      isCorrect: false,
    },
  ]
},
{
  questionId: "q6",
questionText: "Which planet is known as the Red Planet?",
category: "Space",
difficulty: "Medium",
tags: ["Space", "Planets", "Astronomy"],
checked: false,
gameCount: 75,
questionAnswers: [
  {
    answerText: "Venus",
    isCorrect: false,
  },
  {
    answerText: "Mars",
    isCorrect: true,
  },
  {
    answerText: "Jupiter",
    isCorrect: false,
  },
  {
    answerText: "Saturn",
    isCorrect: false,
  },
],
},
{
  questionId: "q7",
  questionText: "What is the capital of France?",
  category: "Geography",
  difficulty: "Easy",
  tags: ["France", "Capital", "Geography", "Cities"],
checked: false,
  gameCount: 100,
  questionAnswers: [
    {
      answerText: "Berlin",
      isCorrect: false,
    },
    {
      answerText: "Paris",
      isCorrect: true,
    },
    {
      answerText: "London",
      isCorrect: false,
    },
    {
      answerText: "Rome",
      isCorrect: false,
    },
  ]
},
{
  questionId: "q8",
questionText: "Which planet is known as the Red Planet?",
category: "Space",
difficulty: "Medium",
tags: ["Space", "Planets", "Astronomy"],
checked: false,
gameCount: 75,
questionAnswers: [
  {
    answerText: "Venus",
    isCorrect: false,
  },
  {
    answerText: "Mars",
    isCorrect: true,
  },
  {
    answerText: "Jupiter",
    isCorrect: false,
  },
  {
    answerText: "Saturn",
    isCorrect: false,
  },
],
},
{
  questionId: "q9",
  questionText: "What is the capital of France?",
  category: "Geography",
  difficulty: "Easy",
  tags: ["France", "Capital", "Geography", "Cities"],
checked: false,
  gameCount: 100,
  questionAnswers: [
    {
      answerText: "Berlin",
      isCorrect: false,
    },
    {
      answerText: "Paris",
      isCorrect: true,
    },
    {
      answerText: "London",
      isCorrect: false,
    },
    {
      answerText: "Rome",
      isCorrect: false,
    },
  ]
},
{
  questionId: "q10",
questionText: "Which planet is known as the Red Planet?",
category: "Space",
difficulty: "Medium",
tags: ["Space", "Planets", "Astronomy"],
checked: false,
gameCount: 75,
questionAnswers: [
  {
    answerText: "Venus",
    isCorrect: false,
  },
  {
    answerText: "Mars",
    isCorrect: true,
  },
  {
    answerText: "Jupiter",
    isCorrect: false,
  },
  {
    answerText: "Saturn",
    isCorrect: false,
  },
],
},
{
  questionId: "q11",
  questionText: "What is the capital of France?",
  category: "Geography",
  difficulty: "Easy",
  tags: ["France", "Capital", "Geography", "Cities"],
checked: false,
  gameCount: 100,
  questionAnswers: [
    {
      answerText: "Berlin",
      isCorrect: false,
    },
    {
      answerText: "Paris",
      isCorrect: true,
    },
    {
      answerText: "London",
      isCorrect: false,
    },
    {
      answerText: "Rome",
      isCorrect: false,
    },
  ]
},
{
  questionId: "q12",
questionText: "Which planet is known as the Red Planet?",
category: "Space",
difficulty: "Medium",
tags: ["Space", "Planets", "Astronomy"],
checked: false,
gameCount: 75,
questionAnswers: [
  {
    answerText: "Venus",
    isCorrect: false,
  },
  {
    answerText: "Mars",
    isCorrect: true,
  },
  {
    answerText: "Jupiter",
    isCorrect: false,
  },
  {
    answerText: "Saturn",
    isCorrect: false,
  },
],
},
{
  questionId: "q13",
  questionText: "What is the capital of France?",
  category: "Geography",
  difficulty: "Easy",
  tags: ["France", "Capital", "Geography", "Cities"],
checked: false,
  gameCount: 100,
  questionAnswers: [
    {
      answerText: "Berlin",
      isCorrect: false,
    },
    {
      answerText: "Paris",
      isCorrect: true,
    },
    {
      answerText: "London",
      isCorrect: false,
    },
    {
      answerText: "Rome",
      isCorrect: false,
    },
  ]
},
{
  questionId: "q14",
questionText: "Which planet is known as the Red Planet?",
category: "Space",
difficulty: "Medium",
tags: ["Space", "Planets", "Astronomy"],
checked: false,
gameCount: 75,
questionAnswers: [
  {
    answerText: "Venus",
    isCorrect: false,
  },
  {
    answerText: "Mars",
    isCorrect: true,
  },
  {
    answerText: "Jupiter",
    isCorrect: false,
  },
  {
    answerText: "Saturn",
    isCorrect: false,
  },
],
},
{
  questionId: "q15",
  questionText: "What is the capital of France?",
  category: "Geography",
  difficulty: "Easy",
  tags: ["France", "Capital", "Geography", "Cities"],
checked: false,
  gameCount: 100,
  questionAnswers: [
    {
      answerText: "Berlin",
      isCorrect: false,
    },
    {
      answerText: "Paris",
      isCorrect: true,
    },
    {
      answerText: "London",
      isCorrect: false,
    },
    {
      answerText: "Rome",
      isCorrect: false,
    },
  ]
},
{
  questionId: "q16",
questionText: "Which planet is known as the Red Planet?",
category: "Space",
difficulty: "Medium",
tags: ["Space", "Planets", "Astronomy"],
checked: false,
gameCount: 75,
questionAnswers: [
  {
    answerText: "Venus",
    isCorrect: false,
  },
  {
    answerText: "Mars",
    isCorrect: true,
  },
  {
    answerText: "Jupiter",
    isCorrect: false,
  },
  {
    answerText: "Saturn",
    isCorrect: false,
  },
],
},
{
  questionId: "q17",
  questionText: "What is the capital of France?",
  category: "Geography",
  difficulty: "Easy",
  tags: ["France", "Capital", "Geography", "Cities"],
checked: false,
  gameCount: 100,
  questionAnswers: [
    {
      answerText: "Berlin",
      isCorrect: false,
    },
    {
      answerText: "Paris",
      isCorrect: true,
    },
    {
      answerText: "London",
      isCorrect: false,
    },
    {
      answerText: "Rome",
      isCorrect: false,
    },
  ]
},
{
  questionId: "q18",
questionText: "Which planet is known as the Red Planet?",
category: "Space",
difficulty: "Medium",
tags: ["Space", "Planets", "Astronomy"],
checked: false,
gameCount: 75,
questionAnswers: [
  {
    answerText: "Venus",
    isCorrect: false,
  },
  {
    answerText: "Mars",
    isCorrect: true,
  },
  {
    answerText: "Jupiter",
    isCorrect: false,
  },
  {
    answerText: "Saturn",
    isCorrect: false,
  },
],
}]

export {questionsData}
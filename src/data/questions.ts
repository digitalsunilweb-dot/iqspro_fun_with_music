import { QuizQuestion, ClassGroupId, SubjectId } from '../types';

export const QUESTION_BANK: QuizQuestion[] = [
  // ================= PRESCHOOL =================
  {
    id: 'pre_m1',
    subjectId: 'math',
    gradeGroup: 'preschool',
    question: 'How many apples are there if you have 2 red apples and 1 green apple?',
    options: ['2', '3', '4', '1'],
    correctAnswer: '3',
    difficulty: 'Easy',
    hint: 'Count them: one, two, and one more!'
  },
  {
    id: 'pre_m2',
    subjectId: 'math',
    gradeGroup: 'preschool',
    question: 'Which shape has 3 corners and 3 straight sides?',
    options: ['Square', 'Circle', 'Triangle', 'Rectangle'],
    correctAnswer: 'Triangle',
    difficulty: 'Easy',
    hint: 'Tri- means three, like a tricycle!'
  },
  {
    id: 'pre_e1',
    subjectId: 'english',
    gradeGroup: 'preschool',
    question: 'Which letter does the word "APPLE" start with?',
    options: ['A', 'B', 'P', 'E'],
    correctAnswer: 'A',
    difficulty: 'Easy',
    hint: 'A is for Apple, B is for Ball...'
  },
  {
    id: 'pre_e2',
    subjectId: 'english',
    gradeGroup: 'preschool',
    question: 'What is the opposite word of "BIG"?',
    options: ['Giant', 'Tall', 'Small', 'Heavy'],
    correctAnswer: 'Small',
    difficulty: 'Easy',
    hint: 'Think of an elephant versus an ant!'
  },
  {
    id: 'pre_s1',
    subjectId: 'science',
    gradeGroup: 'preschool',
    question: 'Where do birds fly and live?',
    options: ['In the water', 'In the sky and trees', 'Underground', 'In a cave'],
    correctAnswer: 'In the sky and trees',
    difficulty: 'Easy',
    hint: 'They have wings to flap up high!'
  },
  {
    id: 'pre_s2',
    subjectId: 'science',
    gradeGroup: 'preschool',
    question: 'Which of the following is NOT a living thing?',
    options: ['A puppy', 'A green plant', 'A toy car', 'A singing bird'],
    correctAnswer: 'A toy car',
    difficulty: 'Medium',
    hint: 'Living things grow, eat, and breathe. Toys do not!'
  },
  {
    id: 'pre_g1',
    subjectId: 'gk',
    gradeGroup: 'preschool',
    question: 'What is the color of the sky on a bright sunny day?',
    options: ['Green', 'Red', 'Blue', 'Yellow'],
    correctAnswer: 'Blue',
    difficulty: 'Easy',
    hint: 'It is the same color as the ocean.'
  },

  // ================= PRIMARY (CLASS 1 - 5) =================
  {
    id: 'pri_m1',
    subjectId: 'math',
    gradeGroup: 'primary',
    question: 'What is 15 + 27?',
    options: ['32', '42', '38', '45'],
    correctAnswer: '42',
    difficulty: 'Medium',
    hint: 'Try adding 10 first, then add the single digits (5 and 7).'
  },
  {
    id: 'pri_m2',
    subjectId: 'math',
    gradeGroup: 'primary',
    question: 'If a box has 5 packets, and each packet has 6 chocolates, how many chocolates are there in total?',
    options: ['11', '25', '30', '35'],
    correctAnswer: '30',
    difficulty: 'Medium',
    hint: 'Multiply 5 times 6!'
  },
  {
    id: 'pri_e1',
    subjectId: 'english',
    gradeGroup: 'primary',
    question: 'Identify the noun in this sentence: "The happy boy jumped over the fence."',
    options: ['happy', 'boy', 'jumped', 'over'],
    correctAnswer: 'boy',
    difficulty: 'Medium',
    hint: 'A noun is a person, place, or thing.'
  },
  {
    id: 'pri_s1',
    subjectId: 'science',
    gradeGroup: 'primary',
    question: 'What do plants need most to make their own food through photosynthesis?',
    options: ['Milk', 'Sunlight, Water, and Carbon Dioxide', 'Sugar and Salt', 'Soil only'],
    correctAnswer: 'Sunlight, Water, and Carbon Dioxide',
    difficulty: 'Medium',
    hint: 'They catch rays from the Sun and drink water through their roots.'
  },
  {
    id: 'pri_c1',
    subjectId: 'computer',
    gradeGroup: 'primary',
    question: 'Which of these is the "brain" of the computer?',
    options: ['Monitor', 'Keyboard', 'Mouse', 'CPU'],
    correctAnswer: 'CPU',
    difficulty: 'Easy',
    hint: 'It stands for Central Processing Unit.'
  },
  {
    id: 'pri_cod1',
    subjectId: 'coding',
    gradeGroup: 'primary',
    question: 'In coding, what is a "loop" used for?',
    options: ['To stop the program', 'To repeat a set of actions', 'To change colors', 'To save a file'],
    correctAnswer: 'To repeat a set of actions',
    difficulty: 'Medium',
    hint: 'Think of going in circles or doing a dance step again and again.'
  },
  {
    id: 'pri_r1',
    subjectId: 'reasoning',
    gradeGroup: 'primary',
    question: 'Complete the pattern: 2, 4, 8, 16, ?',
    options: ['20', '24', '32', '64'],
    correctAnswer: '32',
    difficulty: 'Medium',
    hint: 'Each number is double the previous number.'
  },

  // ================= MIDDLE SCHOOL (CLASS 6 - 8) =================
  {
    id: 'mid_m1',
    subjectId: 'math',
    gradeGroup: 'middle',
    question: 'Solve for x: 3x - 7 = 14',
    options: ['x = 5', 'x = 7', 'x = 3', 'x = 9'],
    correctAnswer: 'x = 7',
    difficulty: 'Medium',
    hint: 'Add 7 to both sides, then divide by 3.'
  },
  {
    id: 'mid_s1',
    subjectId: 'science',
    gradeGroup: 'middle',
    question: 'Which organelle is known as the powerhouse of the cell?',
    options: ['Nucleus', 'Chloroplast', 'Mitochondria', 'Ribosome'],
    correctAnswer: 'Mitochondria',
    difficulty: 'Medium',
    hint: 'It generates chemical energy (ATP) for cellular processes.'
  },
  {
    id: 'mid_s2',
    subjectId: 'science',
    gradeGroup: 'middle',
    question: 'What is the chemical formula for water?',
    options: ['CO2', 'H2O', 'NaCl', 'O2'],
    correctAnswer: 'H2O',
    difficulty: 'Easy',
    hint: 'Two Hydrogen atoms and one Oxygen atom.'
  },
  {
    id: 'mid_cod1',
    subjectId: 'coding',
    gradeGroup: 'middle',
    question: 'What type of data is used to store text in programming?',
    options: ['Integer', 'Boolean', 'String', 'Float'],
    correctAnswer: 'String',
    difficulty: 'Easy',
    hint: 'It is a sequence/string of text characters, usually wrapped in quotes.'
  },
  {
    id: 'mid_c1',
    subjectId: 'computer',
    gradeGroup: 'middle',
    question: 'What does WWW stand for in a website address?',
    options: ['Wide Word Web', 'World Wide Web', 'World Wide Wireless', 'Web Wire World'],
    correctAnswer: 'World Wide Web',
    difficulty: 'Easy',
    hint: 'Invented by Tim Berners-Lee to connect pages over the internet.'
  },
  {
    id: 'mid_r1',
    subjectId: 'reasoning',
    gradeGroup: 'middle',
    question: 'If CAT is coded as 3120, how is DOG coded? (Hint: positional values of letters A=1, B=2...)',
    options: ['4157', '4147', '5157', '4158'],
    correctAnswer: '4157',
    difficulty: 'Hard',
    hint: 'D is 4th, O is 15th, G is 7th in the alphabet.'
  },

  // ================= SECONDARY (CLASS 9 - 10) =================
  {
    id: 'sec_m1',
    subjectId: 'math',
    gradeGroup: 'secondary',
    question: 'What is the value of sin(30°) + cos(60°)?',
    options: ['0.5', '1', '1.5', 'sqrt(3)/2'],
    correctAnswer: '1',
    difficulty: 'Medium',
    hint: 'sin(30°) = 1/2 and cos(60°) = 1/2.'
  },
  {
    id: 'sec_s1',
    subjectId: 'science',
    gradeGroup: 'secondary',
    question: 'Which of Newton\'s laws of motion states that "For every action, there is an equal and opposite reaction"?',
    options: ['First Law', 'Second Law', 'Third Law', 'Law of Gravitation'],
    correctAnswer: 'Third Law',
    difficulty: 'Easy',
    hint: 'Think of a rocket booster pushing down to move upwards!'
  },
  {
    id: 'sec_s2',
    subjectId: 'science',
    gradeGroup: 'secondary',
    question: 'Which element is liquid at room temperature?',
    options: ['Iron', 'Mercury', 'Sodium', 'Helium'],
    correctAnswer: 'Mercury',
    difficulty: 'Medium',
    hint: 'Its chemical symbol is Hg and it is used in traditional thermometers.'
  },
  {
    id: 'sec_cod1',
    subjectId: 'coding',
    gradeGroup: 'secondary',
    question: 'Which of the following is a key characteristic of an Object-Oriented Programming (OOP) language?',
    options: ['Manual hardware registry tuning', 'Inheritance, Encapsulation, and Polymorphism', 'Absence of data variables', 'Line-by-line assembly execution only'],
    correctAnswer: 'Inheritance, Encapsulation, and Polymorphism',
    difficulty: 'Medium',
    hint: 'These allow developers to create classes, protect data, and reuse structures.'
  },
  {
    id: 'sec_r1',
    subjectId: 'reasoning',
    gradeGroup: 'secondary',
    question: 'Pointing to a photograph, a man said, "I have no brother or sister but that man\'s father is my father\'s son." Whose photograph was it?',
    options: ['His own', 'His son\'s', 'His father\'s', 'His nephew\'s'],
    correctAnswer: 'His son\'s',
    difficulty: 'Hard',
    hint: '"My father\'s son" is the man himself (since he has no siblings). So "that man\'s father is me."'
  },

  // ================= SENIOR SECONDARY (CLASS 11 - 12) =================
  {
    id: 'sen_m1',
    subjectId: 'math',
    gradeGroup: 'senior_secondary',
    question: 'What is the derivative of f(x) = ln(x) + e^(2x) with respect to x?',
    options: ['1/x + e^(2x)', '1/x + 2e^(2x)', 'ln(x) + 2e^(2x)', '1/x + e^x'],
    correctAnswer: '1/x + 2e^(2x)',
    difficulty: 'Hard',
    hint: 'Use the derivative rule d/dx[ln(x)] = 1/x and the chain rule for e^(2x).'
  },
  {
    id: 'sen_s1',
    subjectId: 'science',
    gradeGroup: 'senior_secondary',
    question: 'What is the major force that keeps protons and neutrons bound together in an atom\'s nucleus?',
    options: ['Gravitational Force', 'Electromagnetic Force', 'Strong Nuclear Force', 'Weak Nuclear Force'],
    correctAnswer: 'Strong Nuclear Force',
    difficulty: 'Medium',
    hint: 'It is the strongest of the four fundamental forces of nature.'
  },
  {
    id: 'sen_cod1',
    subjectId: 'coding',
    gradeGroup: 'senior_secondary',
    question: 'What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?',
    options: ['O(1)', 'O(N)', 'O(log N)', 'O(N log N)'],
    correctAnswer: 'O(log N)',
    difficulty: 'Hard',
    hint: 'Each comparison cuts the remaining search space in half.'
  },
  {
    id: 'sen_g1',
    subjectId: 'gk',
    gradeGroup: 'senior_secondary',
    question: 'Which international agreement, signed in 1987, was designed to protect the ozone layer by phasing out substances like CFCs?',
    options: ['Kyoto Protocol', 'Paris Agreement', 'Montreal Protocol', 'Geneva Convention'],
    correctAnswer: 'Montreal Protocol',
    difficulty: 'Hard',
    hint: 'Named after a major city in Quebec, Canada.'
  }
];

export function generateDynamicQuestions(group: ClassGroupId, subject: SubjectId, count: number): QuizQuestion[] {
  const list: QuizQuestion[] = [];
  
  const antonyms = [
    ['happy', 'sad'], ['ancient', 'modern'], ['brave', 'cowardly'], ['swift', 'slow'], ['heavy', 'light'],
    ['sharp', 'dull'], ['rough', 'smooth'], ['bright', 'dim'], ['wild', 'tame'], ['noisy', 'quiet'],
    ['strong', 'weak'], ['sweet', 'sour'], ['bitter', 'sweet'], ['hot', 'cold'], ['wet', 'dry'],
    ['easy', 'difficult'], ['cheap', 'expensive'], ['empty', 'full'], ['clean', 'dirty'], ['simple', 'complex'],
    ['tight', 'loose'], ['deep', 'shallow'], ['wide', 'narrow'], ['near', 'far'], ['high', 'low'],
    ['rich', 'poor'], ['young', 'old'], ['true', 'false'], ['correct', 'incorrect'], ['safe', 'dangerous']
  ];

  const synonyms = [
    ['quick', 'fast'], ['huge', 'large'], ['tiny', 'small'], ['smart', 'intelligent'], ['angry', 'furious'],
    ['happy', 'joyful'], ['silent', 'quiet'], ['brave', 'courageous'], ['correct', 'right'], ['difficult', 'hard'],
    ['easy', 'simple'], ['wealthy', 'rich'], ['choose', 'select'], ['gather', 'collect'], ['finish', 'complete'],
    ['begin', 'start'], ['sad', 'unhappy'], ['tidy', 'clean'], ['scared', 'afraid'], ['speak', 'talk']
  ];

  const collectives = [
    ['lions', 'pride'], ['wolves', 'pack'], ['birds', 'flock'], ['fish', 'school'], ['bees', 'swarm'],
    ['sheep', 'flock'], ['elephants', 'herd'], ['ants', 'colony'], ['cows', 'herd'], ['dogs', 'pack']
  ];

  const plurals = [
    ['child', 'children'], ['tooth', 'teeth'], ['foot', 'feet'], ['mouse', 'mice'], ['man', 'men'],
    ['woman', 'women'], ['goose', 'geese'], ['ox', 'oxen'], ['person', 'people'], ['knife', 'knives']
  ];

  const verbs = [
    ['go', 'went'], ['eat', 'ate'], ['run', 'ran'], ['see', 'saw'], ['write', 'wrote'],
    ['speak', 'spoke'], ['take', 'took'], ['do', 'did'], ['buy', 'bought'], ['catch', 'caught'],
    ['bring', 'brought'], ['teach', 'taught'], ['think', 'thought'], ['know', 'knew'], ['find', 'found']
  ];

  const prepositions = [
    ['He is interested ___ science.', 'in', 'on', 'at', 'with'],
    ['She is waiting ___ the bus.', 'for', 'to', 'at', 'with'],
    ['The cat jumped ___ the table.', 'onto', 'in', 'under', 'by'],
    ['They are traveling ___ train.', 'by', 'with', 'on', 'in'],
    ['I have been working here ___ 2020.', 'since', 'for', 'from', 'during'],
    ['He lives ___ New Delhi.', 'in', 'at', 'on', 'to'],
    ['Divide the sweets ___ the two children.', 'between', 'among', 'with', 'to'],
    ['Divide the sweets ___ the five friends.', 'among', 'between', 'with', 'for']
  ];

  const organs = [
    ['Heart', 'Circulatory System'], ['Lungs', 'Respiratory System'], ['Brain', 'Nervous System'],
    ['Stomach', 'Digestive System'], ['Kidneys', 'Excretory System'], ['Bones', 'Skeletal System'],
    ['Muscles', 'Muscular System'], ['Skin', 'Integumentary System']
  ];

  const elements = [
    ['Hydrogen', 'H'], ['Helium', 'He'], ['Lithium', 'Li'], ['Carbon', 'C'], ['Nitrogen', 'N'],
    ['Oxygen', 'O'], ['Fluorine', 'F'], ['Neon', 'Ne'], ['Sodium', 'Na'], ['Magnesium', 'Mg'],
    ['Aluminum', 'Al'], ['Silicon', 'Si'], ['Phosphorus', 'P'], ['Sulfur', 'S'], ['Chlorine', 'Cl'],
    ['Argon', 'Ar'], ['Potassium', 'K'], ['Calcium', 'Ca'], ['Iron', 'Fe'], ['Copper', 'Cu'],
    ['Zinc', 'Zn'], ['Silver', 'Ag'], ['Gold', 'Au']
  ];

  const planets = [
    ['Mercury', 'closest planet to the Sun'], ['Venus', 'hottest planet in our solar system'],
    ['Earth', 'only planet known to support life'], ['Mars', 'known as the Red Planet'],
    ['Jupiter', 'largest planet in our solar system'], ['Saturn', 'famous for its spectacular ring system'],
    ['Uranus', 'ice giant that rotates on its side'], ['Neptune', 'farthest planet from the Sun in our solar system']
  ];

  const units = [
    ['Force', 'Newton'], ['Power', 'Watt'], ['Energy', 'Joule'], ['Electric Current', 'Ampere'],
    ['Voltage', 'Volt'], ['Resistance', 'Ohm'], ['Frequency', 'Hertz'], ['Pressure', 'Pascal'],
    ['Temperature', 'Kelvin'], ['Luminous Intensity', 'Candela']
  ];

  const animals = [
    ['frog', 'tadpole', 'croaks', 'pond'], ['dog', 'puppy', 'barks', 'kennel'],
    ['cat', 'kitten', 'meows', 'house'], ['lion', 'cub', 'roars', 'den'],
    ['horse', 'foal', 'neighs', 'stable'], ['cow', 'calf', 'moos', 'barn'],
    ['sheep', 'lamb', 'bleats', 'pen'], ['duck', 'duckling', 'quacks', 'pond']
  ];

  const vitamins = [
    ['Vitamin A', 'Night Blindness'], ['Vitamin B1', 'Beriberi'], ['Vitamin C', 'Scurvy'],
    ['Vitamin D', 'Rickets'], ['Iron', 'Anemia'], ['Calcium', 'Weak bones and teeth'], ['Iodine', 'Goitre']
  ];

  const states = [
    ['liquid to gas', 'Evaporation'], ['gas to liquid', 'Condensation'],
    ['solid to liquid', 'Melting'], ['liquid to solid', 'Freezing'], ['solid to gas', 'Sublimation']
  ];

  const capitals = [
    ['India', 'New Delhi'], ['France', 'Paris'], ['Japan', 'Tokyo'], ['Egypt', 'Cairo'],
    ['Australia', 'Canberra'], ['Canada', 'Ottawa'], ['United Kingdom', 'London'], ['Germany', 'Berlin'],
    ['Italy', 'Rome'], ['Brazil', 'Brasilia'], ['Russia', 'Moscow'], ['China', 'Beijing'],
    ['South Africa', 'Pretoria'], ['Spain', 'Madrid'], ['United States', 'Washington, D.C.'],
    ['Mexico', 'Mexico City'], ['Argentina', 'Buenos Aires'], ['Saudi Arabia', 'Riyadh'],
    ['South Korea', 'Seoul'], ['Turkey', 'Ankara']
  ];

  const currencies = [
    ['United States', 'US Dollar'], ['European Union', 'Euro'], ['Japan', 'Yen'],
    ['United Kingdom', 'Pound Sterling'], ['India', 'Indian Rupee'], ['Australia', 'Australian Dollar'],
    ['Canada', 'Canadian Dollar'], ['Switzerland', 'Swiss Franc'], ['China', 'Yuan'], ['South Africa', 'Rand']
  ];

  const superlatives = [
    ['longest river in the world', 'Nile River', 'Amazon River', 'Yangtze River', 'Mississippi River'],
    ['largest desert in the world', 'Sahara Desert', 'Gobi Desert', 'Kalahari Desert', 'Arabian Desert'],
    ['highest mountain in the world', 'Mount Everest', 'K2', 'Kangchenjunga', 'Lhotse'],
    ['smallest country in the world', 'Vatican City', 'Monaco', 'Nauru', 'Tuvalu'],
    ['deepest ocean on Earth', 'Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
    ['largest continent by land area', 'Asia', 'Africa', 'North America', 'Europe'],
    ['largest hot desert', 'Sahara Desert', 'Arabian Desert', 'Gobi Desert', 'Thar Desert']
  ];

  const inventions = [
    ['Telephone', 'Alexander Graham Bell', 'Thomas Edison', 'Nikola Tesla', 'Albert Einstein'],
    ['Electric Bulb', 'Thomas Edison', 'Benjamin Franklin', 'Nikola Tesla', 'Alexander Graham Bell'],
    ['Steam Engine', 'James Watt', 'George Stephenson', 'Robert Fulton', 'Eli Whitney'],
    ['Computer', 'Charles Babbage', 'Alan Turing', 'Bill Gates', 'Steve Jobs'],
    ['Airplane', 'Wright Brothers', 'Leonardo da Vinci', 'Galileo', 'Isaac Newton'],
    ['Radio', 'Guglielmo Marconi', 'Nikola Tesla', 'Heinrich Hertz', 'Michael Faraday']
  ];

  const landmarks = [
    ['Eiffel Tower', 'France'], ['Taj Mahal', 'India'], ['Statue of Liberty', 'United States'],
    ['Colosseum', 'Italy'], ['Great Wall', 'China'], ['Pyramids of Giza', 'Egypt'],
    ['Machu Picchu', 'Peru'], ['Sydney Opera House', 'Australia']
  ];

  const maleNames = ['Amit', 'Rahul', 'Rohan', 'Vijay', 'Sanjay', 'Arjun', 'Deepak', 'Aarav', 'Kabir', 'Aman', 'Raj', 'Vikram'];
  const femaleNames = ['Priya', 'Sonia', 'Anjali', 'Kiran', 'Ritu', 'Pooja', 'Neha', 'Kriti', 'Simran', 'Tina', 'Meera', 'Riya'];

  for (let i = 1; i <= count; i++) {
    const id = `dynamic_${group}_${subject}_${i}`;
    let question = "";
    let options: string[] = [];
    let correctAnswer = "";
    let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium';
    let hint = "";

    // Dynamic numeric seeds
    const num1 = i + 2;
    const num2 = (i % 12) + 2;
    const num3 = (i % 25) + 5;

    if (subject === 'math') {
      if (group === 'preschool') {
        const cat = i % 3;
        if (cat === 0) {
          const fruit = ['apples 🍎', 'bananas 🍌', 'oranges 🍊', 'shiny stars ⭐', 'balloons 🎈'][i % 5];
          const addVal = (i % 5) + 1;
          question = `If you have ${num2} ${fruit} and you get ${addVal} more, how many do you have in total?`;
          correctAnswer = String(num2 + addVal);
          options = [correctAnswer, String(num2 + addVal + 1), String(num2 + addVal - 1), String(num2 + addVal + 2)];
          difficulty = 'Easy';
          hint = `Try counting: start from ${num2} and count ${addVal} steps forward!`;
        } else if (cat === 1) {
          const toy = ['toy cars 🚗', 'teddy bears 🧸', 'blocks 🧱', 'colorful marbles 🔮'][i % 4];
          question = `You have ${num2 + 6} ${toy}. You give away ${num2} of them. How many ${toy} do you have left?`;
          correctAnswer = '6';
          options = ['6', '5', '4', '7'];
          difficulty = 'Easy';
          hint = `Count backward ${num2} steps from ${num2 + 6}!`;
        } else {
          const shapes = [['triangle', '3'], ['square', '4'], ['pentagon', '5'], ['circle', '0']];
          const choice = shapes[i % 4];
          const templates = [
            `Can you count how many corners a ${choice[0]} has?`,
            `Find the number of corners on a ${choice[0]}:`,
            `How many straight-line corners are there on a ${choice[0]}?`,
            `Identify the corners of a ${choice[0]}:`
          ];
          question = templates[i % 4];
          correctAnswer = choice[1];
          options = ['3', '4', '5', '0'];
          difficulty = 'Easy';
          hint = `Think of its shape. For example, a triangle has tri (three) sides and corners.`;
        }
      } else if (group === 'primary') {
        const cat = i % 3;
        if (cat === 0) {
          const mult1 = (i % 12) + 2;
          const mult2 = (i % 8) + 3;
          question = `What is the product of ${mult1} multiplied by ${mult2}?`;
          correctAnswer = String(mult1 * mult2);
          options = [correctAnswer, String(mult1 * mult2 + mult1), String(mult1 * mult2 - mult2), String(mult1 * mult2 + 4)];
          difficulty = 'Easy';
          hint = `You can add ${mult1} to itself ${mult2} times, or use multiplication tables.`;
        } else if (cat === 1) {
          question = `Solve the arithmetic operation: ${num1 + 15} - ${num2 * 2} + ${num3}`;
          correctAnswer = String((num1 + 15) - (num2 * 2) + num3);
          options = [
            correctAnswer,
            String((num1 + 15) - (num2 * 2) + num3 + 10),
            String((num1 + 15) - (num2 * 2) + num3 - 5),
            String((num1 + 15) - (num2 * 2) + num3 + 4)
          ];
          difficulty = 'Medium';
          hint = `First calculate ${num1 + 15} minus ${num2 * 2}, then add ${num3} to the result.`;
        } else {
          const name = maleNames[i % maleNames.length];
          const divVal = (i % 5) + 3; // 3 to 7
          const result = (i % 6) + 3; // 3 to 8
          question = `${name} has ${divVal * result} candies and wants to distribute them equally among ${divVal} friends. How many candies does each friend get?`;
          correctAnswer = String(result);
          options = [correctAnswer, String(result + 1), String(result - 1), String(result + 2)];
          difficulty = 'Easy';
          hint = `Divide ${divVal * result} by ${divVal}.`;
        }
      } else if (group === 'middle') {
        const cat = i % 3;
        if (cat === 0) {
          const coef = (i % 4) + 2;
          const constVal = (i % 6) + 1;
          const targetVal = coef * num2 + constVal;
          question = `Solve for x in the linear equation: ${coef}x + ${constVal} = ${targetVal}`;
          correctAnswer = `x = ${num2}`;
          options = [`x = ${num2}`, `x = ${num2 + 1}`, `x = ${num2 - 1}`, `x = ${num2 + 2}`];
          difficulty = 'Medium';
          hint = `Subtract ${constVal} from ${targetVal}, then divide the result by ${coef}.`;
        } else if (cat === 1) {
          const pct = [10, 20, 25, 50, 75][i % 5];
          const base = (i % 15 + 4) * 20; // 80 to 360
          question = `What is ${pct}% of ${base}?`;
          correctAnswer = String((pct * base) / 100);
          options = [
            correctAnswer,
            String((pct * base) / 100 + 10),
            String((pct * base) / 100 - 5),
            String((pct * base) / 100 + 15)
          ];
          difficulty = 'Medium';
          hint = `Multiply ${base} by ${pct} and divide the result by 100.`;
        } else {
          const ratio1 = (i % 3) + 2;
          const ratio2 = (i % 3) + 3;
          const factor = (i % 5) + 4;
          const total = (ratio1 + ratio2) * factor;
          question = `The ratio of boys to girls in a classroom is ${ratio1}:${ratio2}. If there are ${total} total students in the class, how many girls are there?`;
          correctAnswer = String(ratio2 * factor);
          options = [correctAnswer, String(ratio1 * factor), String((ratio1 + ratio2) * 2), String(ratio2 * factor + 5)];
          difficulty = 'Medium';
          hint = `Add the ratios (${ratio1} + ${ratio2} = ${ratio1 + ratio2}). Divide ${total} by ${ratio1 + ratio2} to find the factor, then multiply by ${ratio2}.`;
        }
      } else if (group === 'secondary') {
        const cat = i % 3;
        if (cat === 0) {
          const r1 = (i % 5) + 2;
          const r2 = (i % 4) + 3;
          const b = -(r1 + r2);
          const c = r1 * r2;
          question = `Find the roots of the quadratic equation: x² ${b >= 0 ? '+' : ''}${b}x + ${c} = 0`;
          correctAnswer = `${r1} and ${r2}`;
          options = [
            correctAnswer,
            `${r1 + 1} and ${r2 - 1}`,
            `-${r1} and -${r2}`,
            `${r1} and ${r2 + 2}`
          ];
          difficulty = 'Hard';
          hint = `Factorize the quadratic expression into (x - ${r1})(x - ${r2}) = 0.`;
        } else if (cat === 1) {
          const angles = [30, 45, 60][i % 3];
          question = `What is the exact mathematical value of tan(${angles}°)?`;
          correctAnswer = angles === 30 ? '1/√3' : angles === 45 ? '1' : '√3';
          options = ['1/√3', '1', '√3', '√2'];
          difficulty = 'Medium';
          hint = `Remember that tan(θ) is equivalent to sin(θ) / cos(θ).`;
        } else {
          const sideA = [3, 6, 5, 9, 8, 12][i % 6];
          const sideB = [4, 8, 12, 12, 15, 16][i % 6];
          const hyp = [5, 10, 13, 15, 17, 20][i % 6];
          question = `In a right-angled triangle, if the two perpendicular sides are of length ${sideA} cm and ${sideB} cm, what is the length of the hypotenuse?`;
          correctAnswer = `${hyp} cm`;
          options = [`${hyp} cm`, `${sideA + sideB} cm`, `${hyp + 3} cm`, `${hyp - 1} cm`];
          difficulty = 'Medium';
          hint = `Apply Pythagoras' theorem: √(sideA² + sideB²).`;
        }
      } else {
        // senior_secondary / senior
        const cat = i % 3;
        if (cat === 0) {
          const exp = (i % 3) + 2;
          const coef = (i % 5) + 2;
          question = `Find the first derivative of f(x) = x^${exp} + ${coef}x with respect to x.`;
          correctAnswer = `${exp}x^${exp - 1} + ${coef}`;
          options = [
            correctAnswer,
            `${exp}x^${exp} + ${coef}`,
            `${exp - 1}x^${exp - 1} + ${coef}`,
            `${exp}x^${exp - 1} + ${coef}x`
          ];
          difficulty = 'Hard';
          hint = `Use the power rule d/dx[x^n] = n*x^(n-1).`;
        } else if (cat === 1) {
          const coef = ((i % 3) + 1) * 2; // 2, 4, 6
          const limit = (i % 3) + 2; // 2, 3, 4
          question = `Find the value of the definite integral of ${coef}x dx from x = 0 to x = ${limit}.`;
          correctAnswer = String((coef / 2) * limit * limit);
          options = [
            correctAnswer,
            String((coef / 2) * limit * limit - 2),
            String((coef / 2) * limit * limit + 4),
            String(coef * limit)
          ];
          difficulty = 'Hard';
          hint = `Integrate ${coef}x to get ${(coef / 2)}x², then evaluate from 0 to ${limit}.`;
        } else {
          const red = (i % 5) + 3;
          const white = (i % 4) + 3;
          question = `A bag contains ${red} red balls and ${white} white balls. If one ball is drawn at random, what is the probability that it is a red ball?`;
          correctAnswer = `${red}/${red + white}`;
          options = [
            correctAnswer,
            `${white}/${red + white}`,
            `1/${red + white}`,
            `${red}/${white}`
          ];
          difficulty = 'Medium';
          hint = `Probability = (Number of favorable outcomes) / (Total number of outcomes).`;
        }
      }
    } else if (subject === 'english') {
      const cat = i % 6;
      if (cat === 0) {
        const pair = antonyms[i % antonyms.length];
        const templates = [
          `Select the option that represents the opposite of '${pair[0].toUpperCase()}':`,
          `What is the antonym (opposite word) of the word '${pair[0].toUpperCase()}'?`,
          `Choose the word that means the exact opposite of '${pair[0].toUpperCase()}':`,
          `Identify the antonym of the given word: '${pair[0].toUpperCase()}'`
        ];
        question = templates[i % templates.length];
        correctAnswer = pair[1];
        options = [
          correctAnswer,
          antonyms[(i + 2) % antonyms.length][1],
          antonyms[(i + 4) % antonyms.length][1],
          'stubborn'
        ];
        difficulty = 'Easy';
        hint = `Think of a word that carries the completely contrary meaning.`;
      } else if (cat === 1) {
        const pair = synonyms[i % synonyms.length];
        const templates = [
          `Which word is closest in meaning to '${pair[0].toUpperCase()}'?`,
          `Select the synonym for the word '${pair[0].toUpperCase()}':`,
          `Choose the option that represents a synonym of '${pair[0].toUpperCase()}':`,
          `Identify the word with a similar meaning to '${pair[0].toUpperCase()}':`
        ];
        question = templates[i % templates.length];
        correctAnswer = pair[1];
        options = [
          correctAnswer,
          synonyms[(i + 3) % synonyms.length][0],
          synonyms[(i + 5) % synonyms.length][0],
          'unrelated'
        ];
        difficulty = 'Medium';
        hint = `Look for the word that conveys nearly the same concept.`;
      } else if (cat === 2) {
        const pair = collectives[i % collectives.length];
        question = `What is the collective noun for a group of '${pair[0]}'?`;
        correctAnswer = `A ${pair[1]}`;
        options = [
          correctAnswer,
          `A ${collectives[(i + 1) % collectives.length][1]}`,
          `A ${collectives[(i + 2) % collectives.length][1]}`,
          `A group`
        ];
        difficulty = 'Medium';
        hint = `Groups of animals have special terms, like a school of fish or a herd of cattle.`;
      } else if (cat === 3) {
        const pair = plurals[i % plurals.length];
        question = `What is the correct plural spelling of the word '${pair[0]}'?`;
        correctAnswer = pair[1];
        options = [
          correctAnswer,
          `${pair[0]}s`,
          `${pair[0]}es`,
          plurals[(i + 2) % plurals.length][1]
        ];
        difficulty = 'Easy';
        hint = `This is an irregular plural noun that does not just add 's'.`;
      } else if (cat === 4) {
        const pair = verbs[i % verbs.length];
        question = `What is the past tense form of the verb '${pair[0]}'?`;
        correctAnswer = pair[1];
        options = [
          correctAnswer,
          `${pair[0]}ed`,
          `${pair[0]}ing`,
          verbs[(i + 2) % verbs.length][1]
        ];
        difficulty = 'Easy';
        hint = `This verb is irregular in its past tense form.`;
      } else {
        const prep = prepositions[i % prepositions.length];
        question = `Fill in the blank with the correct preposition: "${prep[0]}"`;
        correctAnswer = prep[1];
        options = [prep[1], prep[2], prep[3], prep[4]];
        difficulty = 'Medium';
        hint = `Check which preposition fits grammatically in the context of the sentence.`;
      }
    } else if (subject === 'science') {
      const cat = i % 7;
      if (cat === 0) {
        const pair = organs[i % organs.length];
        const templates = [
          `Which human body system does the organ '${pair[0]}' belong to?`,
          `The organ '${pair[0]}' is a vital part of which of the following body systems?`,
          `To which biological system would you classify the '${pair[0]}'?`,
          `Identify the body system that contains the organ '${pair[0]}':`
        ];
        question = templates[i % templates.length];
        correctAnswer = pair[1];
        options = [
          correctAnswer,
          organs[(i + 1) % organs.length][1],
          organs[(i + 2) % organs.length][1],
          'Skeletal System'
        ];
        difficulty = 'Medium';
        hint = `Think of its primary function inside the body, e.g., pumping blood, thinking, or breathing.`;
      } else if (cat === 1) {
        const pair = elements[i % elements.length];
        const templates = [
          `What is the chemical element symbol for '${pair[0]}'?`,
          `In chemistry, which symbol is used to represent the element '${pair[0]}'?`,
          `Choose the correct chemical symbol for the element '${pair[0]}':`,
          `Identify the chemical notation for '${pair[0]}':`
        ];
        question = templates[i % templates.length];
        correctAnswer = pair[1];
        options = [
          correctAnswer,
          elements[(i + 1) % elements.length][1],
          elements[(i + 3) % elements.length][1],
          elements[(i + 5) % elements.length][1]
        ];
        difficulty = 'Easy';
        hint = `The chemical symbol is typically one or two letters derived from its English or Latin name.`;
      } else if (cat === 2) {
        const pair = planets[i % planets.length];
        const templates = [
          `Which planet in our solar system is known as the ${pair[1]}?`,
          `Identify the planet that is described as the ${pair[1]}:`,
          `Which of the following planets is the ${pair[1]}?`,
          `Name the planet in our solar system that is the ${pair[1]}:`
        ];
        question = templates[i % templates.length];
        correctAnswer = pair[0];
        options = [
          correctAnswer,
          planets[(i + 1) % planets.length][0],
          planets[(i + 2) % planets.length][0],
          'Pluto'
        ];
        difficulty = 'Easy';
        hint = `Think about planetary features: Mars is red, Saturn has major rings, Jupiter is massive, etc.`;
      } else if (cat === 3) {
        const pair = units[i % units.length];
        const templates = [
          `What is the standard SI unit of measurement for '${pair[0]}'?`,
          `In physics, '${pair[0]}' is measured in which SI unit?`,
          `Choose the correct unit of measurement for '${pair[0]}':`,
          `Identify the standard SI unit used to quantify '${pair[0]}':`
        ];
        question = templates[i % templates.length];
        correctAnswer = pair[1];
        options = [
          correctAnswer,
          units[(i + 1) % units.length][1],
          units[(i + 2) % units.length][1],
          'Kilogram'
        ];
        difficulty = 'Medium';
        hint = `SI units are named after historical physicists (like Newton, Watt, Joule).`;
      } else if (cat === 4) {
        const pair = animals[i % animals.length];
        const subcat = i % 3;
        if (subcat === 0) {
          question = `What is the young one (baby) of a '${pair[0]}' called?`;
          correctAnswer = pair[1];
          options = [
            correctAnswer,
            animals[(i + 1) % animals.length][1],
            animals[(i + 2) % animals.length][1],
            'chick'
          ];
        } else if (subcat === 1) {
          question = `What is the sound made by a '${pair[0]}'?`;
          correctAnswer = pair[2];
          options = [
            correctAnswer,
            animals[(i + 1) % animals.length][2],
            animals[(i + 2) % animals.length][2],
            'chirps'
          ];
        } else {
          question = `What is the natural home or living place of a '${pair[0]}'?`;
          correctAnswer = pair[3];
          options = [
            correctAnswer,
            animals[(i + 1) % animals.length][3],
            animals[(i + 2) % animals.length][3],
            'forest'
          ];
        }
        difficulty = 'Easy';
        hint = `Think of animals and their life cycle or behavior.`;
      } else if (cat === 5) {
        const pair = vitamins[i % vitamins.length];
        const templates = [
          `A deficiency of '${pair[0]}' leads to which health condition?`,
          `Which disease or condition is caused by a lack of '${pair[0]}'?`,
          `Which of the following health issues is linked to a lack of '${pair[0]}'?`,
          `Identify the deficiency disease associated with '${pair[0]}':`
        ];
        question = templates[i % templates.length];
        correctAnswer = pair[1];
        options = [
          correctAnswer,
          vitamins[(i + 1) % vitamins.length][1],
          vitamins[(i + 2) % vitamins.length][1],
          'Malaria'
        ];
        difficulty = 'Medium';
        hint = `Deficiencies lead to specific diseases like Scurvy for Vitamin C or Rickets for Vitamin D.`;
      } else {
        const pair = states[i % states.length];
        const templates = [
          `What is the physical process of changing from ${pair[0]} called?`,
          `In science, the transition of matter from ${pair[0]} is known as:`,
          `Identify the scientific term for the phase transition from ${pair[0]}:`,
          `Which process describes the phase transition of matter from ${pair[0]}?`
        ];
        question = templates[i % templates.length];
        correctAnswer = pair[1];
        options = [
          correctAnswer,
          states[(i + 1) % states.length][1],
          states[(i + 2) % states.length][1],
          'Sublimation'
        ];
        difficulty = 'Medium';
        hint = `Water cycle steps are a great reference, like boiling turning liquid to gas.`;
      }
    } else if (subject === 'reasoning') {
      const cat = i % 5;
      if (cat === 0) {
        const start = (i * 3) % 25 + 1;
        const diff = (i * 2) % 7 + 2;
        const series = [start, start + diff, start + diff * 2, start + diff * 3];
        question = `Find the missing number in this numerical pattern: ${series.join(', ')}, ?`;
        correctAnswer = String(start + diff * 4);
        options = [
          correctAnswer,
          String(start + diff * 4 + 2),
          String(start + diff * 4 - 3),
          String(start + diff * 4 + 5)
        ];
        difficulty = 'Easy';
        hint = `The terms increase by a fixed difference of +${diff} each time.`;
      } else if (cat === 1) {
        const analogies = [
          ['Puppy', 'Dog', 'Kitten', 'Cat'], ['Fish', 'Water', 'Bird', 'Sky'],
          ['Ice', 'Cold', 'Fire', 'Hot'], ['Pen', 'Paper', 'Chalk', 'Blackboard'],
          ['Doctor', 'Hospital', 'Teacher', 'School'], ['Chef', 'Kitchen', 'Farmer', 'Field'],
          ['Clock', 'Time', 'Thermometer', 'Temperature'], ['Car', 'Road', 'Train', 'Track'],
          ['Book', 'Author', 'Song', 'Composer'], ['Bee', 'Hive', 'Spider', 'Web']
        ];
        const pair = analogies[i % analogies.length];
        const templates = [
          `Complete the logical analogy: '${pair[0]}' is to '${pair[1]}' as '${pair[2]}' is to:`,
          `If '${pair[0]}' relates to '${pair[1]}', then '${pair[2]}' relates to which of the following?`,
          `Based on the relation between '${pair[0]}' and '${pair[1]}', complete the pair: '${pair[2]}' -> ?`
        ];
        question = templates[i % templates.length];
        correctAnswer = pair[3];
        options = [
          correctAnswer,
          pair[0],
          pair[1],
          'unrelated'
        ];
        difficulty = 'Medium';
        hint = `Identify how the first two terms correspond and apply that same rule to the third term.`;
      } else if (cat === 2) {
        const wordsList = ['HELLO', 'WORLD', 'BOARD', 'GAMES', 'SMART', 'STUDY', 'CLASS', 'BRAIN', 'QUIZ', 'LEARN', 'SUPER', 'HAPPY', 'CRAFT', 'CODE', 'SHINE'];
        const word = wordsList[i % wordsList.length];
        const shift = (i % 3) + 1;
        const shiftedWord = word.split('').map(c => String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65)).join('');
        const targetWord = wordsList[(i + 5) % wordsList.length];
        const shiftedTarget = targetWord.split('').map(c => String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65)).join('');
        question = `If in a certain code language, '${word}' is written as '${shiftedWord}', how will '${targetWord}' be written in that same code?`;
        correctAnswer = shiftedTarget;
        options = [
          correctAnswer,
          targetWord,
          shiftedWord,
          shiftedTarget + 'X'
        ];
        difficulty = 'Hard';
        hint = `Analyze letter shifts. Each letter in '${word}' is shifted forward by +${shift} position(s).`;
      } else if (cat === 3) {
        const m1 = maleNames[i % maleNames.length];
        const f1 = femaleNames[i % femaleNames.length];
        const f2 = femaleNames[(i + 3) % femaleNames.length];
        question = `${m1} is the father of ${f1}. ${f2} is the mother of ${f1}. How is ${m1} related to ${f2}?`;
        correctAnswer = 'Husband';
        options = ['Husband', 'Brother', 'Father-in-law', 'Uncle'];
        difficulty = 'Medium';
        hint = `If they are both parents to the exact same daughter, they must be married.`;
      } else {
        const triples = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20]];
        const triple = triples[i % triples.length];
        const dir1 = ['North', 'South'][i % 2];
        question = `A person travels ${triple[0]} km ${dir1}, then turns left and travels ${triple[1]} km. How far is the person from the starting point in a straight line?`;
        correctAnswer = `${triple[2]} km`;
        options = [`${triple[2]} km`, `${triple[0] + triple[1]} km`, `${triple[2] + 4} km`, '7 km'];
        difficulty = 'Hard';
        hint = `Apply Pythagoras' theorem: √(horizontal² + vertical²).`;
      }
    } else if (subject === 'computer' || subject === 'coding') {
      const cat = i % 4;
      if (cat === 0) {
        const abbreviations = [
          ['RAM', 'Random Access Memory'], ['ROM', 'Read Only Memory'], ['CPU', 'Central Processing Unit'],
          ['URL', 'Uniform Resource Locator'], ['HTML', 'Hypertext Markup Language'], ['HTTP', 'Hypertext Transfer Protocol'],
          ['IP', 'Internet Protocol'], ['DNS', 'Domain Name System'], ['SQL', 'Structured Query Language'],
          ['JSON', 'JavaScript Object Notation'], ['API', 'Application Programming Interface'], ['GUI', 'Graphical User Interface'],
          ['OS', 'Operating System'], ['LAN', 'Local Area Network'], ['WAN', 'Wide Area Network'],
          ['VPN', 'Virtual Private Network'], ['CSS', 'Cascading Style Sheets'], ['PDF', 'Portable Document Format']
        ];
        const pair = abbreviations[i % abbreviations.length];
        const templates = [
          `What does the computer acronym '${pair[0]}' stand for?`,
          `In computer science and systems, what is the full form of '${pair[0]}'?`,
          `Choose the correct expanded form of the acronym '${pair[0]}':`,
          `Identify the correct full meaning of the abbreviation '${pair[0]}':`
        ];
        question = templates[i % templates.length];
        correctAnswer = pair[1];
        options = [
          correctAnswer,
          abbreviations[(i + 1) % abbreviations.length][1],
          abbreviations[(i + 2) % abbreviations.length][1],
          'Read Active Module'
        ];
        difficulty = 'Medium';
        hint = `Each letter stands for a core term, like 'Memory', 'Protocol', or 'Language'.`;
      } else if (cat === 1) {
        const limit = (i % 6) + 3; // 3 to 8
        const step = (i % 4) + 2; // 2 to 5
        question = `What is the final value of 'result' after executing this JavaScript code? \`let result = 0; for(let i = 0; i < ${limit}; i++) { result += ${step}; }\``;
        correctAnswer = String(limit * step);
        options = [
          correctAnswer,
          String(limit * step + step),
          String(limit * step - step),
          String(limit * 2)
        ];
        difficulty = 'Medium';
        hint = `The loop runs exactly ${limit} times, adding ${step} to 'result' in each iteration.`;
      } else if (cat === 2) {
        const val1 = (i % 15) + 15;
        const val2 = (i % 5) + 4;
        question = `What is the output of the following Python code? \`x = ${val1}; y = ${val2}; print(x % y)\``;
        correctAnswer = String(val1 % val2);
        options = [
          correctAnswer,
          String(Math.floor(val1 / val2)),
          String(val1 % val2 + 1),
          '0'
        ];
        difficulty = 'Hard';
        hint = `The '%' operator is the modulo operator, which calculates the remainder of division of x by y.`;
      } else {
        const questionsHtml = [
          ['Which HTML tag is used to create a hyperlink?', '<a>', '<img>', '<link>', '<href>'],
          ['Which CSS property is used to change the text color?', 'color', 'text-color', 'font-color', 'background-color'],
          ['Which HTML element is used for the largest heading?', '<h1>', '<head>', '<h6>', '<heading>'],
          ['What does CSS stand for?', 'Cascading Style Sheets', 'Creative Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
          ['Which HTML tag is used to insert an image?', '<img>', '<image>', '<src>', '<picture>'],
          ['Which CSS property controls the text size?', 'font-size', 'text-size', 'font-style', 'size']
        ];
        const item = questionsHtml[i % questionsHtml.length];
        question = `${item[0]} (Tech Set-${i})`;
        correctAnswer = item[1];
        options = [item[1], item[2], item[3], item[4]];
        difficulty = 'Easy';
        hint = `Think of standard web structures and CSS properties used in layout styling.`;
      }
    } else {
      // gk / general knowledge / other subjects
      const cat = i % 5;
      if (cat === 0) {
        const pair = capitals[i % capitals.length];
        const templates = [
          `What is the capital city of ${pair[0]}?`,
          `Identify the capital of ${pair[0]}:`,
          `Which city is the political capital of ${pair[0]}?`,
          `Name the capital city of the country of ${pair[0]}:`
        ];
        question = templates[i % templates.length];
        correctAnswer = pair[1];
        options = [
          correctAnswer,
          capitals[(i + 1) % capitals.length][1],
          capitals[(i + 2) % capitals.length][1],
          'Sydney'
        ];
        difficulty = 'Medium';
        hint = `It is the official capital city, which is not always the largest city in ${pair[0]}.`;
      } else if (cat === 1) {
        const pair = currencies[i % currencies.length];
        const templates = [
          `What is the official currency of ${pair[0]}?`,
          `Identify the currency used in ${pair[0]}:`,
          `Which of the following is the official currency of ${pair[0]}?`,
          `Name the currency utilized as legal tender in ${pair[0]}:`
        ];
        question = templates[i % templates.length];
        correctAnswer = pair[1];
        options = [
          correctAnswer,
          currencies[(i + 1) % currencies.length][1],
          currencies[(i + 2) % currencies.length][1],
          'Peso'
        ];
        difficulty = 'Medium';
        hint = `Major currencies include Dollar, Euro, Rupee, Yen, and Pound.`;
      } else if (cat === 2) {
        const item = superlatives[i % superlatives.length];
        question = `Which of the following is the ${item[0]}?`;
        correctAnswer = item[1];
        options = [item[1], item[2], item[3], item[4]];
        difficulty = 'Easy';
        hint = `This is a well-known global geographical extreme.`;
      } else if (cat === 3) {
        const item = inventions[i % inventions.length];
        question = `Who is credited with inventing the '${item[0]}'?`;
        correctAnswer = item[1];
        options = [item[1], item[2], item[3], item[4]];
        difficulty = 'Medium';
        hint = `This famous inventor has a historic legacy in engineering or science.`;
      } else {
        const pair = landmarks[i % landmarks.length];
        question = `In which country is the famous landmark '${pair[0]}' located?`;
        correctAnswer = pair[1];
        options = [
          correctAnswer,
          landmarks[(i + 1) % landmarks.length][1],
          landmarks[(i + 2) % landmarks.length][1],
          'Russia'
        ];
        difficulty = 'Easy';
        hint = `Think of its continental location and famous global heritage.`;
      }
    }

    // Deterministic option shuffle based on seed index i to distribute correctAnswer
    const shift = i % 4;
    const shuffledOptions = [
      options[shift],
      options[(shift + 1) % 4],
      options[(shift + 2) % 4],
      options[(shift + 3) % 4]
    ];

    list.push({
      id,
      subjectId: subject,
      gradeGroup: group,
      question,
      options: shuffledOptions,
      correctAnswer,
      difficulty,
      hint
    });
  }
  
  return list;
}

export function getQuestionsByGroupAndSubject(group: ClassGroupId, subject: SubjectId): QuizQuestion[] {
  // First look for matching group and subject from curation
  const staticMatches = QUESTION_BANK.filter(q => q.gradeGroup === group && q.subjectId === subject);
  
  // We want EXACTLY 500 questions in total for this game configuration to fulfill "500 questions per game"!
  const needed = 500 - staticMatches.length;
  
  if (needed > 0) {
    const dynamic = generateDynamicQuestions(group, subject, needed);
    return [...staticMatches, ...dynamic];
  }
  
  return staticMatches.slice(0, 500);
}


import { isNotNumber } from './utils';

const parseArguments = (args: string[]): { height: number; weight: number } => {
  if (args.length < 3) throw new Error('Not enough arguments!');
  if (args.length > 4) throw new Error('Too many arguments!');

  let value1 = args[2];
  let value2 = args[3];
  if (isNotNumber(value1)) throw new Error('Arguments must be numbers!');
  if (isNotNumber(value2)) throw new Error('Arguments must be numbers!');

  return { height: Number(value1), weight: Number(value2) };
};

const calculateBmi = (height: number, weight: number): number => {
  const bmi = (weight / height ** 2) * 10000;
  return bmi;
};

try {
  const { height, weight } = parseArguments(process.argv);
  const bmi = calculateBmi(height, weight);

  if (bmi < 18.5) {
    console.log('Underweight');
  } else if (bmi >= 18.5 && bmi < 25) {
    console.log('Normal weight');
  } else if (bmi >= 25 && bmi <= 30) {
    console.log('Overweight');
  } else if (bmi > 30) {
    console.log('Obese');
  }
} catch (error: unknown) {
  let message = 'Something went wrong: ';
  if (error instanceof Error) {
    message += error.message;
  }
  console.log(message);
}

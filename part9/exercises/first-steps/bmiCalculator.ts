import { isNotNumber } from './utils';

export const parseArguments = (
  args: string[]
): { height: number; weight: number } => {
  if (args.length < 3) throw new Error('Not enough arguments!');
  if (args.length > 4) throw new Error('Too many arguments!');

  let value1 = args[2];
  let value2 = args[3];

  if (isNotNumber(value1)) throw new Error('Arguments must be numbers!');
  if (isNotNumber(value2)) throw new Error('Arguments must be numbers!');

  return { height: Number(value1), weight: Number(value2) };
};

export const calculateBmi = (height: number, weight: number): number => {
  const bmi = (weight / height ** 2) * 10000;
  return bmi;
};

export const getDescription = (bmi: number): string => {
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal weight';
  } else if (bmi >= 25 && bmi <= 30) {
    return 'Overweight';
  } else if (bmi > 30) {
    return 'Obese';
  }

  return 'Metahuman';
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    const bmi = calculateBmi(height, weight);
    console.log(getDescription(bmi));
  } catch (error: unknown) {
    let message = 'Something went wrong: ';
    if (error instanceof Error) {
      message += error.message;
    }
    console.log(message);
  }
}

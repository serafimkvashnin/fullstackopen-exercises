import { isNotNumber } from './utils';

interface WorkoutResult {
  numberOfDays: number;
  numberOfTrainingDays: number;
  originalTargetValue: number;
  calculatedAverageTime: number;
  targetReached: boolean;
  rating: 1 | 2 | 3;
  ratingOverview: string;
}

const parseArguments = (
  args: string[]
): { hours: number[]; targetValue: number } => {
  if (args.length < 3) throw new Error('Not enough arguments!');

  if (isNotNumber(args[2])) throw new Error('Arguments must be numbers!');
  const targetValue = Number(args[2]);
  let hours: number[] = [];
  for (let i = 3; i < args.length; i++) {
    const element = args[i];
    if (isNotNumber(element)) throw new Error('Arguments must be numbers!');
    hours = [...hours, Number(element)];
  }

  return { hours, targetValue };
};

const calculateExercises = (
  hours: number[],
  targetValue: number
): WorkoutResult => {
  const numberOfDays = hours.length;
  const numberOfTrainingDays = hours.filter((value) => value > 0).length;
  const totalTime = hours.reduce((value1, value2) => value1 + value2);
  const calculatedAverageTime = totalTime / numberOfDays;
  const targetReached = calculatedAverageTime >= targetValue;
  const reachPercent = (calculatedAverageTime / targetValue) * 100;
  let rating: 1 | 2 | 3 = 1;
  let ratingOverview: string = '';
  if (reachPercent <= 50) {
    rating = 1;
    ratingOverview = 'You can do better!';
  } else if (reachPercent > 50 && reachPercent <= 99) {
    rating = 2;
    ratingOverview = 'Not bad. Keep it up!';
  } else {
    rating = 3;
    ratingOverview = 'Wow! Such an awesome result!';
  }

  return {
    numberOfDays,
    numberOfTrainingDays,
    originalTargetValue: targetValue,
    calculatedAverageTime,
    targetReached,
    rating,
    ratingOverview
  };
};

try {
  const { hours, targetValue } = parseArguments(process.argv);
  console.log(calculateExercises(hours, targetValue));
} catch (error: unknown) {
  let message = 'Something went wrong: ';
  if (error instanceof Error) {
    message += error.message;
  }
  console.log(message);
}

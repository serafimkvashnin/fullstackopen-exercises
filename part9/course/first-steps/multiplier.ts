interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  let value1 = Number(args[2]);
  let value2 = Number(args[3]);
  if (!isNaN(value1) && !isNaN(value2)) {
    return {
      value1,
      value2
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(
    value1,
    value2,
    `Multiplied numbers ${value1} and ${value2}, the result is:`
  );
} catch (error: unknown) {
  let message = 'Something went wrong: ';
  if (error instanceof Error) {
    message += error.message;
  }
  console.log(message);
}

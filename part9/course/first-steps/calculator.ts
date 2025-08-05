type Operation = 'multiply' | 'add' | 'divide';

const calculator = (a: number, b: number, op: Operation) => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    default:
      throw new Error(
        'Operation does not supported! Use (multiply | add | divide)'
      );
  }
};

try {
  const a: number = Number(process.argv[2]);
  const b: number = Number(process.argv[3]);
  const op: Operation = process.argv[4];
  let result = calculator(a, b, op);
  console.log(result);
} catch (error: unknown) {
  let message = 'Something went wrong: ';
  if (error instanceof Error) {
    message += error.message;
  }
  console.log(message);
}

console.log(process.argv);

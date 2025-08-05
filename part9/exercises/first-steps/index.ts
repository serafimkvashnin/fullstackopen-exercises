import express from 'express';
import { Request } from 'express';
import { calculateBmi, getDescription, parseArguments } from './bmiCalculator';

const app = express();

interface BmiQuery {
  height: string;
  weight: string;
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request<{}, {}, {}, BmiQuery>, res) => {
  try {
    const value1 = req.query.height;
    const value2 = req.query.weight;

    const { height, weight } = parseArguments(['', '', value1, value2]);
    const bmi = calculateBmi(height, weight);
    res.send({ height, weight, bmi: getDescription(bmi) });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.send({ error: error.message });
    }
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server launched on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
});

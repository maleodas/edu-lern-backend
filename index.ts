import 'dotenv/config';
import { app } from './src/app';
import { PORT } from './src/constants/envVariables';

app.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`Express is listening at http://localhost:${PORT}`),
);

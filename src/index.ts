import './lib/db';
import express from 'express';
import cors from 'cors';
import routers from './routers';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors())

app.use('/api', routers)

app.listen(port, () => console.log(`Server listen on ${port}`));

import { NextApiRequest, NextApiResponse } from 'next';
import { validateRoute } from '../../lib/auth';

export default validateRoute(
  (req: NextApiRequest, res: NextApiResponse, user) => {
    res.json(user);
  }
);

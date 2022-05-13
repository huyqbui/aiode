import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prisma';
import 'dotenv/config';

// ensure we check the token on the cookie, and everything is valid
export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.AIODE_LOGIN_ACCESS_TOKEN;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, process.env.LOGIN_SECRET);
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error('Not a real user');
        }
      } catch (err) {
        res.status(401);
        res.json({ error: 'Not Authorized' });
      }
      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: 'Not Authorized' });
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, process.env.LOGIN_SECRET);
  return user;
};

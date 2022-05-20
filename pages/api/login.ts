import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import 'dotenv';

const EIGHT_HOURS = 8 * 60 * 60;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const isValidPassword = bcrypt.compareSync(password, user.password);
  const loginSecret = process.env.LOGIN_SECRET;

  if (user && isValidPassword) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now(),
      },
      loginSecret,
      {
        expiresIn: '8h',
      }
    );

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('AIODE_LOGIN_ACCESS_TOKEN', token, {
        httpOnly: true,
        maxAge: EIGHT_HOURS,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    );
    res.json(user);
  } else {
    res.status(401);
    res.json({ error: 'Email and Password combo failed' });
  }
};

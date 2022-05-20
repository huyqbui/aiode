import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import 'dotenv/config';

const EIGHT_HOURS = 8 * 60 * 60;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { email, password } = req.body;
  let user;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (err) {
    res.status(401);
    res.json({ error: 'User already exists' });
    return;
  }

  const signupSecret = process.env.SIGNUP_SECRET;
  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    signupSecret,
    { expiresIn: '8h' }
  );

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('AIODE_SIGNUP_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: EIGHT_HOURS,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );

  res.json(user);
};

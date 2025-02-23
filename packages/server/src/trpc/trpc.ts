import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import { Request } from 'express';
import { User, clerkClient } from '@clerk/express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: process.env.JWT_PUBLIC_KEY_URL as string,
});

function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err || !key) {
      callback(err || new Error('Signing key not found'));
      return;
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

export const createTRPCContext = async ({ req }: { req: Request }) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return {
      user: null,
    };
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = (await new Promise((resolve, reject) => {
      jwt.verify(token, getKey, {}, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    })) as { sub: string };

    const userId = decoded.sub;
    let user: User | null = null;
    if (userId) {
      user = await clerkClient.users.getUser(userId);
    }

    return { user }; // userId is now optional
  } catch (error) {
    return { user: null };
  }
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: {
    serialize: (input) => z.any().parse(input),
    deserialize: (input) => z.any().parse(input),
  },
});

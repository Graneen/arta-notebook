import * as jose from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

interface JWTPayload {
  userId: number;
  // добавьте другие поля, если они есть в токене
}

export async function verifyJWT(token: string): Promise<JWTPayload> {
  try {
    const verified = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verified.payload as unknown as JWTPayload;
  } catch (error) {
    console.error('Ошибка при проверке токена:', error);
    throw new Error('Invalid token');
  }
}

export async function signJWT(payload: { userId: number; email: string }, expiresIn: string = '24h') {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);
} 
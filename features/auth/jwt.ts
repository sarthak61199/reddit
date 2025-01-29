import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function signJWT(
  payload: {
    id: string;
    email: string;
    username: string;
    avatar: string | null;
  },
  options?: jwt.SignOptions
) {
  return jwt.sign(payload, JWT_SECRET, {
    ...(options && options),
  });
}

export function verifyJWT<T>(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch {
    return null;
  }
}

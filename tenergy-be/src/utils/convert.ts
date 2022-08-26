import jwt from "jsonwebtoken";

export function monthToSeason(month: number): "summer" | "other" {
  if (month === 7 || month === 8) return "summer";
  return "other";
}

export function generateToken(data: any, expiresIn: string) {
  const secret = process.env.JWT_SECRET!;
  const token = jwt.sign(data, secret, {
    algorithm: "HS256",
    expiresIn,
  });

  return token;
}

export function decryptToken(token: any) {
  const secret = process.env.JWT_SECRET!;

  return jwt.verify(token, secret!) as any;
}

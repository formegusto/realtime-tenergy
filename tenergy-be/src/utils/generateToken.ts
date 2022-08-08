import jwt from "jsonwebtoken";

export function generateToken(data: any, expiresIn: string) {
  const secret = process.env.JWT_SECRET!;
  const token = jwt.sign(data, secret, {
    algorithm: "HS256",
    expiresIn,
  });

  return token;
}

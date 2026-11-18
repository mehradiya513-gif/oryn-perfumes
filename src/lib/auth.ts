import crypto from 'crypto';

const SECRET = process.env.ADMIN_SESSION_SECRET || 'oryn-exclusive-atelier-secret-key-2026';
export const ADMIN_COOKIE_NAME = 'oryn_admin_session';

export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const checkHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return checkHash === hash;
}

export function createSessionToken(username: string): string {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const data = `${username.toLowerCase().trim()}:${expiresAt}`;
  const signature = crypto.createHmac('sha256', SECRET).update(data).digest('hex');
  return `${data}:${signature}`;
}

export function verifySessionToken(token: string | undefined | null): { valid: boolean; username?: string } {
  if (!token) return { valid: false };
  const parts = token.split(':');
  if (parts.length !== 3) return { valid: false };

  const [username, expiresAtStr, signature] = parts;
  const expiresAt = parseInt(expiresAtStr, 10);

  if (isNaN(expiresAt) || Date.now() > expiresAt) {
    return { valid: false };
  }

  const expectedSignature = crypto.createHmac('sha256', SECRET).update(`${username}:${expiresAtStr}`).digest('hex');
  if (signature.length === expectedSignature.length && crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return { valid: true, username };
  }

  return { valid: false };
}

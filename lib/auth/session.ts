export const SESSION_COOKIE = "admin_session";

export const SESSION_ALGORITHM = "HS256";

export function getSessionSecret(): Uint8Array {
  return new TextEncoder().encode(
    process.env.SESSION_SECRET ?? "fallback-dev-secret-do-not-use-in-prod"
  );
}

/** Strip CRLF and other control chars to prevent SMTP/header injection. */
export function sanitizeEmailHeader(value: string, maxLength = 200): string {
  return value
    .replace(/[\r\n\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength)
}

export function sanitizeEmailAddress(value: string): string | null {
  const cleaned = sanitizeEmailHeader(value, 254)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) return null
  return cleaned
}

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
}

export const UPLOAD_MAX_BYTES = 5 * 1024 * 1024
export const UPLOAD_ALLOWED_TYPES = Object.keys(MIME_TO_EXT)

export function extensionForMime(mime: string): string | null {
  return MIME_TO_EXT[mime] ?? null
}

function startsWithBytes(buffer: Buffer, bytes: number[]) {
  if (buffer.length < bytes.length) return false
  return bytes.every((byte, index) => buffer[index] === byte)
}

/** Basic magic-byte check — MIME type must match file content. */
export function matchesImageSignature(buffer: Buffer, mime: string): boolean {
  switch (mime) {
    case "image/jpeg":
      return startsWithBytes(buffer, [0xff, 0xd8, 0xff])
    case "image/png":
      return startsWithBytes(buffer, [0x89, 0x50, 0x4e, 0x47])
    case "image/gif":
      return startsWithBytes(buffer, [0x47, 0x49, 0x46, 0x38])
    case "image/webp":
      return (
        buffer.length >= 12 &&
        startsWithBytes(buffer, [0x52, 0x49, 0x46, 0x46]) &&
        buffer[8] === 0x57 &&
        buffer[9] === 0x45 &&
        buffer[10] === 0x42 &&
        buffer[11] === 0x50
      )
    default:
      return false
  }
}

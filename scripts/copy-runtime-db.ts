import fs from "fs"
import path from "path"

/** SQLite paths in DATABASE_URL are relative to prisma/schema.prisma, not the repo root. */
function findProductionDbPath(): string | null {
  const candidates = [
    path.join(process.cwd(), "prisma", "prod.db"),
    path.join(process.cwd(), "prisma", "prisma", "prod.db"),
  ]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate
  }

  return null
}

const source = findProductionDbPath()
const targets = [
  path.join(process.cwd(), "data", "runtime.db"),
  path.join(process.cwd(), "public", "runtime-db.sqlite"),
]

if (!source) {
  console.warn("[copy-runtime-db] production SQLite file not found — skipping runtime DB copy")
  process.exit(0)
}

fs.mkdirSync(path.join(process.cwd(), "data"), { recursive: true })

for (const target of targets) {
  fs.copyFileSync(source, target)
  console.log("[copy-runtime-db] Copied from", path.relative(process.cwd(), source), "to", path.relative(process.cwd(), target))
}

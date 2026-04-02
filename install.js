#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const SOURCE_DIR = path.join(__dirname, ".claude", "skills", "okslop");
const TARGET_DIR = path.join(process.cwd(), ".claude", "skills", "okslop");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (!fs.existsSync(SOURCE_DIR)) {
  console.error("Error: skill files not found");
  process.exit(1);
}

copyDir(SOURCE_DIR, TARGET_DIR);
console.log("Installed OKSLOP skill to .claude/skills/okslop");
console.log("Ask Claude Code for stock images and it will use this skill.");

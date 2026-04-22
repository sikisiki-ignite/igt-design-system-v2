#!/usr/bin/env node

import { mkdirSync, copyFileSync, existsSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 패키지 루트 (bin/../)
const pkgRoot = resolve(__dirname, '..')

// 스킬을 설치할 프로젝트 루트 (npx 실행 위치)
const projectRoot = process.cwd()

// 패키지 내 스킬 파일 경로
const pkgSkillPath = join(pkgRoot, '.claude', 'skills', 'backoffice-dev.md')

// .claude/skills/ 디렉토리 생성
const skillsDir = join(projectRoot, '.claude', 'skills')
if (!existsSync(skillsDir)) {
  mkdirSync(skillsDir, { recursive: true })
}

// 스킬 파일 복사
const skillPath = join(skillsDir, 'backoffice-dev.md')
copyFileSync(pkgSkillPath, skillPath)

console.log('✅ IGT Design System AI 스킬 설치 완료')
console.log(`   → ${skillPath}`)
console.log('')
console.log('사용법: Claude Code에서 백오피스 화면 구현 요청 시 자동 적용')

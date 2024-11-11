# NLP 기반 북마크 메모 서비스

## 프로젝트 구조

이 프로젝트는 pnpm workspace와 Turborepo를 사용하여 모노레포 구조로 구성되어 있습니다.

```plaintext
root/
├── apps/
│ ├── extension/ # 크롬 익스텐션 프로젝트
│ └── www/ # 웹 애플리케이션 프로젝트
├── package.json
└── pnpm-workspace.yaml
```

### Chrome Extension (apps/extension)

**기술 스택:**

- React 18
- TypeScript
- Vite
- React Router
- TanStack Query (React Query) v5
- Zustand
- Tailwind CSS
- Chrome Extension API

### Web Application (apps/www)

**기술 스택:**

- Next.js 15 (with Turbopack)
- React 19
- TypeScript
- Zustand
- Tailwind CSS

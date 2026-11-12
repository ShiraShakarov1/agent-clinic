# Event Lens Studio

## סקירה כללית

Event Lens Studio הוא פרויקט Spec-Driven Development שמיועד לניהול צלמים, גלריות תמונות ואירועים. המערכת מאפשרת לעקוב אחרי אירועים, לנהל צלמים, לסדר תיקים/גלריות ולשמור תמונות בצורה מסודרת ומוכנה לשיתוף.

הפרויקט משלב TypeScript, Hono ו-SQLite, ומיועד לשמש כבסיס לפיתוח מערכת ניהול אמנותית, סדנאות צילום, חתונות, אירועים, וגלריות דיגיטליות.

## מצב הפרויקט

הפרויקט נמצא במצב עבודה טוב ומוכן לשלב הבא:

- ה-Core API פועל
- SQLite מאתחל אוטומטית
- יש מודל לעבודת צלמים וגלריות
- בדיקות עובדות
- המפרטים והתיעוד עודכנו
- ה-dashboard עבר לשפה עברית ולנושא הצילום

## טכנולוגיות עיקריות

- Node.js
- TypeScript strict mode
- Hono
- @hono/node-server
- SQLite via better-sqlite3
- Vitest

## מבנה הפרויקט

```text
agent-clinic/
├── .claude/                # Skills and automation guidance
├── data/                   # SQLite data directory
├── specs/                  # Project specifications
│   ├── mission.md
│   ├── techstack.md
│   ├── roadmap.md
│   └── features/
├── src/
│   ├── config.ts
│   ├── db.ts
│   ├── index.ts
│   ├── types.ts
│   ├── routes/
│   └── services/
├── tests/
├── CHANGELOG.md
├── README.md
├── TASKS.md
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── .gitignore
```

## הפעלה

```bash
# התקנת תלויות
npm install

# הרצה במצב פיתוח
npm run dev

# build
npm run build

# הרצה ב-production
npm start

# בדיקות
npm test

# בדיקות רציפה/CI
npx vitest run

# בדיקת TypeScript
npm run typecheck
```

## נקודות API עיקריות

- GET /
- GET /api/health
- GET /api/agents
- GET /api/agents/:id
- POST /api/agents
- PUT /api/agents/:id
- DELETE /api/agents/:id
- GET /api/ailments
- GET /api/ailments/:id
- POST /api/ailments
- PUT /api/ailments/:id
- DELETE /api/ailments/:id

ה-API נשאר פונקציונלי, ואפשר להתאים אותו בקלות ל-Photographers, Events ו-Galleries.

## תהליך הפיתוח

1. כתיבת מפרט לפני המימוש
2. יצירת Branch לפי feature
3. מימוש לפי המפרט
4. בדיקות ותיקוני פערים
5. עדכון roadmap ו-TASKS
6. הכנה לשלב הבא

## סטטוס נוכחי

### הושלם

- סביבת TypeScript
- פרויקט Git
- SQLite + seed data
- מודל עבודה גנרי עם צלמים ואירועים
- בדיקות יחידה
- בדיקות API
- תיעוד והסברים
- dashboard עברי ממוקד צילומים

### הבא בתור

- עיצוב אפליקציה מלאה לגלריות
- ניהול אירועים וצלמים
- שדרוג UI של גלריה/פרופיל
- מערכת הזמנות/אישור תמונות

## קישורים

- Repository: https://github.com/ShiraShakarov1/agent-clinic.git
- Roadmap: [specs/roadmap.md](specs/roadmap.md)
- Tasks: [TASKS.md](TASKS.md)
- Changelog: [CHANGELOG.md](CHANGELOG.md)

## הערה

הפרויקט מנוהל לפי שיטת Spec-Driven Development, עם דגש על תיעוד, בדיקות ויכולת להחליף נושא עסקי בקלות מבלי להחליף את התשתית הטכנית.

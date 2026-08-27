# Next.js 14 / 15 App Router E-Commerce Backend API

Ushbu papka loyihaning **Next.js (App Router - `app/api/.../route.ts`)** arxitekturasidagi to'liq backend API tizimidir.

---

## 📁 Papkalar tuzilishi (Folder Structure)

```text
nextjs-backend/
├── app/
│   └── api/
│       ├── products/
│       │   ├── route.ts          # GET (list, filter, search) | POST (create product)
│       │   └── [id]/
│       │       └── route.ts      # GET (single) | PUT (update) | DELETE (delete)
│       ├── categories/
│       │   └── route.ts          # GET (toifalar va ulardagi tovarlar soni)
│       ├── orders/
│       │   ├── route.ts          # GET (barcha buyurtmalar) | POST (yangi buyurtma rasmiylashtirish)
│       │   └── [id]/
│       │       └── route.ts      # GET (buyurtma ma'lumotlari) | PATCH (holatni o'zgartirish)
│       ├── promos/
│       │   ├── route.ts          # GET (promokodlar) | POST (yangi promokod)
│       │   └── validate/
│       │       └── route.ts      # POST (promokodni tekshirish va chegirma hisoblash)
│       ├── analytics/
│       │   └── route.ts          # GET (Admin dashboard statistikasi)
│       ├── contact/
│       │   └── route.ts          # POST (Qayta aloqa xabarlari)
│       └── ai/
│           └── route.ts          # POST (Gemini AI aqlli qidiruv va maslahatchi)
└── lib/
    ├── types.ts                  # TypeScript ma'lumot turlari
    └── db.ts                     # Ma'lumotlar bazasi adapteri (In-Memory / Prisma / Drizzle)
```

---

## 🚀 API Endpointlari

| Metod | Manzil (Endpoint) | Tavsif |
|---|---|---|
| `GET` | `/api/products` | Mahsulotlar ro'yxati (Filtrlar: `category`, `brand`, `search`, `minPrice`, `maxPrice`, `sort`, `limit`) |
| `POST` | `/api/products` | Yangi mahsulot qo'shish (Admin) |
| `GET` | `/api/products/[id]` | Bitta mahsulot tafsilotlari |
| `PUT` | `/api/products/[id]` | Mahsulot ma'lumotlarini yangilash |
| `DELETE` | `/api/products/[id]` | Mahsulotni o'chirish |
| `GET` | `/api/categories` | Kategoriyalar ro'yxati va tovarlar hisobi |
| `GET` | `/api/orders` | Buyurtmalar ro'yxati (Admin) |
| `POST` | `/api/orders` | Yangi buyurtma yaratish va qoldiqni kamaytirish |
| `PATCH` | `/api/orders/[id]` | Buyurtma holatini yangilash (`kutilmoqda`, `yolda`, `yetkazildi`...) |
| `GET` | `/api/promos` | Faol promokodlar |
| `POST` | `/api/promos/validate` | Promokodni tekshirish |
| `GET` | `/api/analytics` | Daromad, buyurtmalar va tovarlar statistikasi |
| `POST` | `/api/contact` | Qayta aloqa formasi |
| `POST` | `/api/ai` | Gemini AI yordamchi |

---

## 💡 Haqiqiy Ma'lumotlar Bazasiga ulash (Prisma / PostgreSQL misoli)

`lib/db.ts` faylini Prisma client bilan almashtirish:

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

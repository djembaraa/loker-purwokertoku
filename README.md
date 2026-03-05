# LokerPurwokertoku

Portal lowongan kerja terpercaya untuk wilayah **Banyumas Raya** dan sekitarnya. Dibangun dengan Next.js 16, Sanity CMS, Tailwind CSS 4, dan Cloudinary.

🌐 **Live**: [lokerpurwokertoku.com](https://lokerpurwokertoku.com)

---

## Fitur Utama

- **Multi-kota** — Mendukung 9 kota: Purwokerto, Purbalingga, Cilacap, Banjarnegara, Kebumen, Tegal, Brebes, Pemalang, Pekalongan
- **Sanity CMS** — Admin dashboard terintegrasi di `/studio` untuk kelola lowongan kerja
- **Cloudinary** — Upload logo perusahaan & poster lowongan langsung dari Sanity Studio
- **SEO Optimized** — Sitemap otomatis, robots.txt, Open Graph metadata per halaman
- **Responsive** — Tampilan optimal di desktop, tablet, dan mobile
- **Featured Jobs** — Highlight lowongan unggulan di hero section beranda
- **Pagination** — Navigasi halaman di setiap kota dan daftar semua loker
- **AdSense Ready** — Slot iklan sudah disiapkan di posisi strategis

---

## Tech Stack

| Teknologi | Versi | Fungsi |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.1.6 | Framework React (App Router) |
| [React](https://react.dev) | 19.2.3 | UI Library |
| [Sanity](https://sanity.io) | 4.22.0 | Headless CMS |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Styling |
| [Cloudinary](https://cloudinary.com) | - | Image hosting & optimization |
| [TypeScript](https://typescriptlang.org) | 5.x | Type safety |

---

## Struktur Proyek

```
loker-purwokertoku/
├── app/
│   ├── globals.css              # Global styles & CSS variables
│   ├── layout.tsx               # Root layout (font, metadata)
│   ├── robots.ts                # robots.txt generator
│   ├── sitemap.ts               # Sitemap XML generator
│   ├── (public)/                # Route group — halaman publik
│   │   ├── layout.tsx           # Layout dengan Navbar + Footer
│   │   ├── page.tsx             # Beranda
│   │   ├── about/page.tsx       # Halaman About Us
│   │   ├── contact/page.tsx     # Halaman Contact
│   │   ├── loker/[slug]/page.tsx        # Detail lowongan (dynamic)
│   │   ├── loker-purwokerto/page.tsx    # Halaman kota
│   │   ├── loker-purbalingga/page.tsx
│   │   ├── loker-cilacap/page.tsx
│   │   ├── loker-banjarnegara/page.tsx
│   │   ├── loker-kebumen/page.tsx
│   │   ├── loker-tegal/page.tsx
│   │   ├── loker-brebes/page.tsx
│   │   ├── loker-pemalang/page.tsx
│   │   ├── loker-pekalongan/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   └── terms/page.tsx
│   ├── api/
│   │   └── cloudinary-upload/route.ts   # API upload gambar
│   └── studio/
│       └── [[...tool]]/page.tsx         # Sanity Studio embedded
├── components/
│   ├── Navbar.tsx               # Navigasi dengan dropdown Nasional
│   ├── Footer.tsx               # Footer dengan link kota
│   ├── CityPageTemplate.tsx     # Template reusable halaman kota
│   ├── HeroJobCard.tsx          # Card lowongan di hero
│   ├── JobCard.tsx              # Card lowongan (grid)
│   ├── JobListItem.tsx          # Item lowongan (list)
│   ├── Pagination.tsx           # Komponen pagination
│   ├── SectionHeader.tsx        # Header section dengan "Lihat Semua"
│   └── AdSlot.tsx               # Slot iklan AdSense
├── lib/
│   └── types.ts                 # TypeScript types, city labels, helpers
├── sanity/
│   ├── env.ts                   # Environment variables Sanity
│   ├── structure.ts             # Struktur sidebar Sanity Studio
│   ├── schemaTypes/
│   │   ├── index.ts             # Registry schema
│   │   └── jobPosting.ts        # Schema lowongan kerja
│   ├── lib/
│   │   ├── client.ts            # Sanity client
│   │   ├── queries.ts           # GROQ queries
│   │   ├── image.ts             # Image URL builder
│   │   └── live.ts              # Live preview config
│   └── components/
│       └── CloudinaryUploadInput.tsx  # Custom upload input
└── public/                      # Static assets (logo, hero image)
```

---

## Prasyarat

Pastikan sudah terinstall:

- **Node.js** >= 18.x
- **npm** (atau yarn/pnpm)
- Akun **[Sanity.io](https://sanity.io)** (gratis)
- Akun **[Cloudinary](https://cloudinary.com)** (gratis)

---

## Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/username/loker-purwokertoku.git
cd loker-purwokertoku
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env.local` di root proyek:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-04

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Cara Mendapatkan Credentials:

**Sanity:**
1. Buka [sanity.io/manage](https://www.sanity.io/manage)
2. Buat project baru atau pilih project yang sudah ada
3. Copy **Project ID** dari halaman Settings
4. Dataset default adalah `production`

**Cloudinary:**
1. Buka [cloudinary.com/console](https://console.cloudinary.com)
2. Di Dashboard, copy **Cloud Name**, **API Key**, dan **API Secret**

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka di browser:
- **Website**: [http://localhost:3000](http://localhost:3000)
- **Sanity Studio**: [http://localhost:3000/studio](http://localhost:3000/studio)

---

## Penggunaan Sanity Studio

Akses Sanity Studio di `/studio` untuk mengelola konten.

### Menambah Lowongan Kerja

1. Buka `/studio` → klik **Semua Lowongan** → tombol **+** (buat baru)
2. Isi field yang tersedia:

| Field | Wajib | Keterangan |
|---|---|---|
| Judul Lowongan | ✅ | Nama posisi, min 5 karakter |
| Slug | ✅ | Otomatis dari judul, bisa diedit |
| Nama Perusahaan | ✅ | Nama perusahaan yang membuka lowongan |
| Logo Perusahaan | ❌ | Upload via Cloudinary (klik tombol upload) |
| Desain/Poster | ❌ | Poster/flyer lowongan via Cloudinary |
| Kota | ✅ | Pilih dari dropdown (9 kota) |
| Tipe Pekerjaan | ✅ | Full Time / Part Time / Kontrak / Freelance / Magang |
| Gaji | ❌ | Contoh: "Rp 3.000.000 - Rp 5.000.000 / bulan" |
| Deskripsi | ✅ | Rich text (bold, italic, list, dll) |
| Persyaratan | ❌ | List string persyaratan |
| Informasi Kontak | ❌ | Email, WhatsApp, atau link pendaftaran |
| Batas Lamaran | ❌ | Tanggal deadline |
| Tampilkan di Hero | ❌ | Centang untuk tampil di hero beranda (maks 3) |
| Tanggal Publikasi | Otomatis | Default: waktu saat ini |

3. Klik **Publish** untuk mempublikasikan

### Navigasi Studio

Sidebar studio sudah diorganisir per kota:
- **Semua Lowongan** — Semua data lowongan
- **Loker Purwokerto** — Filter lowongan Purwokerto saja
- **Loker Cilacap** — Filter lowongan Cilacap saja
- Dan seterusnya...

---

## Struktur Menu Website

### Menu Utama (Navbar)
| Menu | URL |
|---|---|
| Beranda | `/` |
| Purwokerto | `/loker-purwokerto` |
| Purbalingga | `/loker-purbalingga` |
| Cilacap | `/loker-cilacap` |
| Banjarnegara | `/loker-banjarnegara` |
| Kebumen | `/loker-kebumen` |
| **Nasional** ▼ | Dropdown |
| ↳ Tegal | `/loker-tegal` |
| ↳ Brebes | `/loker-brebes` |
| ↳ Pemalang | `/loker-pemalang` |
| ↳ Pekalongan | `/loker-pekalongan` |
| About Us | `/about` |
| Contact | `/contact` |

---

## Menambah Kota Baru

Untuk menambah kota baru, update file-file berikut:

### 1. Sanity Schema — `sanity/schemaTypes/jobPosting.ts`
Tambahkan opsi baru di field `city`:
```ts
{ title: 'Kota Baru', value: 'kota-baru' },
```

### 2. Types — `lib/types.ts`
Tambahkan di `CitySlug` dan `cityLabels`:
```ts
export type CitySlug = '...' | 'kota-baru'

export const cityLabels: Record<string, string> = {
  // ...existing
  'kota-baru': 'Kota Baru',
}
```

### 3. City Page Template — `components/CityPageTemplate.tsx`
Tambahkan deskripsi kota di `cityDescriptions`.

### 4. Halaman Kota — `app/(public)/loker-kota-baru/page.tsx`
Buat file baru:
```tsx
import CityPageTemplate, { generateCityMetadata } from '@/components/CityPageTemplate'

export async function generateMetadata() {
    return generateCityMetadata('kota-baru')
}

interface PageProps {
    searchParams: Promise<{ page?: string }>
}

export default function LokerKotaBaruPage({ searchParams }: PageProps) {
    return (
        <CityPageTemplate
            city="kota-baru"
            basePath="/loker-kota-baru"
            searchParams={searchParams}
        />
    )
}
```

### 5. Update juga:
- `components/Navbar.tsx` — Tambahkan di `navLinks` atau `nasionalLinks`
- `components/Footer.tsx` — Tambahkan di `cityLinks`
- `app/sitemap.ts` — Tambahkan URL baru
- `sanity/structure.ts` — Tambahkan filter kota di sidebar Studio

---

## Build & Deploy

### Build Production

```bash
npm run build
npm run start
```

### Deploy ke Vercel (Recommended)

1. Push repo ke GitHub
2. Buka [vercel.com](https://vercel.com) → Import project
3. Set environment variables (sama seperti `.env.local`)
4. Deploy otomatis setiap push ke `main`

### Environment Variables di Vercel

Tambahkan semua variable dari `.env.local` ke Vercel Dashboard → Settings → Environment Variables.

---

## Perintah yang Tersedia

| Command | Fungsi |
|---|---|
| `npm run dev` | Jalankan development server (port 3000) |
| `npm run build` | Build production |
| `npm run start` | Jalankan production server |
| `npm run lint` | Jalankan ESLint |
| `npx sanity deploy` | Deploy Sanity Studio ke cloud |
| `npx sanity schema deploy` | Deploy schema Sanity ke cloud |

---

## Komunitas & Sosial Media

- 📢 [Grup Telegram](https://t.me/lokerpurwokertoku)
- 💬 [Channel WhatsApp](https://whatsapp.com/channel/0029VaeuX0hFCCoLztMw6F14)
- 🐦 [Follow di X (Twitter)](https://x.com/lokerpwtku)

---

## Lisensi

Hak cipta © 2026 Djembaraa Developer . All rights reserved.

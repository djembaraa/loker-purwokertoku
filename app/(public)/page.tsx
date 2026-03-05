import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import {
  HERO_JOBS_QUERY,
  JOBS_BY_CITY_QUERY,
  ALL_JOBS_PAGINATED_QUERY,
  ALL_JOBS_COUNT_QUERY,
} from '@/sanity/lib/queries'
import { JobPosting } from '@/lib/types'
import HeroJobCard from '@/components/HeroJobCard'
import JobCard from '@/components/JobCard'
import JobListItem from '@/components/JobListItem'
import SectionHeader from '@/components/SectionHeader'
import AdSlot from '@/components/AdSlot'
import Pagination from '@/components/Pagination'

export const metadata: Metadata = {
  title: 'LokerPurwokertoku - Lowongan Kerja Banyumas Raya',
  description: 'Portal lowongan kerja terpercaya di Purwokerto, Purbalingga, Cilacap, Banjarnegara, Kebumen, dan sekitarnya. Temukan peluang karir terbaik di Banyumas Raya.',
}

const cities = [
  { key: 'purwokerto', label: 'Purwokerto', href: '/loker-purwokerto' },
  { key: 'purbalingga', label: 'Purbalingga', href: '/loker-purbalingga' },
  { key: 'cilacap', label: 'Cilacap', href: '/loker-cilacap' },
  { key: 'banjarnegara', label: 'Banjarnegara', href: '/loker-banjarnegara' },
  { key: 'kebumen', label: 'Kebumen', href: '/loker-kebumen' },
]

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

const ITEMS_PER_PAGE = 8

function EmptySection({ cityName }: { cityName: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-surface rounded-xl border border-dashed border-border p-6 flex flex-col items-center justify-center text-center min-h-[140px] hover:bg-surface-hover transition-colors">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.64-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-xs text-text-muted font-medium">Loker {cityName}</p>
        </div>
      ))}
    </div>
  )
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const start = (currentPage - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE

  // Fetch all data in parallel
  const [heroJobs, allJobs, allJobsCount, ...cityJobs] = await Promise.all([
    client.fetch(HERO_JOBS_QUERY),
    client.fetch(ALL_JOBS_PAGINATED_QUERY, { start, end }),
    client.fetch(ALL_JOBS_COUNT_QUERY),
    ...cities.map((city) =>
      client.fetch(JOBS_BY_CITY_QUERY, { city: city.key, limit: 4 })
    ),
  ])

  const totalPages = Math.ceil((allJobsCount || 0) / ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[420px] sm:min-h-[480px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/hero1.jpeg"
          alt="LokerPurwokertoku Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-10 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
              Temukan Lowongan Pekerjaan Terbaru<br className="hidden sm:block" />
              <span className="text-red-200">di Banyumas Raya</span>
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto drop-shadow">
              Informasi lowongan kerja terbaru di Purwokerto, Purbalingga, Cilacap, Banjarnegara, dan Kebumen.
            </p>
          </div>

          {/* Hero Job Cards - from Sanity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {heroJobs && (heroJobs as JobPosting[]).length > 0 ? (
              (heroJobs as JobPosting[]).map((job, index) => (
                <HeroJobCard key={job._id} job={job} index={index} />
              ))
            ) : (
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 h-48 flex items-center justify-center text-white/80 text-sm font-medium shadow-lg hover:bg-white/20 transition-colors">
                  Lowongan terbaru akan tampil di sini
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Social Community CTA */}
      <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Gabung Komunitas Kami!
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Dapatkan info loker tercepat langsung di HP kamu. Join sekarang, gratis!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Telegram */}
            <a
              href="https://t.me/lokerpurwokertoku"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[#0088cc] hover:bg-[#0077b5] text-white px-6 py-3.5 rounded-2xl font-semibold text-sm sm:text-base shadow-lg shadow-[#0088cc]/25 hover:shadow-xl hover:shadow-[#0088cc]/30 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.492-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span>Grup Telegram</span>
              <svg className="w-4 h-4 shrink-0 opacity-60 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a
              href="https://whatsapp.com/channel/0029VaeuX0hFCCoLztMw6F14"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 py-3.5 rounded-2xl font-semibold text-sm sm:text-base shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Channel WhatsApp</span>
              <svg className="w-4 h-4 shrink-0 opacity-60 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            {/* X/Twitter */}
            <a
              href="https://x.com/lokerpwtku"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-black hover:bg-neutral-800 text-white px-6 py-3.5 rounded-2xl font-semibold text-sm sm:text-base shadow-lg shadow-black/25 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>Follow di X</span>
              <svg className="w-4 h-4 shrink-0 opacity-60 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AdSlot format="horizontal" className="mb-10" />

        {/* City Sections */}
        {cities.map((city, cityIndex) => {
          const jobs = (cityJobs[cityIndex] as JobPosting[]) || []
          return (
            <section key={city.key} className="mb-12" id={`section-${city.key}`}>
              <SectionHeader title={`Loker ${city.label}`} viewAllHref={city.href} />
              {jobs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              ) : (
                <EmptySection cityName={city.label} />
              )}

              {/* Ad after 2nd and 4th city section */}
              {(cityIndex === 1 || cityIndex === 3) && (
                <AdSlot format="in-article" className="mt-8" />
              )}
            </section>
          )
        })}

        <AdSlot format="horizontal" className="mb-10" />

        {/* All Latest Jobs */}
        <section id="semua-loker">
          <SectionHeader title="Semua Loker Terbaru" />
          {allJobs && (allJobs as JobPosting[]).length > 0 ? (
            <>
              <div className="flex flex-col gap-3">
                {(allJobs as JobPosting[]).map((job) => (
                  <JobListItem key={job._id} job={job} />
                ))}
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/" />
            </>
          ) : (
            <div className="bg-surface rounded-xl border border-border p-12 text-center shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.64-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Belum Ada Lowongan</h3>
              <p className="text-sm text-text-secondary">Lowongan kerja terbaru akan muncul di sini setelah ditambahkan melalui Sanity CMS.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
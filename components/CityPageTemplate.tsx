import React from 'react'
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { JOBS_BY_CITY_PAGINATED_QUERY, JOBS_BY_CITY_COUNT_QUERY } from '@/sanity/lib/queries'
import { JobPosting, cityLabels } from '@/lib/types'
import JobCard from '@/components/JobCard'
import SectionHeader from '@/components/SectionHeader'
import AdSlot from '@/components/AdSlot'
import Pagination from '@/components/Pagination'

const cityDescriptions: Record<string, string> = {
    purwokerto:
        'Temukan lowongan kerja terbaru di Purwokerto dan sekitarnya. Kota terbesar di Kabupaten Banyumas dengan berbagai peluang karir menarik.',
    purbalingga:
        'Lowongan kerja terkini di Purbalingga. Dikenal sebagai kota industri rambut palsu dan bulu mata terbesar di Indonesia.',
    cilacap:
        'Jelajahi kesempatan karir di Cilacap. Kota pelabuhan terbesar di pantai selatan Jawa dengan industri yang berkembang pesat.',
    banjarnegara:
        'Lowongan kerja terbaru di Banjarnegara. Kabupaten di dataran tinggi Dieng dengan potensi agribisnis dan pariwisata yang terus berkembang.',
    kebumen:
        'Peluang kerja menarik di Kebumen. Kabupaten dengan pertumbuhan ekonomi yang stabil dan beragam sektor usaha.',
    tegal:
        'Info lowongan kerja di Tegal. Kota industri di Pantai Utara Jawa dengan sektor manufaktur dan perdagangan yang maju.',
    brebes:
        'Lowongan kerja terbaru di Brebes. Kabupaten terluas di Jawa Tengah dengan potensi pertanian dan industri yang besar.',
    pemalang:
        'Info lowongan kerja di Pemalang. Kabupaten di Pantai Utara Jawa dengan potensi ekonomi yang menjanjikan.',
    pekalongan:
        'Lowongan kerja di Pekalongan. Kota Batik yang terkenal dengan industri kreatif dan tekstil berskala nasional.',
}

interface CityPageTemplateProps {
    city: string
    basePath: string
    searchParams: Promise<{ page?: string }>
}

const ITEMS_PER_PAGE = 8

export async function generateCityMetadata(city: string): Promise<Metadata> {
    const name = cityLabels[city] || city
    return {
        title: `Loker ${name} - Lowongan Kerja Terbaru | LokerPurwokertoku`,
        description: cityDescriptions[city] || `Lowongan kerja terbaru di ${name}. Temukan peluang karir terbaik di ${name} dan sekitarnya.`,
        keywords: `lowongan kerja ${name.toLowerCase()}, loker ${name.toLowerCase()}, karir ${name.toLowerCase()}, kerja ${name.toLowerCase()}`,
        openGraph: {
            title: `Loker ${name} - Lowongan Kerja Terbaru`,
            description: `Temukan lowongan kerja terbaru di ${name} dan sekitarnya.`,
            type: 'website',
        },
    }
}

export default async function CityPageTemplate({ city, basePath, searchParams }: CityPageTemplateProps) {
    const params = await searchParams
    const currentPage = Number(params.page) || 1
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE

    const [jobs, totalCount] = await Promise.all([
        client.fetch(JOBS_BY_CITY_PAGINATED_QUERY, { city, start, end }),
        client.fetch(JOBS_BY_CITY_COUNT_QUERY, { city }),
    ])

    const totalPages = Math.ceil((totalCount || 0) / ITEMS_PER_PAGE)
    const name = cityLabels[city] || city

    return (
        <div className="min-h-screen">
            {/* City Header */}
            <section className="relative bg-gradient-to-r from-red-600 to-red-800 py-12 sm:py-16">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M0%2020L20%200L40%2020L20%2040z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm mb-4">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {name}, Jawa Tengah
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                        Lowongan Kerja {name}
                    </h1>
                    <p className="text-red-100 max-w-2xl mx-auto text-sm sm:text-base">
                        {cityDescriptions[city]}
                    </p>
                    {totalCount > 0 && (
                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            {totalCount} lowongan tersedia
                        </div>
                    )}
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* AdSense: Top */}
                <AdSlot format="horizontal" className="mb-8" />

                <SectionHeader title={`Daftar Loker ${name}`} />

                {jobs && jobs.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {(jobs as JobPosting[]).map((job, index) => (
                                <React.Fragment key={job._id}>
                                    <JobCard job={job} />
                                    {/* Insert ad after row 4 */}
                                    {(index + 1) % 4 === 0 && index < jobs.length - 1 && (
                                        <div className="col-span-1 sm:col-span-2 lg:col-span-4">
                                            <AdSlot format="in-feed" />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        <Pagination currentPage={currentPage} totalPages={totalPages} basePath={basePath} />
                    </>
                ) : (
                    <div className="bg-white rounded-xl border border-border p-16 text-center">
                        <div className="w-20 h-20 mx-auto mb-5 bg-primary/10 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.64-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-text-primary mb-2">Belum Ada Lowongan di {name}</h3>
                        <p className="text-sm text-text-secondary max-w-md mx-auto">
                            Saat ini belum ada lowongan kerja yang tersedia untuk wilayah {name}. Silakan cek kembali nanti atau lihat lowongan di kota lainnya.
                        </p>
                    </div>
                )}

                {/* AdSense: Bottom */}
                <AdSlot format="in-article" className="mt-10" />
            </div>
        </div>
    )
}

import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

const BASE_URL = 'https://lokerpurwokertoku.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch all job slugs
    const jobs = await client.fetch<Array<{ slug: { current: string }; publishedAt: string }>>(
        `*[_type == "jobPosting"] | order(publishedAt desc) {
            slug,
            publishedAt
        }`
    )

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/loker-purwokerto`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/loker-purbalingga`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/loker-cilacap`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/loker-banjarnegara`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/loker-kebumen`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/loker-tegal`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/loker-brebes`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/loker-pemalang`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/loker-pekalongan`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ]

    // Dynamic job pages
    const jobPages: MetadataRoute.Sitemap = jobs.map((job) => ({
        url: `${BASE_URL}/loker/${job.slug.current}`,
        lastModified: new Date(job.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...staticPages, ...jobPages]
}

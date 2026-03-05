import CityPageTemplate, { generateCityMetadata } from '@/components/CityPageTemplate'

export async function generateMetadata() {
    return generateCityMetadata('brebes')
}

interface PageProps {
    searchParams: Promise<{ page?: string }>
}

export default function LokerBrebesPage({ searchParams }: PageProps) {
    return (
        <CityPageTemplate
            city="brebes"
            basePath="/loker-brebes"
            searchParams={searchParams}
        />
    )
}

import CityPageTemplate, { generateCityMetadata } from '@/components/CityPageTemplate'

export async function generateMetadata() {
    return generateCityMetadata('tegal')
}

interface PageProps {
    searchParams: Promise<{ page?: string }>
}

export default function LokerTegalPage({ searchParams }: PageProps) {
    return (
        <CityPageTemplate
            city="tegal"
            basePath="/loker-tegal"
            searchParams={searchParams}
        />
    )
}

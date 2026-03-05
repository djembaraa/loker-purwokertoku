import CityPageTemplate, { generateCityMetadata } from '@/components/CityPageTemplate'

export async function generateMetadata() {
    return generateCityMetadata('pekalongan')
}

interface PageProps {
    searchParams: Promise<{ page?: string }>
}

export default function LokerPekalonganPage({ searchParams }: PageProps) {
    return (
        <CityPageTemplate
            city="pekalongan"
            basePath="/loker-pekalongan"
            searchParams={searchParams}
        />
    )
}

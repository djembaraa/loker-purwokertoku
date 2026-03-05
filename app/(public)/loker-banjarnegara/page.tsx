import CityPageTemplate, { generateCityMetadata } from '@/components/CityPageTemplate'

export async function generateMetadata() {
    return generateCityMetadata('banjarnegara')
}

interface PageProps {
    searchParams: Promise<{ page?: string }>
}

export default function LokerBanjarnegaraPage({ searchParams }: PageProps) {
    return (
        <CityPageTemplate
            city="banjarnegara"
            basePath="/loker-banjarnegara"
            searchParams={searchParams}
        />
    )
}


export interface JobPosting {
  _id: string
  title: string
  slug: { current: string }
  company: string
  companyLogo?: string
  designImage?: string
  city: string
  jobType: string
  salary?: string
  description?: Array<Record<string, unknown>>
  requirements?: string[]
  contactInfo?: string
  deadline?: string
  isFeatured?: boolean
  publishedAt: string
}

// City value types
export type CitySlug = 'purwokerto' | 'purbalingga' | 'cilacap' | 'banjarnegara' | 'kebumen' | 'tegal' | 'brebes' | 'pemalang' | 'pekalongan'

// Job type values
export type JobType = 'full-time' | 'part-time' | 'kontrak' | 'freelance' | 'magang'


export const cityLabels: Record<string, string> = {
  purwokerto: 'Purwokerto',
  purbalingga: 'Purbalingga',
  cilacap: 'Cilacap',
  banjarnegara: 'Banjarnegara',
  kebumen: 'Kebumen',
  tegal: 'Tegal',
  brebes: 'Brebes',
  pemalang: 'Pemalang',
  pekalongan: 'Pekalongan',
}

export const jobTypeLabels: Record<string, string> = {
  'full-time': 'Full Time',
  'part-time': 'Part Time',
  kontrak: 'Kontrak',
  freelance: 'Freelance',
  magang: 'Magang',
}

export const jobTypeColors: Record<string, string> = {
  'full-time': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'part-time': 'bg-teal-50 text-teal-700 border-teal-200',
  kontrak: 'bg-amber-50 text-amber-700 border-amber-200',
  freelance: 'bg-violet-50 text-violet-700 border-violet-200',
  magang: 'bg-rose-50 text-rose-700 border-rose-200',
}


const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const MONTHS_LONG = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

export function formatDate(dateString: string): string {
  const d = new Date(dateString)
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`
}

export function formatDateShort(dateString: string): string {
  const d = new Date(dateString)
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`
}

export function formatDateLong(dateString: string): string {
  const d = new Date(dateString)
  return `${d.getDate()} ${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`
}

export function isDeadlineExpired(deadline?: string): boolean {
  if (!deadline) return false
  return new Date(deadline) < new Date()
}

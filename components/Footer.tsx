import Link from 'next/link'
import Image from 'next/image'

const cityLinks = [
    { href: '/loker-purwokerto', label: 'Loker Purwokerto' },
    { href: '/loker-purbalingga', label: 'Loker Purbalingga' },
    { href: '/loker-cilacap', label: 'Loker Cilacap' },
    { href: '/loker-banjarnegara', label: 'Loker Banjarnegara' },
    { href: '/loker-kebumen', label: 'Loker Kebumen' },
    { href: '/loker-tegal', label: 'Loker Tegal' },
    { href: '/loker-brebes', label: 'Loker Brebes' },
    { href: '/loker-pemalang', label: 'Loker Pemalang' },
    { href: '/loker-pekalongan', label: 'Loker Pekalongan' },
]

const quickLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
]

export default function Footer() {
    return (
        <footer className="bg-white border-t border-border mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2.5 mb-4">
                            <Image
                                src="/loker-purwokertoku-logo.png"
                                alt="LokerPurwokertoku Logo"
                                width={36}
                                height={36}
                                className="w-9 h-9 rounded-lg object-contain"
                            />
                            <span className="text-lg font-bold text-text-primary">LokerPurwokertoku</span>
                        </Link>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            Portal lowongan kerja terpercaya untuk wilayah Banyumas Raya dan sekitarnya. Temukan peluang karir terbaik di Purwokerto, Purbalingga, Cilacap, Banjarnegara, Kebumen, dan kota lainnya.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
                            Menu
                        </h3>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* City Pages */}
                    <div>
                        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
                            Lowongan per Kota
                        </h3>
                        <ul className="space-y-2.5">
                            {cityLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
                            Kontak
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2.5">
                                <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm text-text-secondary">info@lokerpurwokertoku.com</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm text-text-secondary">Purwokerto, Jawa Tengah, Indonesia</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 pt-6 border-t border-border-light">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs text-text-muted">
                            &copy; {new Date().getFullYear()} LokerPurwokertoku. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="/privacy-policy" className="text-xs text-text-muted hover:text-primary transition-colors">
                                Kebijakan Privasi
                            </Link>
                            <Link href="/terms" className="text-xs text-text-muted hover:text-primary transition-colors">
                                Syarat & Ketentuan
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

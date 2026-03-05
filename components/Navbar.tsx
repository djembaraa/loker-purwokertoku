'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/loker-purwokerto', label: 'Purwokerto' },
    { href: '/loker-purbalingga', label: 'Purbalingga' },
    { href: '/loker-cilacap', label: 'Cilacap' },
    { href: '/loker-banjarnegara', label: 'Banjarnegara' },
    { href: '/loker-kebumen', label: 'Kebumen' },
]

const nasionalLinks = [
    { href: '/loker-tegal', label: 'Tegal' },
    { href: '/loker-brebes', label: 'Brebes' },
    { href: '/loker-pemalang', label: 'Pemalang' },
    { href: '/loker-pekalongan', label: 'Pekalongan' },
]

export default function Navbar() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isNasionalOpen, setIsNasionalOpen] = useState(false)
    const [isMobileNasionalOpen, setIsMobileNasionalOpen] = useState(false)
    const nasionalRef = useRef<HTMLDivElement>(null)

    const isNasionalActive = nasionalLinks.some((link) => pathname === link.href)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (nasionalRef.current && !nasionalRef.current.contains(event.target as Node)) {
                setIsNasionalOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <Image
                            src="/loker-purwokertoku-logo.png"
                            alt="LokerPurwokertoku Logo"
                            width={36}
                            height={36}
                            className="w-9 h-9 rounded-lg object-contain group-hover:scale-105 transition-transform duration-200"
                            priority
                        />
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-text-primary leading-tight">LokerPurwokertoku</span>
                            <span className="text-[10px] text-text-muted leading-tight hidden sm:block">Info Lowongan Banyumas Raya</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}

                        {/* Nasional Dropdown */}
                        <div className="relative" ref={nasionalRef}>
                            <button
                                onClick={() => setIsNasionalOpen(!isNasionalOpen)}
                                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isNasionalActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                    }`}
                            >
                                Nasional
                                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isNasionalOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isNasionalOpen && (
                                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-xl border border-border shadow-lg py-1.5 animate-fade-in-up z-50">
                                    {nasionalLinks.map((link) => {
                                        const isActive = pathname === link.href
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setIsNasionalOpen(false)}
                                                className={`block px-4 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                                                        ? 'bg-primary/10 text-primary'
                                                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                                    }`}
                                            >
                                                Loker {link.label}
                                            </Link>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        <Link
                            href="/about"
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === '/about'
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                }`}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === '/contact'
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                }`}
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
                        aria-label="Toggle menu"
                        id="mobile-menu-button"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden py-3 border-t border-border-light animate-slide-down">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            })}

                            {/* Mobile Nasional Dropdown */}
                            <button
                                onClick={() => setIsMobileNasionalOpen(!isMobileNasionalOpen)}
                                className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isNasionalActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                    }`}
                            >
                                Nasional
                                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isMobileNasionalOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isMobileNasionalOpen && (
                                <div className="ml-4 flex flex-col gap-1">
                                    {nasionalLinks.map((link) => {
                                        const isActive = pathname === link.href
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                                        ? 'bg-primary/10 text-primary'
                                                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                                    }`}
                                            >
                                                Loker {link.label}
                                            </Link>
                                        )
                                    })}
                                </div>
                            )}

                            <Link
                                href="/about"
                                onClick={() => setIsMenuOpen(false)}
                                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === '/about'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                    }`}
                            >
                                About Us
                            </Link>
                            <Link
                                href="/contact"
                                onClick={() => setIsMenuOpen(false)}
                                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === '/contact'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                    }`}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

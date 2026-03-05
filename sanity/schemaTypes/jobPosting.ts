import React from 'react'
import { defineField, defineType } from 'sanity'
import CloudinaryUploadInput from '../components/CloudinaryUploadInput'

export const jobPosting = defineType({
    name: 'jobPosting',
    title: 'Lowongan Kerja',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Judul Lowongan',
            type: 'string',
            validation: (Rule) => Rule.required().min(5).max(120),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 200,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'company',
            title: 'Nama Perusahaan',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'companyLogo',
            title: 'Logo Perusahaan (Opsional)',
            type: 'url',
            description: 'Upload logo perusahaan. Opsional.',
            components: {
                input: CloudinaryUploadInput,
            },
            validation: (Rule) =>
                Rule.uri({
                    scheme: ['http', 'https'],
                }),
        }),
        defineField({
            name: 'designImage',
            title: 'Desain/Poster Lowongan (Opsional)',
            type: 'url',
            description: 'Upload gambar desain informasi lowongan kerja (poster/flyer). Opsional.',
            components: {
                input: CloudinaryUploadInput,
            },
            validation: (Rule) =>
                Rule.uri({
                    scheme: ['http', 'https'],
                }),
        }),
        defineField({
            name: 'city',
            title: 'Kota',
            type: 'string',
            options: {
                list: [
                    { title: 'Purwokerto', value: 'purwokerto' },
                    { title: 'Purbalingga', value: 'purbalingga' },
                    { title: 'Cilacap', value: 'cilacap' },
                    { title: 'Banjarnegara', value: 'banjarnegara' },
                    { title: 'Kebumen', value: 'kebumen' },
                    { title: 'Tegal', value: 'tegal' },
                    { title: 'Brebes', value: 'brebes' },
                    { title: 'Pemalang', value: 'pemalang' },
                    { title: 'Pekalongan', value: 'pekalongan' },
                ],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'jobType',
            title: 'Tipe Pekerjaan',
            type: 'string',
            options: {
                list: [
                    { title: 'Full Time', value: 'full-time' },
                    { title: 'Part Time', value: 'part-time' },
                    { title: 'Kontrak', value: 'kontrak' },
                    { title: 'Freelance', value: 'freelance' },
                    { title: 'Magang', value: 'magang' },
                ],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'salary',
            title: 'Gaji',
            type: 'string',
            description: 'Contoh: Rp 3.000.000 - Rp 5.000.000 / bulan',
        }),
        defineField({
            name: 'description',
            title: 'Deskripsi Pekerjaan',
            type: 'array',
            of: [{ type: 'block' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'requirements',
            title: 'Persyaratan',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'contactInfo',
            title: 'Informasi Kontak',
            type: 'text',
            description: 'Email, WhatsApp, atau link pendaftaran',
        }),
        defineField({
            name: 'deadline',
            title: 'Batas Lamaran',
            type: 'date',
        }),
        defineField({
            name: 'isFeatured',
            title: 'Tampilkan di Hero',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'publishedAt',
            title: 'Tanggal Publikasi',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    orderings: [
        {
            title: 'Terbaru',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'company',
            logo: 'companyLogo',
        },
        prepare(selection) {
            const { title, subtitle, logo } = selection
            return {
                title: title,
                subtitle: subtitle,
                media: logo
                    ? React.createElement('img', {
                          src: logo,
                          alt: subtitle || '',
                          style: { width: '100%', height: '100%', objectFit: 'cover' },
                      })
                    : undefined,
            }
        },
    },
})

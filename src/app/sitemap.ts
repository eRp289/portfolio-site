import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ypinchuck.com';
    const lastModified = new Date();

    // Main page with all sections
    const mainSections = [
        '', // Home
        '#about',
        '#experience',
        '#education',
        '#skills',
        '#projects',
        '#contact',
    ];

    return mainSections.map((section) => ({
        url: `${baseUrl}/${section}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: section === '' ? 1 : 0.8,
    }));
}

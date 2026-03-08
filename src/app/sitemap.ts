import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ishubarman7.xyz';

    // Since this is a single page application with sections, 
    // we primarily want to index the root.
    // However, we can also index specific hash routes if we want search engines
    // to potentially jump users straight to those sections (though Google usually prefers distinct pages).
    // We'll stick to semantic distinct pages if any exist, but for a one-pager, the root is most important.

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        // If there were separate routes like /projects, /blog, etc., they would go here:
        // {
        //     url: `${baseUrl}/projects`,
        //     lastModified: new Date(),
        //     changeFrequency: 'monthly',
        //     priority: 0.8,
        // },
    ];
}

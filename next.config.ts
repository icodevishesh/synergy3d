import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/lab-services/products',
        destination: '/lab-services',
        permanent: true,
      },
      {
        source: '/items/screwmentable',
        destination: '/lab-services/products/screwmentable',
        permanent: true,
      },
      {
        source: '/items/temporary-bridge',
        destination: '/lab-services/products/temporary-bridge',
        permanent: true,
      },
      {
        source: '/items/screw-retained-bridge',
        destination: '/lab-services/products/screw-retained-bridge',
        permanent: true,
      },
      {
        source: '/items/night-guard',
        destination: '/lab-services/products/night-guards',
        permanent: true,
      },
      {
        source: '/items/zirconia-hybrid',
        destination: '/lab-services/products/zirconia-hybrid',
        permanent: true,
      },
      {
        source: '/items/zirconia-crown',
        destination: '/lab-services/products/zirconia-crowns',
        permanent: true,
      },
      {
        source: '/items/flexible-partials',
        destination: '/lab-services/products/flexible-partials',
        permanent: true,
      },
      {
        source: '/items/zirconia-screw-retained-crown-with-ti-base',
        destination: '/lab-services/products/zirconia-screw-retained-crown-with-ti-base',
        permanent: true,
      },
      {
        source: '/items/screwmentable-crown-abutment-with-screw-channel-crown',
        destination: '/lab-services/products/screwmentable-crown-abutment-with-screw-channel-crown',
        permanent: true,
      },
      {
        source: '/items/emax',
        destination: '/lab-services/products/e-max-restorations',
        permanent: true,
      },
      {
        source: '/items/millable-flexible-partials',
        destination: '/lab-services/products/millable-flexible-partials',
        permanent: true,
      },
      {
        source: '/items/porcelain-fused-to-zirconia',
        destination: '/lab-services/products/porcelain-fused-to-zirconia',
        permanent: true,
      },
      {
        source: '/items/process-implant-acrylic-denture',
        destination: '/lab-services/products/process-implant-acrylic-denture',
        permanent: true,
      },
      {
        source: '/items/screw-retained-pmma-bridge',
        destination: '/lab-services/products/screw-retained-pmma-bridge',
        permanent: true,
      },
      {
        source: '/items/screw-retained-zirconia-bridge',
        destination: '/lab-services/products/screw-retained-zirconia-bridge',
        permanent: true,
      },
      {
        source: '/items/temporaries',
        destination: '/lab-services/products/temporaries',
        permanent: true,
      },
      {
        source: '/items/partial-metal-framework',
        destination: '/lab-services/products/partial-metal-framework',
        permanent: true,
      },
      {
        source: '/items/acrylic-partial',
        destination: '/lab-services/products/acrylic-partial',
        permanent: true,
      },
      {
        source: '/items/acrylic-denture',
        destination: '/lab-services/products/acrylic-denture',
        permanent: true,
      },
      {
        source: '/items/full-contour-zirconia',
        destination: '/lab-services/products/full-contour-zirconia',
        permanent: true,
      },
      {
        source: '/items/titanium-custom-abutments',
        destination: '/lab-services/products/titanium-custom-abutments',
        permanent: true,
      },
      {
        source: '/items/pfm',
        destination: '/lab-services/products/pfm-crowns',
        permanent: true,
      },
      {
        source: '/items/wax-up',
        destination: '/lab-services/products/wax-up',
        permanent: true,
      },
      {
        source: '/items/zirconia-hybrid-custom-abutment',
        destination: '/lab-services/products/zirconia-hybrid-custom-abutment',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/lab-services',
        permanent: true,
      },
      {
        source: '/client-testimonials',
        destination: '/customer-stories',
        permanent: true,
      },
      {
        source: '/request-shipping-label',
        destination: '/customer-portal',
        permanent: true,
      },
      {
        source: '/submit-digital-file',
        destination: '/customer-portal',
        permanent: true,
      },
      {
        source: '/category/blog',
        destination: '/articles',
        permanent: true,
      },
      {
        source: '/products/page/2',
        destination: '/lab-services',
        permanent: true,
      },
      {
        source: '/products/page/3',
        destination: '/lab-services',
        permanent: true,
      },
      {
        source: '/teams/enrico-romano',
        destination: '/about-us/enrico',
        permanent: true,
      },
      {
        source: '/teams/davie-carino',
        destination: '/about-us/davie',
        permanent: true,
      },
      {
        source: '/teams/gina-romano',
        destination: '/about-us/gina',
        permanent: true,
      },
      {
        source: '/teams/milos-markovic',
        destination: '/about-us/milos',
        permanent: true,
      },
      {
        source: '/teams/erik-morales',
        destination: '/about-us/erik',
        permanent: true,
      },
      {
        source: '/teams/ashley-sgaramella',
        destination: '/about-us/ashley',
        permanent: true,
      },
      {
        source: '/teams/kelli-trainor',
        destination: '/about-us/kelli',
        permanent: true,
      },
      {
        source: '/job-application',
        destination: '/apply',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2025/03/synegy-script.pdf',
        destination: '/synergy_script.pdf',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

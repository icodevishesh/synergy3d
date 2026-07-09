// lib/schema/home.ts

export const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://synergy3d.net/#organization",
      "name": "Synergy 3D",
      "legalName": "Synergy 3D Inc.",
      "url": "https://synergy3d.net/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://synergy3d.net/#logo",
        "url": "https://synergy3d.net/_next/static/media/synergy3d_logo-new.22tr8ajfzh_x4.png",
        "caption": "Synergy 3D"
      },
      "image": { "@id": "https://synergy3d.net/#logo" },
      "description": "New York-based digital dental laboratory offering precision restorations engineered with CAD/CAM technology, in-house milling, and FDA-cleared materials, delivered in five days.",
      "slogan": "Your one-stop digital dental lab.",
      "foundingDate": "2014-11",
      "founder": { "@id": "https://synergy3d.net/about-us/enrico#person" },
      "email": "info@synergy3d.net",
      "telephone": "+1-845-447-1807",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1147 Route 9",
        "addressLocality": "Wappingers Falls",
        "addressRegion": "NY",
        "postalCode": "12590",
        "addressCountry": "US"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-845-447-1807",
          "email": "info@synergy3d.net",
          "contactType": "customer support",
          "areaServed": "US",
          "availableLanguage": "English"
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/synergy-3d-inc/",
        "https://www.youtube.com/@Synergy_Talks",
        "https://www.instagram.com/synergy3d/",
        "https://www.facebook.com/profile.php?id=61579941141411"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://synergy3d.net/#website",
      "url": "https://synergy3d.net/",
      "name": "Synergy 3D",
      "description": "New York's premier digital dental lab.",
      "publisher": { "@id": "https://synergy3d.net/#organization" },
      "inLanguage": "en-US"
    },
    {
      "@type": "WebPage",
      "@id": "https://synergy3d.net/#webpage",
      "url": "https://synergy3d.net/",
      "name": "Synergy 3D — Digital Dental Lab",
      "description": "Precision crowns and restorations — engineered with CAD/CAM, milled in-house, and delivered in five days flat.",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "about": { "@id": "https://synergy3d.net/#organization" },
      "primaryImageOfPage": { "@id": "https://synergy3d.net/#logo" },
      "inLanguage": "en-US"
    },
    {
      "@type": "FAQPage",
      "@id": "https://synergy3d.net/#faqpage",
      "url": "https://synergy3d.net/",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "inLanguage": "en-US",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Synergy 3D?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Synergy 3D is a New York-based digital dental laboratory offering precision restorations engineered with CAD/CAM technology, in-house milling, and FDA-cleared materials — delivered in 5 days or less."
          }
        },
        {
          "@type": "Question",
          "name": "What are the benefits of a digital dental lab?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Digital labs eliminate manual impression errors, produce more consistent restorations, reduce remake rates, and dramatically speed up turnaround. With Synergy 3D, you get sub-30µm fit accuracy on every case."
          }
        },
        {
          "@type": "Question",
          "name": "Which scanners are compatible?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We accept files from all major intraoral scanners including iTero, 3Shape, Medit, Carestream, Dexis, Sirona, Planmeca, and Align. Contact us if you use a different scanner and we'll verify compatibility."
          }
        },
        {
          "@type": "Question",
          "name": "How does the submission process work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Scan your patient, upload the .STL or .DCM file to our secure portal, complete the case form, and submit. Our team receives it instantly and begins design the same day — no shipping, no waiting."
          }
        },
        {
          "@type": "Question",
          "name": "What is your remake policy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer a full remake guarantee on any restoration that doesn't meet clinical fit standards. Our remake rate of less than 1% reflects our precision, but if something isn't right, we fix it at no cost to you."
          }
        },
        {
          "@type": "Question",
          "name": "How does Synergy 3D compare to other labs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We combine in-house milling, expert technicians, premium materials, and a fully digital workflow to deliver superior accuracy at competitive pricing — a 4.2-day average turnaround and a remake rate of less than 1%."
          }
        }
      ]
    }
  ]
}
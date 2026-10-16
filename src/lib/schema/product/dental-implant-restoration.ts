export const dentalImplantRestorationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://synergy3d.net/products/dental-implant-restoration#product",
      "name": "Dental Implant Restoration",
      "category": "Implant Solutions",
      "description": "Synergy 3D is a New York dental implant lab designing screw-retained and cement-retained implant crowns on Ti-base or custom abutments. Sub-30µm fit, delivered in 5 business days.",
      "image": "https://synergy3d.net/assets/products/implant_crowns_from_our_dental_implant_lab.png",
      "url": "https://synergy3d.net/products/dental-implant-restoration",
      "material": "Zirconia / Titanium / E.max",
      "brand": { "@type": "Brand", "name": "Synergy 3D" },
      "manufacturer": { "@id": "https://synergy3d.net/#organization" },
      "isRelatedTo": [
        { "@id": "https://synergy3d.net/products/all-on-x-hybrids#product" },
        { "@id": "https://synergy3d.net/products/surgical-guides#product" },
        { "@id": "https://synergy3d.net/products/zirconia-crowns#product" }
      ],
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Turnaround", "value": "5 Business Days" },
        { "@type": "PropertyValue", "name": "Fit Accuracy", "value": "Sub-30µm" },
        { "@type": "PropertyValue", "name": "Material", "value": "Zirconia / Titanium / E.max" },
        { "@type": "PropertyValue", "name": "Retention", "value": "Screw or Cement" }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://synergy3d.net/products/dental-implant-restoration#webpage",
      "url": "https://synergy3d.net/products/dental-implant-restoration",
      "name": "Dental Implant Restoration — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "primaryImageOfPage": "https://synergy3d.net/assets/products/implant_crowns_from_our_dental_implant_lab.png",
      "mainEntity": { "@id": "https://synergy3d.net/products/dental-implant-restoration#product" },
      "breadcrumb": { "@id": "https://synergy3d.net/products/dental-implant-restoration#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/products/dental-implant-restoration#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "Lab Services", "item": "https://synergy3d.net/products" },
        { "@type": "ListItem", "position": 3, "name": "Dental Implant Restoration", "item": "https://synergy3d.net/products/dental-implant-restoration" }
      ]
    }
  ]
};

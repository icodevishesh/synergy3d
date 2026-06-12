import { TeamMember } from '@/types';
import enrico from '@/app/assets/Enrico-Romano-CEO-Owner-scaled.jpg';
import davie from '@/app/assets/Davie-Carino-C.O.O-scaled.jpg';
import gina from '@/app/assets/GIna-Romano-CMO-Owner-scaled.jpg';
import milos from '@/app/assets/Milos-Markovic-VP-of-CADCAM-and-Implantology-scaled.jpg';
import erik from '@/app/assets/Erik-Morales-VP-of-Removable-Prosthetics-scaled.jpg';
import ashley from '@/app/assets/Ashley-Sgaramella-VP-of-Customer-Integration-scaled.jpg';
import kelli from '@/app/assets/Kelli-Trainor-scaled.jpg';

export const TEAM: Record<string, TeamMember> = {
  enrico: {
    id: 'enrico',
    name: 'Enrico Romano',
    role: 'CEO & Owner',
    image: enrico,
    title: 'Chief Executive Officer & Owner',
    bio: [
      'Enrico Romano is the founder and CEO of Synergy 3D, bringing over two decades of deep expertise in dental technology and laboratory science. Enrico established Synergy 3D in November 2014 with a singular vision: to build a fully digital dental lab at a time when the rest of the industry was still relying on analog workflows.',
      'Under his leadership, Synergy 3D has grown from a single milling unit into a comprehensive digital dental laboratory serving thousands of practices across the United States. His relentless pursuit of precision — achieving a remake rate of less than 1% and fit accuracy to sub-30µm — has set a new standard in the industry.',
      'Enrico is also the host of SynergyTalks, where he brings his clinical insights and industry experience to dentists and lab professionals across the country.'
    ],
    skills: ['Digital Workflow Strategy', 'Full-Arch Implantology', 'CAD/CAM Technology', 'Practice Development', 'Team Leadership'],
    colleagues: ['davie', 'gina', 'milos']
  },
  davie: {
    id: 'davie',
    name: 'Davie Carino',
    role: 'C.O.O',
    image: davie,
    title: 'Chief Operating Officer',
    bio: [
      'Davie Carino serves as Chief Operating Officer at Synergy 3D, overseeing all day-to-day operations, production workflows, and quality control systems. His operational expertise ensures that every restoration leaving the lab meets the exacting standards that Synergy 3D is known for.',
      'With a background in both dental technology and operations management, Davie has been instrumental in scaling Synergy 3D\'s production capacity while maintaining the sub-30µm precision and less than 1% remake rate that define the lab\'s reputation.',
      'Davie works closely with the full technician team to continuously refine internal workflows, implement new digital technologies, and drive operational efficiencies that benefit both the lab and its dental partners.'
    ],
    skills: ['Operations Management', 'Production Workflow', 'Quality Control', 'Team Management', 'Digital Dentistry'],
    colleagues: ['enrico', 'gina', 'milos']
  },
  gina: {
    id: 'gina',
    name: 'Gina Romano',
    role: 'CMO & Owner',
    image: gina,
    title: 'Chief Marketing Officer & Owner',
    bio: [
      'Gina Romano is the Co-Owner and Chief Marketing Officer of Synergy 3D, responsible for brand strategy, customer relationships, and the overall growth of the Synergy 3D community across the United States.',
      'Gina has played a pivotal role in building the trusted reputation that Synergy 3D enjoys with over 500 partner dental practices today. Her customer-first philosophy ensures that every interaction with the lab reflects the highest standard of service and care.',
      'Beyond marketing, Gina is deeply involved in the company\'s cultural mission — building a team that is not only technically exceptional but also deeply committed to the success of every dental practice they serve.'
    ],
    skills: ['Brand Strategy', 'Customer Relations', 'Marketing Leadership', 'Business Development', 'Team Culture'],
    colleagues: ['enrico', 'davie', 'milos']
  },
  milos: {
    id: 'milos',
    name: 'Milos Markovic',
    role: 'VP of CAD/CAM & Implantology',
    image: milos,
    title: 'VP of CAD/CAM and Implantology',
    bio: [
      'Milos Markovic leads Synergy 3D\'s CAD/CAM and Implantology division, bringing deep technical expertise in digital design, milling, and full-arch implant prosthetics. He is responsible for the design and production of some of the lab\'s most complex restorative cases.',
      'With extensive experience in implant-supported prosthetics, Milos oversees the All-on-X hybrid framework program, surgical guide fabrication, and all digitally-designed crown and bridge cases. His precision-first approach is a cornerstone of the lab\'s industry-leading fit accuracy.',
      'Milos is also a key resource for dental offices seeking training on digital scanning and CAD/CAM workflow integration, reflecting Synergy 3D\'s commitment to clinician education.'
    ],
    skills: ['CAD/CAM Design', 'Implant Prosthetics', 'All-on-X Hybrids', 'Surgical Guide Fabrication', 'Digital Workflow'],
    colleagues: ['enrico', 'erik', 'ashley']
  },
  erik: {
    id: 'erik',
    name: 'Erik Morales',
    role: 'VP of Removable Prosthetics',
    image: erik,
    title: 'VP of Removable Prosthetics',
    bio: [
      'Erik Morales leads Synergy 3D\'s removable prosthetics division, bringing specialized expertise in full and partial dentures, flexible prosthetics, and precision-milled removable appliances. His team is responsible for producing restorations that restore both function and quality of life.',
      'Under Erik\'s leadership, Synergy 3D\'s removable prosthetics department has embraced fully digital workflows — from digital denture design to precision milling — dramatically improving fit, turnaround time, and patient satisfaction outcomes.',
      'Erik\'s deep knowledge of occlusion, articulation, and denture aesthetics makes him a critical resource for dental offices managing complex full-arch edentulous cases.'
    ],
    skills: ['Removable Prosthetics', 'Digital Dentures', 'Partial Denture Design', 'Occlusion', 'Flexible Materials'],
    colleagues: ['enrico', 'milos', 'kelli']
  },
  ashley: {
    id: 'ashley',
    name: 'Ashley Lezon',
    role: 'VP of Customer Integration',
    image: ashley,
    title: 'VP of Customer Integration',
    bio: [
      'Ashley Lezon serves as VP of Customer Integration at Synergy 3D, serving as the primary bridge between the lab and its growing network of dental practice partners. She ensures that every practice has a seamless onboarding experience and the ongoing support they need to succeed.',
      'Ashley and her team are responsible for scanner training, digital workflow integration, case submission support, and ongoing customer education. Her work directly supports Synergy 3D\'s mission of making digital dentistry accessible to every practitioner.',
      'Her commitment to customer success has been a major driver of Synergy 3D\'s industry-leading satisfaction scores and the loyalty of over 500 partner practices nationwide.'
    ],
    skills: ['Customer Success', 'Practice Integration', 'Scanner Training', 'Workflow Consulting', 'Relationship Management'],
    colleagues: ['enrico', 'milos', 'kelli']
  },
  kelli: {
    id: 'kelli',
    name: 'Kelli Trainor',
    role: 'Crown & Bridge Team Leader',
    image: kelli,
    title: 'Crown and Bridge Team Leader',
    bio: [
      'Kelli Trainor leads Synergy 3D\'s Crown and Bridge team, overseeing the production of the lab\'s highest-volume restoration category with the meticulous precision the lab is known for. Her team produces thousands of zirconia, e.max, and PFM restorations every month.',
      'Kelli\'s deep technical background in ceramic restorations — from shade matching to occlusal design — ensures that every crown leaving the lab reflects the natural aesthetics and superior fit that dentists and patients expect.',
      'As team leader, Kelli mentors junior technicians and maintains the quality control standards that contribute to Synergy 3D\'s less than 1% remake rate on crown and bridge cases.'
    ],
    skills: ['Zirconia Restorations', 'e.max Ceramics', 'Shade Matching', 'Quality Control', 'Team Leadership'],
    colleagues: ['enrico', 'erik', 'ashley']
  }
};

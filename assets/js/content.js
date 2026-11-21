/* ========================================================================
   AMRL WEBSITE CONTENT — EDIT THIS FILE TO UPDATE THE WEBSITE
   ------------------------------------------------------------------------
   You normally only need to edit this file:
   - Text, descriptions, dates, names and research topics
   - Photos: use paths such as "assets/images/emon.jpg"
   - Links: use full https:// URLs
   - Add/remove people, alumni, publications, news and opportunities

   Do not delete commas or quotation marks. Keep the JavaScript structure.
   Empty optional values can be written as "".
   ======================================================================== */

export const SITE = {
  /* 01. WEBSITE DETAILS -------------------------------------------------- */
  meta: {
    name: "Advanced Materials Research Laboratory",
    shortName: "AMRL",
    institution: "Department of Physics, Pabna University of Science and Technology",
    location: "Pabna 6600, Bangladesh",
    email: "lokman.ali@pust.ac.bd",
    website: "https://amrllab.netlify.app/",
    memberPortal: "https://amrl-private-portal.vercel.app/",
    googleScholar: "https://scholar.google.com/citations?user=agk7avEAAAAJ&hl=en",
    researchGate: "https://www.researchgate.net/profile/Md-Lokman-Ali",
    orcid: "https://orcid.org/0000-0001-5750-9412",
    linkedin: "",
    ogImage: "https://amrllab.netlify.app/og-image.png"
  },

  navigation: [
    { label: "About", href: "about.html", page: "about" },
    { label: "PI", href: "pi.html", page: "pi" },
    { label: "Research", href: "research.html", page: "research" },
    { label: "People", href: "people.html", page: "people" },
    { label: "Alumni", href: "alumni.html", page: "alumni" },
    { label: "Papers", href: "publications.html", page: "publications" },
    { label: "Computational Tools", href: "computational-tools.html", page: "computational-tools" },
    { label: "News", href: "news.html", page: "news" },
    { label: "Opportunities", href: "opportunities.html", page: "opportunities" },
    { label: "Contact", href: "contact.html", page: "contact" }
  ],

  /* 01B. PRIVATE ADMIN CONFIGURATION ------------------------------------ */
  /* Set these after creating the Supabase project. Never add a service-role key here. */
  backend: {
    supabaseUrl: "https://YOUR-PROJECT-REF.supabase.co",
    supabasePublishableKey: "YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY",
    piAdminEmail: "lokman.ali@pust.ac.bd"
  },

  /* 02. HOME PAGE -------------------------------------------------------- */
  hero: {
    eyebrow: "Computational materials science · PUST · Bangladesh",
    title: "Designing the materials that will shape tomorrow.",
    description: "We combine first-principles calculations, atomistic modelling and device-level simulation to understand, predict and design advanced materials for energy, electronics and future technologies.",
    primaryLabel: "Explore our research",
    primaryHref: "research.html",
    secondaryLabel: "Work with AMRL",
    secondaryHref: "opportunities.html",
    visualLabel: "Interactive atomic lattice",
    ticker: [
      "First-principles materials discovery",
      "High-entropy and multi-principal element alloys",
      "Lead-free optoelectronic materials",
      "Hydrogen storage and energy conversion",
      "Phonons, transport and materials under pressure"
    ]
  },

  highlights: [
    {
      number: "01",
      title: "Predictive materials modelling",
      description: "From electronic structure and phonons to finite-temperature behaviour, linking atomic-scale physics with measurable properties."
    },
    {
      number: "02",
      title: "Materials for clean energy",
      description: "Exploring lead-free perovskites, thermoelectrics, hydrogen-storage materials and advanced functional compounds."
    },
    {
      number: "03",
      title: "Collaborative science",
      description: "Building connections between computational researchers, experimental laboratories and the wider materials community."
    }
  ],

  /* Update these figures and the note whenever new verified data are available. */
  stats: {
    note: "Principal Investigator's Google Scholar figures supplied for September 2025. Please update these figures before publication if they have changed.",
    items: [
      { value: 53, label: "Publications" },
      { value: 770, label: "Citations" },
      { value: 14, label: "h-index" },
      { value: 22, label: "i10-index" }
    ]
  },

  /* 03. ABOUT ------------------------------------------------------------ */
  about: {
    kicker: "Who we are",
    title: "A research group driven by curiosity and computation.",
    intro: "The Advanced Materials Research Laboratory (AMRL) is based in the Department of Physics at Pabna University of Science and Technology. Our work focuses on computationally understanding materials and identifying promising candidates for emerging technologies.",
    vision: "To become a recognised centre for computational materials research in Bangladesh, producing rigorous science that informs the design of next-generation functional materials.",
    mission: "To train curious researchers, conduct reproducible research, publish high-quality scientific work and share computational knowledge with the wider research community.",
    milestones: [
      { date: "Established", title: "Laboratory foundation", details: "Add the verified establishment year and founding milestones here." },
      { date: "Research growth", title: "Building research themes", details: "Add important projects, collaborations and early publications here." },
      { date: "Infrastructure", title: "Expanding computational capabilities", details: "Add verified software, computing and infrastructure milestones here." },
      { date: "Today", title: "A growing research community", details: "Developing new collaborations and training the next generation of materials researchers." }
    ]
  },

  /* 04. PRINCIPAL INVESTIGATOR ------------------------------------------ */
  pi: {
    name: "Dr. Md. Lokman Ali",
    title: "Principal Investigator",
    position: "Associate Professor, Department of Physics, Pabna University of Science and Technology; Director, Research and Technology Transfer Cell.",
    biography: "His research interests include computational materials science, multi-scale modelling, multi-principal element alloys, optoelectronic materials and lead-free functional materials.",
    photo: "photos/560c403188c84f3ad7a5b90e44824c9b.jpg",
    education: [
      "Ph.D., Mechanical Science and Bio-engineering, Osaka University, Japan, 2021",
      "M.S., Physics, University of Chittagong, 2013 (3.93/4.00, 1st position)",
      "B.Sc., Physics, University of Chittagong, 2011 (3.72/4.00, 1st position)"
    ],
    appointments: [
      "Director, Research and Technology Transfer Cell, PUST, since May 2025",
      "Associate Professor, Department of Physics, PUST, since August 2022",
      "Assistant Professor, PUST, November 2016 – August 2022",
      "Lecturer, PUST, November 2014 – November 2016",
      "Treasurer, Physics Association, PUST"
    ],
    awards: [
      "MEXT (Japanese Government) Scholarship for Ph.D. study at Osaka University, 2018",
      "Distinction Award for outstanding M.S. results, 2013",
      "Distinction Award for excellent B.Sc. (Hons) results, 2011"
    ],
    metrics: "53 papers · 770 citations · h-index 14 · i10-index 22 (Google Scholar, September 2025)",
    supervision: "Currently supervising 1 M.Phil., 4 MS and 5 undergraduate thesis students.",
    links: {
      scholar: "https://scholar.google.com/citations?user=agk7avEAAAAJ&hl=en",
      researchgate: "https://www.researchgate.net/profile/Md-Lokman-Ali",
      orcid: "https://orcid.org/0000-0001-5750-9412",
      linkedin: ""
    }
  },

  /* 05. RESEARCH AREAS --------------------------------------------------- */
  research: [
    {
      title: "Computational materials science",
      category: "Methods",
      description: "First-principles calculations and multi-scale modelling using DFT, molecular dynamics and related computational approaches.",
      tags: ["DFT", "AIMD", "Materials modelling"]
    },
    {
      title: "Multi-principal element alloys",
      category: "Alloys",
      description: "Grain boundaries, dislocations, lattice distortion and chemical short-range order in high- and medium-entropy alloys.",
      tags: ["HEA", "MEA", "Atomistic modelling"]
    },
    {
      title: "Lead-free halide perovskites",
      category: "Energy materials",
      description: "Pressure-tuned electronic and optoelectronic properties of non-toxic perovskites, including photovoltaic device modelling.",
      tags: ["Perovskites", "DFT", "SCAPS-1D"]
    },
    {
      title: "Materials under pressure and temperature",
      category: "Extreme conditions",
      description: "Structural, mechanical, electronic, optical and thermodynamic properties of solids under external conditions.",
      tags: ["High pressure", "Thermodynamics"]
    },
    {
      title: "Superconductors and topological materials",
      category: "Quantum materials",
      description: "First-principles investigations of pressure-induced superconductivity and electronic topology in functional materials.",
      tags: ["Superconductivity", "Topology"]
    },
    {
      title: "Thermoelectric and optoelectronic materials",
      category: "Energy materials",
      description: "Materials for energy harvesting and conversion, including transport, optical response and device-relevant properties.",
      tags: ["Thermoelectrics", "Optics", "Transport"]
    }
  ],

  /* 06. CURRENT TEAM ----------------------------------------------------- */
  /* Add people here. Photo paths are relative to the website root. */
  people: [
    {
      name: "Md. Riad Khan",
      role: "MS Student",
      research: "Condensed Matter Physics, Computational Materials Science, DFT, Perovskite Solar Cells, Photovoltaic Device Simulation, Magnetic Materials, Optoelectronic Materials and Thermoelectric Materials",
      photo: "photos/riad.jpeg",
      links: {
        scholar: "https://scholar.google.com/citations?user=doNYLOoAAAAJ&hl=en",
        orcid: "https://orcid.org/0009-0003-2679-0629",
        researchgate: "https://www.researchgate.net/profile/Md-Riad-Khan-2",
        linkedin: "https://www.linkedin.com/in/md-riad-khan/",
        website: ""
      }
    },
    {
      name: "Md. Emon Hassan",
      role: "MS Student",
      research: "Condensed Matter Physics, Computational Materials Science, DFT, Hydrogen Storage and Thermoelectric Materials",
      photo: "photos/emon.jpg",
      links: {
        website: "https://emonhassan02.github.io/Profile/",
        scholar: "https://scholar.google.com/citations?user=D8O3IMoAAAAJ",
        orcid: "https://orcid.org/0009-0009-6252-3038",
        researchgate: "https://www.researchgate.net/profile/Emon-Hassan-2",
        linkedin: "https://www.linkedin.com/in/md-emon-hassan-076572438/"
      }
    },
    {
      name: "Md. Redwan Alam Hridoy",
      role: "MS Student",
      research: "Photovoltaics, Renewable Energy, Lead-Free Perovskites, Thin-Film Solar Cells, Semiconductor Device Modelling, DFT, Materials Design, Synthesis and Characterisation, Interface and Defect Engineering",
      photo: "photos/hidoy13.jpeg",
      links: {
        scholar: "https://scholar.google.com/citations?user=zpnj3dkAAAAJ&hl=en&oi=ao",
        orcid: "https://orcid.org/0009-0005-2981-5072",
        researchgate: "https://www.researchgate.net/profile/Redwan-Hridoy",
        linkedin: "https://www.linkedin.com/in/redwan-ridoy-b4a161396",
        website: ""
      }
    }
  ],

  /* 07. ALUMNI NETWORK --------------------------------------------------- */
  /*
     Add verified former AMRL members below. The public directory starts empty
     deliberately: do not publish anyone's details without their permission.

     Example alumni record (replace the example with real, approved details):
     {
       name: "Former Student Name",
       degree: "MS in Physics",
       graduationYear: "2024",
       currentRole: "Researcher / PhD Student / Professional",
       organisation: "Current organisation",
       location: "City, Country",
       research: "Research area or thesis topic",
       photo: "photos/alumni-name.jpg",
       profileUrl: "https://...",
       linkedin: "https://..."
     }
  */
  alumni: {
    intro: "AMRL alumni are part of the laboratory's continuing research community. This directory is intended to reconnect former students, share career journeys and create opportunities for mentoring and collaboration.",
    contactNote: "Alumni profiles are added only after review and permission from the person concerned.",
    profiles: []
  },

  /* 08. SELECTED PUBLICATIONS -------------------------------------------- */
  /* Add the newest verified publications at the top. DOI should not include https://doi.org/. */
  publications: [
    {
      year: "2026",
      title: "Tuning the structural and physical properties of Hf5Si3 intermetallic compound under pressure: Insights for next-generation high-temperature technology",
      authors: "Md. Emon Hassan, Md. Riad Khan, Zihad Hossain, Md. Khairul Alam, Mohammad Abdur Rashid, and Md. Lokman Ali",
      journal: "Scientific Reports",
      volume: "16",
      pages: "24463",
      doi: "10.1038/s41598-026-52144-z"
    },
    {
      year: "2026",
      title: "First-principles investigation of CuBiSeCl2: A quaternary halide chalcogenide material for advanced optoelectronic and thermoelectric energy harvesting and conversion technologies",
      authors: "Zihad Hossain, Md. Riad Khan, Sanzida Naznin Mim, Md. Emon Hassan, Mohammad Abdur Rashid, and Md. Lokman Ali",
      journal: "Materials Advances",
      volume: "7",
      issue: "3",
      pages: "1704–1720",
      doi: "10.1039/D5MA01386K"
    },
    {
      year: "2026",
      title: "Device-level engineering and optimization of high-efficiency lead-free NaSiCl3 perovskite solar cells using SCAPS-1D and COMSOL",
      authors: "Md. Redwan Alam Hridoy, Zihad Hossain, Md. Riad Khan, Prarthona Shaha, Md. Emon Hassan, Most. Meftaul Zannati Kemi, and Md. Lokman Ali",
      journal: "Materials Advances",
      doi: "10.1039/D6MA01128D"
    },
    {
      year: "2025",
      title: "Doping effect of antimony on BaFeO3 perovskite oxide: Optical, electronic, magnetic and thermoelectric properties",
      authors: "Md. Riad Khan, Sanzida Naznin Mim, Zihad Hossain, Md. Emon Hassan, Md. Saiful Alam, Mohammad Abdur Rashid, and Md. Lokman Ali",
      journal: "RSC Advances",
      volume: "15",
      pages: "38158–38175",
      doi: "10.1039/D5RA06101F"
    },
    {
      year: "2025",
      title: "Atomistic investigation of grain boundary strengthening and composition-dependent mechanical properties in CuNi binary alloys",
      authors: "S. N. Mim, Z. Hossain, Md. Lokman Ali",
      journal: "RSC Advances",
      volume: "15",
      doi: "10.1039/D5RA07327H"
    },
    {
      year: "2025",
      title: "Strategic engineering of charge transport layers for designing lead-free halide perovskite CsGeIBr2-based solar cells: Insights from DFT and SCAPS-1D modelling",
      authors: "Z. Hossain, R. Khan, S. N. Mim, M. A. Amin, M. Hossain, M. H. Rahman, Md. Lokman Ali",
      journal: "Energy Reports",
      volume: "14",
      pages: "2479"
    },
    {
      year: "2025",
      title: "Pressure effects on physical properties of binary rare earth monopnictide YBi for optoelectronic applications",
      authors: "Md. Lokman Ali, Z. Hossain, S. N. Mim, S. K. Saha",
      journal: "Advanced Theory and Simulations",
      pages: "2401066",
      doi: "10.1002/adts.202401066"
    },
    {
      year: "2024",
      title: "Pressure-driven perfection: Advancing lead-free halide perovskites Rb2AgBiX6 (X = Br, Cl) for optoelectronic applications",
      authors: "M. M. Hasan, M. Afsuddin, Md. Lokman Ali",
      journal: "Heliyon",
      volume: "20",
      pages: "e39285",
      doi: "10.1016/j.heliyon.2024.e39285"
    },
    {
      year: "2024",
      title: "Edge dislocations, alloy composition, and grain boundary effects on the mechanical properties in NiCo binary alloy",
      authors: "N. M. Nobin, Md. Lokman Ali, M. K. Alam",
      journal: "Scientific Reports",
      volume: "14",
      pages: "27790",
      doi: "10.1038/s41598-024-65437-y"
    },
    {
      year: "2024",
      title: "Edge dislocation and grain boundaries effects on the mechanical properties in NiCoAl medium entropy alloy",
      authors: "Md. Lokman Ali, M. Khan",
      journal: "Advanced Engineering Materials",
      volume: "26",
      pages: "2400614",
      doi: "10.1002/adem.202400614"
    },
    {
      year: "2024",
      title: "Advanced mechanical properties obtained via transition metals doped in CrFeNi medium entropy alloy",
      authors: "N. M. Nobin, Z. Hasan, M. Z. Rahaman, Md. Lokman Ali",
      journal: "Journal of Materials Research and Technology",
      volume: "30",
      pages: "5334",
      doi: "10.1016/j.jmrt.2024.04.247"
    },
    {
      year: "2023",
      title: "Highly efficient and stable lead-free cesium copper halide perovskites for optoelectronic applications: A DFT-based study",
      authors: "Md. Lokman Ali, M. Khan, M. A. Al Asad, M. Z. Rahaman",
      journal: "Heliyon",
      volume: "9",
      pages: "e18816",
      doi: "10.1016/j.heliyon.2023.e18816"
    },
    {
      year: "2021",
      title: "Pressure- and temperature-dependent physical metallurgy in a face-centered cubic NiCoFeCrMn high entropy alloy and its subsystems",
      authors: "Md. Lokman Ali, E. Haque, M. Z. Rahaman",
      journal: "Journal of Alloys and Compounds",
      volume: "873",
      pages: "159843",
      doi: "10.1016/j.jallcom.2021.159843"
    },
    {
      year: "2020",
      title: "An atomistic modelling study of the relationship between critical resolved shear stress and atomic structure distortion in FCC high entropy alloys",
      authors: "Md. Lokman Ali, S. Shinzato, V. Wang, Z. Shen, J. Du, S. Ogata",
      journal: "Materials Transactions",
      volume: "61",
      pages: "605",
      doi: "10.2320/matertrans.MT-MK2019007"
    }
  ],

  /* 09. FACILITIES AND SOFTWARE ----------------------------------------- */
  facilities: [
    "Density Functional Theory (DFT) and first-principles calculations",
    "Ab initio Molecular Dynamics (AIMD)",
    "Structural optimisation and phase stability analysis",
    "Electronic band structure and density of states calculations",
    "Phonon dispersion and lattice dynamics",
    "Thermoelectric transport and lattice thermal conductivity",
    "Hydrogen storage and desorption analysis",
    "Optical, magnetic and mechanical property calculations",
    "Photovoltaic device simulation"
  ],
  software: [
    { name: "WIEN2k", abbr: "W2K", category: "Electronic structure / DFT", description: "All-electron full-potential LAPW calculations for accurate electronic structures and physical properties of crystalline materials.", useCases: ["Band structures and total / partial density of states", "Optimised structures and equation-of-state analysis", "Elastic constants, optical response and magnetic properties"], outputs: "Electronic bands, DOS, charge density, optical spectra and elastic tensors", website: "https://www.wien2k.at/" },
    { name: "Quantum ESPRESSO", abbr: "QE", category: "Electronic structure / DFT", description: "Plane-wave pseudopotential DFT suite for structural optimisation, electronic structures, response properties and first-principles simulations.", useCases: ["SCF / NSCF and variable-cell relaxation", "DFPT phonons and electron–phonon workflows", "Projected DOS, charge density and optical response workflows"], outputs: "Relaxed structures, bands, DOS, phonons and response functions", website: "https://www.quantum-espresso.org/" },
    { name: "VASP", abbr: "VASP", category: "Electronic structure / DFT", description: "Plane-wave DFT package for structural, electronic, magnetic and thermodynamic modelling of materials.", useCases: ["Geometry optimisation and energy comparisons", "Band gaps, magnetic ordering and defect energetics", "Ab initio molecular dynamics and finite-temperature sampling"], outputs: "Total energies, forces, stress, bands, DOS and AIMD trajectories", website: "https://www.vasp.at/" },
    { name: "CASTEP", abbr: "CASTEP", category: "Electronic structure / DFT", description: "Plane-wave pseudopotential code for first-principles materials modelling and property prediction.", useCases: ["Geometry optimisation and elastic properties", "Electronic structure and optical properties", "Phonons and lattice-dynamical properties"], outputs: "Optimised cells, bands, DOS, optical spectra and phonon data", website: "https://www.castep.org/" },
    { name: "Phonopy", abbr: "PH", category: "Phonons / lattice dynamics", description: "Phonon calculation and analysis toolkit using finite-displacement force constants from first-principles calculations.", useCases: ["Phonon dispersion and phonon density of states", "Dynamical stability checks across high-symmetry paths", "Vibrational free energy and thermodynamic functions"], outputs: "Phonon bands, phonon DOS, thermal properties and force-constant data", website: "https://phonopy.github.io/phonopy/" },
    { name: "BoltzTraP2", abbr: "BT2", category: "Transport / thermoelectrics", description: "Semi-classical Boltzmann transport analysis from electronic band structures for thermoelectric and charge-transport properties.", useCases: ["Seebeck coefficient and electrical conductivity trends", "Electronic thermal conductivity and power factor", "Carrier concentration, temperature and chemical-potential scans"], outputs: "Seebeck coefficient, conductivity, power factor and electronic thermal conductivity", website: "https://github.com/DOE-COMMS/BoltzTraP2" },
    { name: "LAMMPS", abbr: "LAMMPS", category: "Atomistic simulation / MD", description: "Classical molecular dynamics engine for atomistic materials modelling, mechanical response and thermodynamic behaviour.", useCases: ["Molecular dynamics and thermal equilibration", "Defects, grain boundaries and deformation mechanisms", "Diffusion, alloy disorder and temperature-dependent behaviour"], outputs: "Atomic trajectories, energies, stresses, diffusion and structural statistics", website: "https://www.lammps.org/" },
    { name: "SCAPS-1D", abbr: "SCAPS", category: "Device / solar-cell modelling", description: "One-dimensional numerical simulation of thin-film and perovskite solar-cell device structures.", useCases: ["Layer thickness and defect-density optimisation", "Band alignment and interface recombination analysis", "J–V, EQE and temperature-dependent device studies"], outputs: "J–V curves, EQE, band diagrams and device-performance parameters", website: "https://scaps.elis.ugent.be/" },
    { name: "COMSOL Multiphysics", abbr: "COMSOL", category: "Device / multiphysics modelling", description: "Multiphysics finite-element modelling for coupled physical processes and energy-device systems.", useCases: ["Coupled heat-transfer and electrical models", "Optical / thermal / electrical device coupling", "Geometry-based parameter sweeps and sensitivity analysis"], outputs: "Spatial field maps, coupled transport and device-level response", website: "https://www.comsol.com/" }
  ],

  /* 10. NEWS AND EVENTS -------------------------------------------------- */
  news: [
    {
      date: "10–11 Jan 2025",
      category: "Conference",
      title: "Presentations at the Bangladesh Crystallography Association conference",
      details: "Oral and poster presentations on lead-free halide perovskites for photovoltaics and optoelectronics at the University of Dhaka."
    },
    {
      date: "8–11 Dec 2024",
      category: "Research visit",
      title: "Oral presentation at IIT Patna",
      details: "Presentation on grain-boundary segregation and chemical short-range order in multi-principal element alloys."
    },
    {
      date: "9–11 May 2024",
      category: "Conference",
      title: "International Conference on Physics 2024",
      details: "One oral talk and three poster presentations on medium-entropy alloys, organised by the Bangladesh Physical Society."
    }
  ],

  /* 11. OPPORTUNITIES ---------------------------------------------------- */
  opportunities: [
    {
      title: "Prospective PhD and MS students",
      type: "Students",
      description: "We welcome motivated students interested in computational physics and materials science. Send a CV, academic transcripts and a concise statement of research interests."
    },
    {
      title: "Undergraduate thesis students",
      type: "Students",
      description: "Get introduced to DFT, scientific computing, data analysis and scientific writing through a supervised research project."
    },
    {
      title: "Research collaborators",
      type: "Collaboration",
      description: "We welcome collaborations connecting computational predictions with experimental synthesis, characterisation and device studies."
    },
    {
      title: "Alumni mentors",
      type: "Alumni",
      description: "Former AMRL members can support current students through research advice, career guidance, seminars and collaborative projects."
    }
  ],

  /* 12. CONTACT ---------------------------------------------------------- */
  contact: {
    address: "Advanced Materials Research Laboratory (AMRL)\nDepartment of Physics\nPabna University of Science and Technology\nPabna 6600, Bangladesh",
    email: "lokman.ali@pust.ac.bd",
    responseNote: "For research enquiries, student opportunities and collaborations, please contact the laboratory."
  }
};

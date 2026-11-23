/* =====================================================================
   CONTENT.JS - AMRL website er shob lekha ekhane.
   Shudhu "quotes" er bhitorer lekha change korun. Comma (,) ar bracket [ ] { } muchben na.
   Formula normal likhun (Hf5Si3), site nijei subscript korbe.
   Photo: photos/ folder e rakhun, tarpor "photo": "photos/nam.jpg" likhun.
   Code na likhe edit korte: website address er shesh e #edit likhe enter dilei editor khulbe.
   ===================================================================== */
const LAB = {
  /* ---- SITE SETTINGS (portal login link, public url) ---- */
  "site": {
    "name": "AMRL",
    "title": "Advanced Materials Research Laboratory",
    "url": "https://amrllab.netlify.app/",
    "portal": "https://amrl-private-portal.vercel.app/",
    "email": "lokman.ali@pust.ac.bd"
  },

  /* ---- SECTION 1 · HOME ---- */
  "hero": {
    "institution": "Pabna University of Science and Technology",
    "title": "Advanced Materials Research Laboratory",
    "description": "We use first-principles calculations, molecular dynamics and device simulation to understand and design alloys and lead-free optoelectronic materials for energy applications."
  },

  /* ---- SECTION 1 · HOME highlights ---- */
  "highlights": [
    {
      "title": "Multi-scale modeling",
      "description": "From DFT to molecular dynamics: linking atomic structure to mechanical and optoelectronic properties."
    },
    {
      "title": "Lead-free energy materials",
      "description": "Non-toxic perovskites, thermoelectrics and alloys for a sustainable future."
    },
    {
      "title": "Open collaboration",
      "description": "Working with experimental and theoretical groups worldwide."
    }
  ],

  /* ---- SECTION 1 · HOME statistics ---- */
  "stats": {
    "note": "Google Scholar figures as of September 2025 (from the PI's CV). Update when you can.",
    "items": [
      {
        "value": 53,
        "label": "Publications"
      },
      {
        "value": 770,
        "label": "Citations"
      },
      {
        "value": 14,
        "label": "h-index"
      },
      {
        "value": 22,
        "label": "i10-index"
      }
    ]
  },

  /* ---- SECTION 2 · ABOUT US ---- */
  "about": {
    "vision": "To be a recognised centre for computational materials research in Bangladesh, producing science that informs the design of next-generation functional materials.",
    "mission": "To train curious young researchers, publish rigorous and reproducible work, and share computational knowledge with the wider community.",
    "history": [
      "[Year] — Laboratory established at PUST.",
      "[Year] — First research group formed and first papers published.",
      "[Year] — Computing facilities expanded.",
      "Today — Growing team with national and international collaborators."
    ]
  },

  /* ---- SECTION 3 · PRINCIPAL INVESTIGATOR (photo: photos/...) ---- */
  "pi": {
    "name": "Dr. Md. Lokman Ali",
    "position": "Associate Professor, Department of Physics, Pabna University of Science and Technology, and Director of the Research and Technology Transfer Cell. Research interests: computational materials science, multi-scale modeling, multi-principal element alloys, optoelectronic and lead-free materials.",
    "photo": "photos/560c403188c84f3ad7a5b90e44824c9b.jpg",
    "education": [
      "Ph.D., Mechanical Science and Bio-engineering, Osaka University, Japan, 2021",
      "M.S., Physics, University of Chittagong, 2013 (3.93/4.00, 1st position)",
      "B.Sc., Physics, University of Chittagong, 2011 (3.72/4.00, 1st position)"
    ],
    "experience": [
      "Director, Research and Technology Transfer Cell, PUST, since May 2025",
      "Associate Professor, Department of Physics, PUST, since August 2022",
      "Assistant Professor, PUST, November 2016 – August 2022",
      "Lecturer, PUST, November 2014 – November 2016",
      "Treasurer, Physics Association, PUST"
    ],
    "awards": [
      "MEXT (Japanese Government) Scholarship for Ph.D. at Osaka University, 2018",
      "Distinction Award for outstanding M.S. results, 2013",
      "Distinction Award for excellent B.Sc. (Hons) results, 2011"
    ],
    "metrics": "53 papers · 770 citations · h-index 14 · i10-index 22 (Google Scholar, September 2025)",
    "supervision": "Currently supervising 1 M.Phil., 4 MS and 5 undergraduate thesis students.",
    "scholar": "https://scholar.google.com/citations?user=agk7avEAAAAJ&hl=en",
    "researchgate": "https://www.researchgate.net/profile/Md-Lokman-Ali",
    "orcid": "https://orcid.org/0000-0001-5750-9412",
    "linkedin": ""
  },

  /* ---- SECTION 4 · RESEARCH AREAS ---- */
  "research": [
    {
      "title": "Computational materials science",
      "description": "Multi-scale modeling with DFT (CASTEP, VASP) and molecular dynamics (LAMMPS)."
    },
    {
      "title": "Multi-principal element alloys",
      "description": "Grain boundaries, dislocations, lattice distortion and chemical short-range order in high- and medium-entropy alloys."
    },
    {
      "title": "Lead-free halide perovskites",
      "description": "Pressure-tuned band gaps and optoelectronic properties of non-toxic perovskites, with SCAPS-1D solar cell modeling."
    },
    {
      "title": "Pressure and temperature effects",
      "description": "Structural, mechanical, electronic and optical properties of solids under pressure."
    },
    {
      "title": "Superconductors and topological semimetals",
      "description": "First-principles studies of pressure-induced superconductivity and topological semimetals."
    },
    {
      "title": "Thermoelectric and optoelectronic materials",
      "description": "Energy harvesting and conversion materials, from halide chalcogenides to perovskite oxides."
    }
  ],

  /* ---- SECTION 5 · MATERIALS: ["formula", "element symbols"] glows on the periodic table ---- */
  "compounds": [
    [
      "Hf5Si3",
      "Hf Si"
    ],
    [
      "CuBiSeCl2",
      "Cu Bi Se Cl"
    ],
    [
      "NaSiCl3",
      "Na Si Cl"
    ],
    [
      "BaFeO3 (Sb-doped)",
      "Ba Fe O Sb"
    ],
    [
      "Rb2AgBiX6 (X = Br, Cl)",
      "Rb Ag Bi Br Cl"
    ],
    [
      "CsGeIBr2",
      "Cs Ge I Br"
    ],
    [
      "YBi",
      "Y Bi"
    ],
    [
      "CuNi",
      "Cu Ni"
    ],
    [
      "NiCo",
      "Ni Co"
    ],
    [
      "NiCoAl",
      "Ni Co Al"
    ],
    [
      "CrFeNi",
      "Cr Fe Ni"
    ],
    [
      "NiCoFeCrMn",
      "Ni Co Fe Cr Mn"
    ]
  ],

  /* ---- SECTION 6 · PEOPLE (notun member: ekta { ... } copy kore paste korun; photo: photos/name.jpg) ---- */
  "people": [
    {
      "name": "[Name]",
      "role": "M.Phil. Students",
      "interest": "Research topic",
      "photo": "",
      "scholar": "",
      "orcid": "",
      "researchgate": "",
      "linkedin": ""
    },
    {
      "name": "Md. Riad Khan",
      "role": "MS Students",
      "interest": "Research interests: Condensed Matter Physics, Computational Materials Science, Density Functional Theory (DFT), Perovskite Solar Cells, Photovoltaic Device Simulation, Magnetic Materials, Optoelectronic Materials, and Thermoelectric Materials",
      "photo": "photos/riad.jpeg",
      "scholar": "https://scholar.google.com/citations?user=doNYLOoAAAAJ&hl=en",
      "orcid": "https://orcid.org/0009-0003-2679-0629",
      "researchgate": "https://www.researchgate.net/profile/Md-Riad-Khan-2",
      "linkedin": "https://www.linkedin.com/in/md-riad-khan/"
    },
    {
      "name": "Md. Emon Hassan",
      "role": "MS Students",
      "interest": "Research interests: Condensed Matter Physics, Computational Materials Science, DFT, Hydrogen Storage, Thermoelectric Materials",
      "photo": "photos/Emon.png",
      "website": "https://emonhassan02.github.io/Profile/",
      "scholar": "https://scholar.google.com/citations?user=D8O3IMoAAAAJ",
      "orcid": "https://orcid.org/0009-0009-6252-3038",
      "researchgate": "https://www.researchgate.net/profile/Emon-Hassan-2",
      "linkedin": "https://www.linkedin.com/in/md-emon-hassan-076572438/"
    },
    {
      "name": "Md. Redwan Alam Hridoy",
      "role": "MS Students",
      "interest": "Research interests: Photovoltaics and Renewable Energy, Perovskite Solar Cells, Lead-Free Perovskite Materials, Thin-Film Solar Cells, Semiconductor Device Modeling and Simulation, Density Functional Theory and First-Principles Calculations, Electronic Structure and Materials Design, Materials Synthesis and Structural Characterization, Interface and Defect Engineering",
      "photo": "photos/hidoy13.jpeg",
      "scholar": "https://scholar.google.com/citations?user=zpnj3dkAAAAJ&hl=en&oi=ao",
      "orcid": "https://orcid.org/0009-0005-2981-5072",
      "researchgate": "https://www.researchgate.net/profile/Redwan-Hridoy",
      "linkedin": "https://www.linkedin.com/in/redwan-ridoy-b4a161396"
    },
    {
      "name": "[Name]",
      "role": "Undergraduate Thesis Students",
      "interest": "Research topic",
      "photo": "",
      "scholar": "",
      "orcid": "",
      "researchgate": "",
      "linkedin": ""
    }
  ],

  /* ---- SECTION 7 · PUBLICATIONS (notun paper ekdom upore copy korun) ---- */
  "publications": [
    {
      "title": "Tuning the structural and physical properties of Hf5Si3 intermetallic compound under pressure: Insights for next-generation high-temperature technology",
      "authors": "Md. Emon Hassan, Md. Riad Khan, Zihad Hossain, Md. Khairul Alam, Mohammad Abdur Rashid, and Md. Lokman Ali",
      "journal": "Scientific Reports",
      "year": "2026",
      "volume": "16",
      "pages": "24463",
      "impactFactor": "4.9 (2025)",
      "doi": "10.1038/s41598-026-52144-z",
      "link": "https://doi.org/10.1038/s41598-026-52144-z"
    },
    {
      "title": "First-principles investigation of CuBiSeCl2: A quaternary halide chalcogenide material for advanced optoelectronic and thermoelectric energy harvesting and conversion technologies",
      "authors": "Zihad Hossain, Md. Riad Khan, Sanzida Naznin Mim, Md. Emon Hassan, Mohammad Abdur Rashid, and Md. Lokman Ali",
      "journal": "Materials Advances",
      "year": "2026",
      "volume": "7",
      "issue": "3",
      "pages": "1704–1720",
      "impactFactor": "5.8 (2025)",
      "doi": "10.1039/D5MA01386K",
      "link": "https://doi.org/10.1039/D5MA01386K"
    },
    {
      "title": "Device-level engineering and optimization of high-efficiency lead-free NaSiCl3 perovskite solar cells using SCAPS-1D and COMSOL",
      "authors": "Md. Redwan Alam Hridoy, Zihad Hossain, Md. Riad Khan, Prarthona Shaha, Md. Emon Hassan, Most. Meftaul Zannati Kemi, and Md. Lokman Ali",
      "journal": "Materials Advances",
      "year": "2026",
      "volume": "",
      "pages": "",
      "impactFactor": "5.8 (2025)",
      "doi": "10.1039/D6MA01128D",
      "link": "https://doi.org/10.1039/D6MA01128D"
    },
    {
      "title": "Doping effect of antimony on BaFeO3 perovskite oxide: Optical, electronic, magnetic and thermoelectric properties",
      "authors": "Md. Riad Khan, Sanzida Naznin Mim, Zihad Hossain, Md. Emon Hassan, Md. Saiful Alam, Mohammad Abdur Rashid, and Md. Lokman Ali",
      "journal": "RSC Advances",
      "year": "2025",
      "volume": "15",
      "pages": "38158–38175",
      "impactFactor": "Not specified",
      "doi": "10.1039/D5RA06101F",
      "link": "https://doi.org/10.1039/D5RA06101F"
    },
    {
      "year": "2025",
      "authors": "S. N. Mim, Z. Hossain, Md. Lokman Ali",
      "title": "Atomistic investigation of grain boundary strengthening and composition-dependent mechanical properties in CuNi binary alloys",
      "journal": "RSC Advances, 15",
      "doi": "10.1039/D5RA07327H",
      "quartile": "Q1"
    },
    {
      "year": "2025",
      "authors": "Z. Hossain, R. Khan, S. N. Mim, M. A. Amin, M. Hossain, M. H. Rahman, Md. Lokman Ali*",
      "title": "Strategic engineering of charge transport layers for designing lead-free halide perovskite CsGeIBr2-based solar cells: insights from DFT and SCAPS-1D modeling",
      "journal": "Energy Reports, 14, 2479",
      "doi": "",
      "quartile": "Q1"
    },
    {
      "year": "2025",
      "authors": "Md. Lokman Ali*, Z. Hossain, S. N. Mim, S. K. Saha",
      "title": "Pressure effects on physical properties of binary rare earth monopnictide YBi for optoelectronic applications",
      "journal": "Advanced Theory and Simulations, 2401066",
      "doi": "10.1002/adts.202401066",
      "quartile": "Q1"
    },
    {
      "year": "2024",
      "authors": "M. M. Hasan, M. Afsuddin, Md. Lokman Ali*",
      "title": "Pressure-driven perfection: advancing lead-free halide perovskites Rb2AgBiX6 (X = Br, Cl) for optoelectronic applications",
      "journal": "Heliyon, 20, e39285",
      "doi": "10.1016/j.heliyon.2024.e39285",
      "quartile": "Q1"
    },
    {
      "year": "2024",
      "authors": "N. M. Nobin, Md. Lokman Ali*, M. K. Alam",
      "title": "Edge dislocations, alloy composition, and grain boundaries effects on the mechanical properties in NiCo binary alloy",
      "journal": "Scientific Reports, 14, 27790",
      "doi": "10.1038/s41598-024-65437-y",
      "quartile": "Q1"
    },
    {
      "year": "2024",
      "authors": "Md. Lokman Ali*, M. Khan",
      "title": "Edge dislocation and grain boundaries effects on the mechanical properties in NiCoAl medium entropy alloy",
      "journal": "Advanced Engineering Materials, 26, 2400614",
      "doi": "10.1002/adem.202400614",
      "quartile": "Q1"
    },
    {
      "year": "2024",
      "authors": "N. M. Nobin, Z. Hasan, M. Z. Rahaman, Md. Lokman Ali*",
      "title": "Advanced mechanical properties obtained via transition metals doped in CrFeNi medium entropy alloy",
      "journal": "Journal of Materials Research and Technology, 30, 5334",
      "doi": "10.1016/j.jmrt.2024.04.247",
      "quartile": "Q1"
    },
    {
      "year": "2023",
      "authors": "Md. Lokman Ali, M. Khan, M. A. Al Asad, M. Z. Rahaman",
      "title": "Highly efficient and stable lead-free cesium copper halide perovskites for optoelectronic applications: a DFT based study",
      "journal": "Heliyon, 9, e18816",
      "doi": "10.1016/j.heliyon.2023.e18816",
      "quartile": "Q1"
    },
    {
      "year": "2021",
      "authors": "Md. Lokman Ali, E. Haque, M. Z. Rahaman",
      "title": "Pressure- and temperature-dependent physical metallurgy in a face-centered cubic NiCoFeCrMn high entropy alloy and its subsystems",
      "journal": "Journal of Alloys and Compounds, 873, 159843",
      "doi": "10.1016/j.jallcom.2021.159843",
      "quartile": "Q1"
    },
    {
      "year": "2020",
      "authors": "Md. Lokman Ali, S. Shinzato, V. Wang, Z. Shen, J. Du, S. Ogata",
      "title": "An atomistic modeling study of the relationship between critical resolved shear stress and atomic structure distortion in FCC high entropy alloys",
      "journal": "Materials Transactions, 61, 605",
      "doi": "10.2320/matertrans.MT-MK2019007",
      "quartile": "Q2"
    }
  ],

  /* ---- SECTION 8 · FACILITIES: capabilities ---- */
  "facilities": [
    "Density Functional Theory (DFT) and first-principles calculations",
    "Ab initio Molecular Dynamics (AIMD)",
    "Structural optimization and phase stability analysis",
    "Electronic band structure and density of states calculations",
    "Phonon dispersion and lattice dynamics",
    "Thermoelectric transport and lattice thermal conductivity",
    "Hydrogen storage and desorption analysis",
    "Optical, magnetic and mechanical property calculations",
    "Photovoltaic device simulation"
  ],

  /* ---- SECTION 8 · FACILITIES: software (icon: wien2k qe vasp castep scaps comsol lammps) ---- */
  "software": [
    {
      "name": "WIEN2k",
      "abbr": "W2K",
      "icon": "wien2k",
      "logo": "",
      "description": "All-electron full-potential calculations for electronic structure and physical properties of materials."
    },
    {
      "name": "Quantum ESPRESSO",
      "abbr": "QE",
      "icon": "qe",
      "logo": "",
      "description": "Plane-wave DFT calculations, structural optimization, phonons and first-principles simulations."
    },
    {
      "name": "VASP",
      "abbr": "VASP",
      "icon": "vasp",
      "logo": "",
      "description": "First-principles simulations of structural, electronic, magnetic and thermodynamic properties."
    },
    {
      "name": "CASTEP",
      "abbr": "CASTEP",
      "icon": "castep",
      "logo": "",
      "description": "Plane-wave pseudopotential calculations for materials modelling and property prediction."
    },
    {
      "name": "SCAPS-1D",
      "abbr": "SCAPS",
      "icon": "scaps",
      "logo": "",
      "description": "Numerical modelling and performance optimization of thin-film and perovskite solar cells."
    },
    {
      "name": "COMSOL Multiphysics",
      "abbr": "COMSOL",
      "icon": "comsol",
      "logo": "",
      "description": "Multiphysics modelling and numerical simulation of photovoltaic and energy-device systems."
    },
    {
      "name": "LAMMPS",
      "abbr": "LAMMPS",
      "icon": "lammps",
      "logo": "",
      "description": "Classical molecular dynamics simulations for atomistic materials modelling and thermodynamic behaviour."
    }
  ],

  /* ---- SECTION 9 · NEWS AND UPDATES (newest upore) ---- */
  "news": [
    {
      "date": "Jan 2025",
      "title": "Presentations at the Bangladesh Crystallography Association conference",
      "details": "Oral and poster presentations on lead-free halide perovskites for photovoltaics and optoelectronics, University of Dhaka, 10–11 January 2025."
    },
    {
      "date": "Dec 2024",
      "title": "Oral presentation at IIT Patna",
      "details": "Grain boundary segregation and chemical short-range order in multi-principal element alloys, 8–11 December 2024."
    },
    {
      "date": "May 2024",
      "title": "International Conference on Physics 2024",
      "details": "One oral talk and three poster presentations on medium-entropy alloys, organised by the Bangladesh Physical Society, 9–11 May 2024."
    }
  ],

  /* ---- SECTION 10 · OPPORTUNITIES ---- */
  "opportunities": [
    {
      "title": "Prospective PhD and MS students",
      "description": "Motivated by computational physics or materials science? Send your CV, transcripts and a short statement of interest."
    },
    {
      "title": "Research collaborators",
      "description": "We welcome joint projects combining theory with experiment."
    },
    {
      "title": "Undergraduate thesis students",
      "description": "Hands-on training in DFT, scientific computing and technical writing."
    }
  ],

  /* ---- SECTION 11 · CONTACT ---- */
  "contact": {
    "address": "Advanced Materials Research Laboratory (AMRL)\nDepartment of Physics\nPabna University of Science and Technology\nPabna 6600, Bangladesh",
    "email": "lokman.ali@pust.ac.bd",
    "scholar": "https://scholar.google.com/citations?user=agk7avEAAAAJ&hl=en",
    "researchgate": "https://www.researchgate.net/profile/Md-Lokman-Ali",
    "orcid": "https://orcid.org/0000-0001-5750-9412",
    "linkedin": ""
  }
};

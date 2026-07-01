// Bilingual content for Awadh Fahad Almutairi's portfolio.

export const SITE_URL = 'https://awadhalmutairi.info'

export const content = {
  ar: {
    dir: 'rtl',
    langLabel: 'EN',
    themeLabelToDark: 'الوضع الداكن',
    themeLabelToLight: 'الوضع الفاتح',
    backToTop: 'العودة للأعلى',
    hero: {
      greeting: 'مرحباً، أنا',
      name: 'عوض فهد المطيري',
      title: 'مدير مشاريع إعلامية ومنتج مرئي',
      location: 'الرياض، المملكة العربية السعودية',
      bio: 'أعمل في إدارة المشاريع الإعلامية والإنتاج المرئي وإدارة الفعاليات، وأحوّل الأفكار إلى مخرجات إعلامية احترافية.',
      ctaProjects: 'استعرض الأعمال',
      ctaContact: 'تواصل معي',
    },
    about: {
      kicker: 'نبذة',
      title: 'من أنا',
      body: 'خريج كلية الإعلام بجامعة الإمام محمد بن سعود الإسلامية، تخصص الإذاعة والتلفزيون. أعمل في إدارة المشاريع الإعلامية والإنتاج المرئي وإدارة الفعاليات، إلى جانب خبرتي في كتابة المحتوى وصناعة المحتوى الإبداعي. أمتلك قدرة على قيادة المشاريع وإدارة فرق العمل وتحويل الأفكار إلى مخرجات إعلامية احترافية تحقق الأهداف بكفاءة وجودة عالية.',
      educationLabel: 'التعليم',
      education: 'بكالوريوس الإعلام — تخصص الإذاعة والتلفزيون',
      university: 'جامعة الإمام محمد بن سعود الإسلامية',
    },
    experience: {
      kicker: 'الخبرة',
      title: 'الخبرة والأعمال',
      currentRole: 'مدير مشاريع',
      currentCompany: 'شركة ديتيلز للإنتاج الإعلامي',
      intro: 'خبرة عملية في إدارة المشاريع الإعلامية والإنتاج المرئي وإدارة الفعاليات، من خلال العمل مع جهات حكومية ومؤسسات بارزة على تخطيط وتنفيذ تغطيات وفعاليات احترافية. فيما يلي أبرز الأعمال:',
      roleLabel: 'الدور',
      moreLabel: 'اضغط للمزيد',
      whatWeDidLabel: 'أبرز ما أنجزناه',
      galleryLabel: 'صور من المشروع',
      closeLabel: 'إغلاق',
    },
    skills: {
      kicker: 'القدرات',
      title: 'المهارات',
      items: [
        'إدارة المشاريع الإعلامية',
        'الإنتاج المرئي والإخراج',
        'إدارة الفعاليات والتنسيق',
        'قيادة فرق العمل',
        'كتابة المحتوى الإبداعي',
        'الإشراف على التصوير',
      ],
    },
    contact: {
      kicker: 'تواصل',
      title: 'لنعمل معاً',
      body: 'سعيد بالتواصل لأي فرصة أو مشروع إعلامي.',
      emailLabel: 'البريد الإلكتروني',
      phoneLabel: 'الهاتف',
      linkedinLabel: 'لينكدإن',
    },
    footer: 'جميع الحقوق محفوظة',
  },

  en: {
    dir: 'ltr',
    langLabel: 'ع',
    themeLabelToDark: 'Dark mode',
    themeLabelToLight: 'Light mode',
    backToTop: 'Back to top',
    hero: {
      greeting: "Hi, I'm",
      name: 'Awadh Fahad Almutairi',
      title: 'Media Project Manager & Visual Producer',
      location: 'Riyadh, Saudi Arabia',
      bio: 'I work in media project management, visual production, and event management — turning ideas into professional media outputs.',
      ctaProjects: 'View Work',
      ctaContact: 'Get in Touch',
    },
    about: {
      kicker: 'About',
      title: 'Who I Am',
      body: 'Media graduate from Imam Muhammad ibn Saud Islamic University, majoring in Radio and Television. Experienced in media project management, visual production, and event management, with a background in content writing and creative content creation. Skilled in leading projects, managing teams, and transforming ideas into professional media outputs that achieve goals with efficiency and high quality.',
      educationLabel: 'Education',
      education: 'B.A. in Media — Radio & Television',
      university: 'Imam Muhammad ibn Saud Islamic University',
    },
    experience: {
      kicker: 'Experience',
      title: 'Experience & Work',
      currentRole: 'Project Manager',
      currentCompany: 'Details Media Production',
      intro: 'Hands-on experience in media project management, visual production, and event management — working with government bodies and leading institutions to plan and deliver professional coverage and events. Selected work below:',
      roleLabel: 'Role',
      moreLabel: 'View details',
      whatWeDidLabel: 'What we did',
      galleryLabel: 'Project gallery',
      closeLabel: 'Close',
    },
    skills: {
      kicker: 'Capabilities',
      title: 'Skills',
      items: [
        'Media Project Management',
        'Visual Production & Direction',
        'Event Management & Coordination',
        'Team Leadership',
        'Content Writing & Creative Content Creation',
        'Photography & Videography Oversight',
      ],
    },
    contact: {
      kicker: 'Contact',
      title: "Let's Work Together",
      body: 'Open to connecting for any media opportunity or project.',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      linkedinLabel: 'LinkedIn',
    },
    footer: 'All rights reserved',
  },
}

// Language-neutral project meta + bilingual text. `hidden: true` keeps the
// project in code but removes it from the live site.
export const projects = [
  {
    id: 'cst',
    hidden: false,
    logo: '/images/projects/cst/logo.png',
    images: [
      '/images/projects/cst/1.jpeg',
      '/images/projects/cst/2.jpeg',
      '/images/projects/cst/3.jpeg',
      '/images/projects/cst/4.jpeg',
    ],
    ar: {
      client: 'هيئة الاتصالات والفضاء والتقنية',
      role: 'مدير مشروع',
      summary: 'إدارة وإخراج فعالية رسمية بحضور معالي الوزير عبدالله السواحة، من التخطيط حتى التسليم النهائي.',
      whatWeDid: [
        'إدارة الفعالية والإشراف عليها من مرحلة التخطيط حتى التسليم النهائي',
        'التنسيق بين الفرق التشغيلية وضمان انسيابية التنفيذ',
        'إدارة فريق التصوير الفوتوغرافي والمرئي وتوثيق الفعالية',
      ],
    },
    en: {
      client: 'Communications, Space & Technology Commission (CST)',
      role: 'Project Manager',
      summary: 'Managed and directed an official event attended by H.E. the Minister, from planning to final delivery.',
      whatWeDid: [
        'Managed and directed the official event from planning through final delivery',
        'Oversaw coordination between operational teams to ensure smooth execution',
        'Managed the photography and videography team responsible for documenting the event',
      ],
    },
  },
  {
    id: 'irathna',
    hidden: false,
    logo: '/images/projects/irathna/logo.png',
    images: [
      '/images/projects/irathna/1.jpeg',
      '/images/projects/irathna/2.jpeg',
      '/images/projects/irathna/3.jpeg',
      '/images/projects/irathna/4.jpeg',
    ],
    ar: {
      client: 'شركة الديرة للتطوير — جولة إرثنا',
      role: 'مدير مشروع',
      summary: 'إدارة التغطية الإعلامية الكاملة لجولة إرثنا تصويراً وإنتاجاً.',
      whatWeDid: [
        'الإشراف على التخطيط والتنفيذ الكامل للتغطية الفوتوغرافية والمرئية',
        'إدارة فريق العمل الإعلامي وضمان جودة المخرجات',
        'الحرص على أن تعكس التغطية أهداف المشروع وهويته البصرية',
      ],
    },
    en: {
      client: 'Al-Dirah Development Company — Irathna Tour',
      role: 'Project Manager',
      summary: 'Led full media coverage for the Irathna tour — photo and video.',
      whatWeDid: [
        'Oversaw full planning and execution of photo and video coverage',
        'Managed the media team and ensured professional-quality deliverables',
        "Ensured all coverage aligned with the project's objectives and visual identity",
      ],
    },
  },
  {
    id: 'royal-reserve',
    hidden: true, // hidden from the site until images are uploaded
    logo: '/images/projects/royal-reserve/logo.png',
    images: [
      '/images/projects/royal-reserve/1.jpeg',
      '/images/projects/royal-reserve/2.jpeg',
      '/images/projects/royal-reserve/3.jpeg',
      '/images/projects/royal-reserve/4.jpeg',
    ],
    ar: {
      client: 'هيئة تطوير محمية الإمام عبدالعزيز بن محمد الملكية',
      role: 'مدير مشروع',
      summary: 'مساعدة إدارة المشاريع في تغطية الحفل السنوي للمحمية.',
      whatWeDid: [
        'المساهمة في إدارة سير العمل خلال تغطية الحفل السنوي',
        'دعم فريق التغطية الإعلامية وضمان انسيابية التنفيذ الميداني',
      ],
    },
    en: {
      client: 'Imam Abdulaziz bin Mohammed Royal Reserve Development Authority',
      role: 'Project Manager',
      summary: "Assistant project management for the reserve's annual ceremony coverage.",
      whatWeDid: [
        'Contributed to workflow management throughout the annual ceremony coverage',
        'Supported the media team and ensured smooth execution on the ground',
      ],
    },
  },
]

export const contactInfo = {
  email: 'Awadfalmutiri@gmail.com',
  phone: '+966583051517',
  linkedin: 'https://www.linkedin.com/in/awadh-almutairi-86b0933ab',
  // Extra custom contact methods added from the admin panel.
  extraMethods: [], // [{ id, labelAr, labelEn, value, href }]
}

// Editable theme colors (admin panel). Applied at runtime over the CSS defaults.
export const theme = {
  accent: '#c19a4e',
  dark: { bg: '#15161a', card: '#212329', text: '#e6e7ea' },
  light: { bg: '#f4f4f2', card: '#ffffff', text: '#1c1d20' },
}

// Hero portrait (transparent PNG, rendered in black & white via CSS).
export const heroImage = '/images/hero/awadh.png'

// Bundled defaults — used to seed the server on first run and as a fallback
// for the public site when the API is unavailable.
export const defaultData = { content, projects, contactInfo, heroImage, theme }

const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Projects", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "Sep 2, 2025",
    title:
      "Applyd- A Job tracker Application Built with MERN Stack and Tailwind CSS",
    image: "/images/applyd-1.png",
    link: "https://applyd.online/",
  },
  {
    id: 2,
    date: "Aug 28, 2025",
    title: "URBN- A Uber like Clone Built with Socket.io for Real-time Tracking and Ride Creations",
    image: "/images/Uber.png",
    link: "https://urbn-five.vercel.app/",
  },
  {
    id: 3,
    date: "Aug 15, 2025",
    title: "CRAVE- A Reels Style-Food Delivery Application Built to order Food you like in reels instantly",
    image: "/images/Crave-1.png",
    link: "https://hangry-alpha.vercel.app/",
  },
];

const techStack = [
  {
    category: "Languages",
    items: ["JavaScript", "Java", "Python"],
  },
  {
    category: "Frontend",
    items: ["React.js"],
  },
  {
    category: "AIML",
    items: ["Generative AI", "Basic ML Concepts"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Sass", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express"],
  },
  {
    category: "Database",
    items: ["MongoDB", "MySQL"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/adaharshsingh",
  },
  {
    id: 2,
    text: "Personal Website",
    icon: "/icons/atom.svg",
    bg: "#4bcb63",
    link: "https://www.adarsh-singh.xyz/",
  },
  {
    id: 3,
    text: "Gmail",
    icon: "/icons/gmail.png",
    bg: "#ff866b",
    link: "Emailto:Mr.aadarshKumarSingh@gmail.com",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/adarsh-kumar-singh-226228239/",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/adarsh.jpeg",
  },
  {
    id: 2,
    img: "/images/adarsh-1.jpeg",
  },
  {
    id: 3,
    img: "/images/adarsh-2.jpeg",
  },
  {
    id: 4,
    img: "/images/adarsh-3.jpeg",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "URBN- Uber Clone",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5", // icon position inside Finder
      windowPosition: "top-[5vh] left-5", // optional: Finder window position
      children: [
        {
          id: 1,
          name: "URBN Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Built a full-stack ride-hailing platform with separate user and captain flows, including registration, authentication, and role-based access control.",
            "Implemented real-time ride matching using location data to connect users with nearby captains, even handling cases where captains toggle active/inactive states.",
            "Integrated maps and live tracking for pickup, drop, route visualization, and dynamic distance/time estimation.",
            "Designed a scalable backend architecture with microservices-style separation for users, rides, and captains, ensuring smooth concurrency and future feature expansion (payments, ratings, surge pricing)."
          ],
        },
        {
          id: 2,
          name: "Urbn.com",
          icon: "/images/Uber.png",
          kind: "file",
          fileType: "url",
          href: "https://urbn-five.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: " Urbn.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/Uber.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 right-20",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "Crave- Food Discovery App",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "Crave- Food Discovery App.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "Developed a food-discovery web application that helps users find meals based on mood, cravings, time, and preferences instead of generic restaurant listings.",
            "Implemented intelligent filtering and recommendation logic to suggest food options dynamically, reducing decision fatigue (“what should I eat?” problem).",
            "Built a clean, responsive frontend with a smooth user flow focused on quick choices, minimal clicks, and mobile-first usability.",
            "Designed the backend to be extensible, allowing future upgrades like user history, personalized recommendations, diet-based filtering, and restaurant integrations.",
          ],
        },
        {
          id: 2,
          name: "Crave.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://hangry-alpha.vercel.app/",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "Crave.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/Crave-2.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 left-5",
        },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: "Applyd- Job Application Tracker",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "Applyd.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Built a job application tracking platform that centralizes applications, statuses, deadlines, and follow-ups, eliminating manual spreadsheets and guesswork.",
            "Automated application insights by parsing emails and user inputs to update application states (applied, interview, rejected, offer), reducing user effort.",
            "Designed a focused UX for job seekers, prioritizing clarity, quick updates, and progress visibility during high-volume job hunts.",
            "Engineered the system for scale and extensibility, enabling future features like Gmail sync, reminders, analytics on response rates, and interview tracking.",
          ],
        },
        {
          id: 2,
          name: "Applyd.online",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://applyd.online/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "Job-Tracker.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/applyd-1.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 right-20",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/adarsh.jpeg",
    },
    {
      id: 2,
      name: "casual-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/adarsh-2.jpeg",
    },
    {
      id: 3,
      name: "Vibing-Me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/images/adarsh-3.jpeg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/adarsh-1.jpeg ",
      description: [
  "Adarsh Kumar Singh",
  "Full Stack Developer",
  "Built 25+ projects across web, backend, and UI-heavy applications",
  "Strong focus on performance optimization, clean architecture, and UI/UX",
  "Experience Level: Fresher (hands-on, project-driven)",
  "I design and build end-to-end web applications with a strong emphasis on scalability, responsiveness, and real-world usability rather than demo-only features.",
  "My work spans MERN stack applications, real-time systems, and product-focused builds like job trackers, ride-hailing platforms, and food discovery apps.",
  "I prefer shipping functional products, iterating fast, and solving practical problems over writing theoretical or over-engineered code."
]
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
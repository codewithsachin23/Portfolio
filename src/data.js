// All content comes from the resume. Replace the "link" values with your real repo / demo URLs.
export const profile = {
  name: "Sachin Kumar Shukla",
  role: "Software Engineer · Generative AI",
  roles: ["Java & Spring Boot Developer", "Generative AI / LLM Engineer", "Full-Stack Developer"],
  summary:
    "A dedicated and result-driven developer with a strong foundation in Java and Python, and emerging expertise in Generative AI and LLM-based applications. Seeking an opportunity to work in a growth-oriented organization where I can contribute to innovative solutions while continuously advancing my technical capabilities.",
  email: "sachinshukla232003@gmail.com",
  phone: "7879269115",
  linkedin: "https://www.linkedin.com/in/sachin-shukla-68892123a/",
  github: "https://github.com", // TODO: add your GitHub username, e.g. https://github.com/<username>
  location: "Bangalore",
  photo: import.meta.env.BASE_URL + "photo.jpg",
};

export const skills = {
  Languages: ["Java", "Python"],
  "Frameworks & Databases": ["Angular", "Spring Boot", "FastAPI", "LangChain / LangGraph", "MySQL", "PostgreSQL"],
  "Core Skills": ["Generative AI", "LLM-based Applications", "Microservices", "REST"],
  Tools: ["Git", "GitHub", "Postman", "GitHub Copilot", "Amazon Q", "VS Code"],
};

export const experience = [
  {
    company: "TATA Consultancy Services",
    title: "Systems Engineer",
    period: "June 2026 – Present",
    place: "Bangalore",
    points: [
      "Completed ILP training with hands-on experience in Java, Spring Boot, Angular, SQL and Generative AI.",
      "Currently working on a client project, contributing to full-stack application development.",
      "Gained practical experience in REST APIs, backend development, frontend integration, debugging, and client project workflows.",
    ],
  },
  {
    company: "Capgemini Technology Services India Ltd.",
    title: "Software Engineer",
    period: "Sep 2025 – June 2026",
    place: "Navi Mumbai, Airoli",
    points: [
      "Worked on Generative AI–based enterprise solutions for client applications.",
      "Designed and developed an AI agent using Python, FastAPI and LangChain/LangGraph.",
      "Collaborated with cross-functional teams to deliver client-ready GenAI features.",
    ],
  },
  {
    company: "Capgemini Technology Services India Ltd.",
    title: "Java Full Stack Intern",
    period: "May 2025 – July 2025",
    place: "Navi Mumbai, Airoli",
    points: [
      "Contributed to Java Full Stack development through collaborative development, code reviews, and structured project tasks.",
      "Worked with Generative AI and LLM-based applications, focusing on prompt engineering and AI workflow development.",
    ],
  },
];

export const projects = [
  {
    name: "AI Interview Agent",
    date: "Mar 2025",
    stack: ["Python", "FastAPI", "LangChain", "LangGraph", "React", "Azure OpenAI LLM"],
    points: [
      "LLM-powered interview platform that analyzes Job Descriptions and candidate resumes to conduct personalized one-to-one interviews with dynamically generated questions.",
      "Agentic interview workflow using LangGraph and LangChain: the LLM autonomously generates follow-up questions from the JD, candidate profile and previous responses, with integrated real-time AI proctoring.",
      "Automated evaluation and scoring system that assesses technical skills, communication, problem-solving and JD alignment, producing a comprehensive interview report.",
    ],
    link: "https://github.com", // TODO: replace with the repo URL
    demo: "",                   // TODO: optional live demo URL
  },
  {
    name: "Flight Booking System",
    date: "Jan 2025",
    stack: ["Spring Boot", "Spring MVC", "Spring Security", "React", "RabbitMQ", "MySQL"],
    points: [
      "Enterprise-grade flight booking platform built with 8+ microservices for a modular, scalable and maintainable architecture.",
      "Eureka Service Registry + API Gateway + Feign Client for service discovery, routing and inter-service communication.",
      "Secure user flows with JWT-based authentication, and RabbitMQ for reliable asynchronous messaging between booking and notification services.",
    ],
    link: "https://github.com", // TODO: replace with the repo URL
    demo: "",
  },
];

export const education = [
  { school: "TIT (Excellence) College, Bhopal", degree: "Bachelor of Technology in Computer Science and Engineering", period: "Aug 2021 – 2025", score: "CGPA: 7.90" },
  { school: "Govt. Martand No. 2, Rewa", degree: "Higher Secondary (12th)", period: "May 2020", score: "Percentage: 70.2%" },
];

// `link` = verification URL. Optional `image`: put a screenshot/PDF export in /public/certs and set e.g. "certs/claude.png"
// to show the certificate itself inside the on-page viewer.
export const certifications = [
  { name: "Claude Certified Architect – Foundations", issuer: "Anthropic", image: "",
    link: "https://verify.skilljar.com/c/5ihjocmobd7f" },
  { name: "Microsoft Certified: Azure AI Fundamentals (AI-900)", issuer: "Microsoft", image: "",
    link: "https://learn.microsoft.com/en-us/users/sachinkumarshukla-3994/credentials/8e5d96e3da3b5e00?ref=https%3A%2F%2Fwww.linkedin.com%2F" },
  { name: "Google Cloud Certified: Generative AI Leader", issuer: "Google Cloud", image: "",
    link: "https://www.credly.com/badges/0827d541-400c-410a-af27-207a9d8b8402/public_url" },
  { name: "Microsoft Certified: Azure Fundamentals (AZ-900)", issuer: "Microsoft", image: "",
    link: "https://learn.microsoft.com/en-us/users/sachinkumarshukla-3994/credentials/b25aac9d17455874?ref=https%3A%2F%2Fwww.linkedin.com%2F" },
  { name: "Microsoft Certified: Azure Developer Associate", issuer: "Microsoft", image: "",
    link: "https://learn.microsoft.com/en-us/users/sachinkumarshukla-3994/credentials/d6e20e9b388a2096?ref=https%3A%2F%2Fwww.linkedin.com%2F" },
];

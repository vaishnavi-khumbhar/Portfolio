// Single source of truth for personal / contact details.
export const site = {
  name: "Vaishnavi Prakash Kumbhar",
  shortName: "Vaishnavi Kumbhar",
  title: "Web Developer | React.js Developer | Full-Stack Developer",
  location: "Pune, Maharashtra, India",
  email: "vaishnavikumbhar1711@gmail.com",
  phoneDisplay: "+91 7083895978",
  phoneTel: "+918799871834",
  whatsappNumber: "7083895978", // country code + number, digits only
  linkedin: "https://linkedin.com/in/vaishnavi-kumbhar",
  github: "https://github.com/vaishnavi-khumbhar",
  resumeFile: "Vaishnavi-Kumbhar-Resume.pdf",
};

export const whatsappLink = (text = "Hi Vaishnavi, I found your portfolio and I'd like to discuss a project.") =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

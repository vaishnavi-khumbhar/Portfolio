import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiTailwindcss, SiBootstrap, SiVite,
  SiReactrouter, SiFramer, SiPhp, SiNodedotjs, SiExpress, SiMysql, SiMongodb,
  SiGit, SiGithub, SiPostman, SiXampp, SiRender, SiGithubpages,
} from "react-icons/si";
import { Smartphone, Network, DatabaseZap, Code2, Leaf } from "lucide-react";

// No percentages or proficiency scores on purpose: skills are listed, not graded.
export const skillGroups = [
  {
    title: "Frontend",
    blurb: "Interfaces that look sharp and work on every screen.",
    items: [
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss },
      { name: "JavaScript ES6+", icon: SiJavascript },
      { name: "React.js", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "Vite", icon: SiVite },
      { name: "React Router", icon: SiReactrouter },
      { name: "Framer Motion", icon: SiFramer },
      { name: "Responsive Web Design", icon: Smartphone },
    ],
  },
  {
    title: "Backend",
    blurb: "Server logic, APIs and data handling.",
    items: [
      { name: "PHP", icon: SiPhp },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "REST APIs", icon: Network },
      { name: "CRUD Operations", icon: DatabaseZap },
    ],
  },
  {
    title: "Database",
    blurb: "Relational and document data stores.",
    items: [
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "MongoDB Atlas", icon: Leaf },
    ],
  },
  {
    title: "Tools",
    blurb: "Everyday tooling for a clean workflow.",
    items: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "VS Code", icon: Code2 },
      { name: "Postman", icon: SiPostman },
      { name: "XAMPP", icon: SiXampp },
    ],
  },
  {
    title: "Deployment",
    blurb: "Getting projects live.",
    items: [
      { name: "Render", icon: SiRender },
      { name: "GitHub Pages", icon: SiGithubpages },
    ],
  },
];

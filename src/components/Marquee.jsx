import { skillGroups } from "../data/skills.js";

// Only technologies from the owner's real skill list.
const NAMES = [
  "React.js", "JavaScript ES6+", "Tailwind CSS", "Vite", "Framer Motion", "PHP", "MySQL",
  "Node.js", "Express.js", "MongoDB", "REST APIs", "Git", "GitHub", "Postman",
];
const ALL = skillGroups.flatMap((g) => g.items);
const ITEMS = NAMES.map((n) => ALL.find((i) => i.name === n)).filter(Boolean);

function Row({ hidden = false }) {
  return (
    <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {ITEMS.map(({ name, icon: Icon }) => (
        <li
          key={name}
          className="flex items-center gap-2.5 rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium text-ink"
        >
          <Icon size={18} aria-hidden="true" className="text-accent" />
          {name}
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Technologies I work with" className="border-y border-line py-7">
      <div className="marquee">
        <div className="marquee-track">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}

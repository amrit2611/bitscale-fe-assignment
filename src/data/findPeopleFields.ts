import {
  Search,
  Briefcase,
  Globe,
  MapPin,
  Building2,
  Users,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type FilterField = {
  id: string;
  label: string;
  icon: LucideIcon;
  placeholder: string;
  type: "input" | "dropdown";
};

export const findPeopleFields: FilterField[] = [
  {
    id: "keyword",
    label: "People Keyword",
    icon: Search,
    placeholder: "Enter single keyword here...",
    type: "input",
  },
  {
    id: "jobTitle",
    label: "Job Title",
    icon: Briefcase,
    placeholder: "E.g: Manager, Software Engineer",
    type: "dropdown",
  },
  {
    id: "companyWebsite",
    label: "Company Website",
    icon: Globe,
    placeholder: "E.g: Google.com, LinkedIn.com",
    type: "dropdown",
  },
  {
    id: "personLocation",
    label: "Person Location",
    icon: MapPin,
    placeholder: "E.g: London, Great New York City",
    type: "dropdown",
  },
  {
    id: "companyLocation",
    label: "Company Location",
    icon: MapPin,
    placeholder: "E.g: United States, UAE",
    type: "dropdown",
  },
  {
    id: "companyHeadcount",
    label: "Company Headcount",
    icon: Building2,
    placeholder: "E.g: 11-50, 10000+",
    type: "dropdown",
  },
  {
    id: "managementLevel",
    label: "Management Level",
    icon: ShieldCheck,
    placeholder: "E.g: Owner, Founder",
    type: "dropdown",
  },
];

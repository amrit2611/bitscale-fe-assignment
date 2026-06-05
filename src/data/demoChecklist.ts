export type ChecklistItem = {
  id: string;
  label: string;
  done: boolean;
};

export const demoChecklist: ChecklistItem[] = [
  { id: "1", label: "Create your data list", done: true },
  { id: "2", label: "Connect an integration", done: true },
  { id: "3", label: "Learn about BitAgent", done: true },
  { id: "4", label: "Customise waterfall providers", done: false },
];

export const demoProgress = {
  percent: 75,
  caption: "92% of users nailed BitScale after this walkthrough",
};

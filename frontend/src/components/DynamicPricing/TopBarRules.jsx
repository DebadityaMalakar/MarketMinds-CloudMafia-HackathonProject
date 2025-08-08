import { Plus } from "react-feather";

const TopBarRules = () => {
  return (
    <div className="flex justify-between items-center border-b border-[var(--color-border-muted)] p-4 bg-[var(--color-background-primary)]">
      <h2 className="text-xl font-bold">Dynamic Pricing</h2>
      <button className="flex items-center gap-2 bg-[var(--color-accent-blue)] text-white px-4 py-2 rounded-md hover:brightness-110 transition">
        <Plus size={16} /> Add New Rule
      </button>
    </div>
  );
};

export default TopBarRules;

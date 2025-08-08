import { Plus, Upload, Download, MoreVertical } from "react-feather";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center border-b border-[var(--color-border-muted)] p-4 bg-[var(--color-background-primary)]">
      <div className="flex gap-2">
        <button className="flex items-center gap-1 border px-3 py-1 rounded-md">
          Manage <MoreVertical size={14} />
        </button>
        <button className="flex items-center gap-1 border px-3 py-1 rounded-md">
          <Download size={14} /> Export
        </button>
        <button className="flex items-center gap-1 border px-3 py-1 rounded-md">
          <Upload size={14} /> Import
        </button>
      </div>
      <button className="flex items-center gap-2 bg-[var(--color-accent-blue)] text-white px-4 py-2 rounded-md">
        <Plus size={16} /> Add Product
      </button>
    </div>
  );
};

export default TopBar;

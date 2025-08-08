const ProductsPanel = () => {
  return (
    <div className="flex-1 p-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="border px-3 py-1 rounded-md">Sort by A to Z</button>
        <button className="border px-3 py-1 rounded-md">Sort by date added</button>
        <input
          type="text"
          placeholder="Search"
          className="border px-3 py-1 rounded-md flex-1"
        />
        <button className="border px-3 py-1 rounded-md">Product Index View</button>
        <button className="border px-3 py-1 rounded-md bg-[var(--color-accent-blue)] text-white">
          Competition List View
        </button>
      </div>

      {/* Empty state */}
      <div className="text-center text-[var(--color-text-muted)] my-12">
        Start tracking your competitors by adding your first product right away!
      </div>

      {/* Add buttons */}
      <div className="space-y-2">
        <button className="w-full border px-3 py-2 rounded-md text-left">
          + Add products via batch file
        </button>
        <button className="w-full border px-3 py-2 rounded-md text-left">
          + Add products one by one
        </button>
      </div>
    </div>
  );
};

export default ProductsPanel;

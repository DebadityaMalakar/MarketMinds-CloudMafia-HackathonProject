import RuleCard from "./RuleCard";

const RulesList = () => {
  return (
    <div className="flex-1 p-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="border px-3 py-1 rounded-md">Sort by Name</button>
        <button className="border px-3 py-1 rounded-md">Sort by Date Created</button>
        <input
          type="text"
          placeholder="Search Rules"
          className="border px-3 py-1 rounded-md flex-1"
        />
      </div>

      {/* Rules */}
      <div className="space-y-4">
        <RuleCard
          title="myrule"
          product="iPhone 12 256 GB Black"
          description="I would like to be 5.00 INR + than the cheapest of my competitors including johnlewis.com as long as I respect min margin/markup as Cost + Additional Cost + 5.00 INR. Forced fallback to min level."
          created="Fri Aug 08 2025"
        />
      </div>
    </div>
  );
};

export default RulesList;

import { MoreVertical } from "react-feather";
import { useState } from "react";

const RuleCard = ({ title, product, description, created }) => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="border rounded-lg bg-white shadow-sm p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-semibold">{title}</span>
        <div className="flex items-center gap-2">
          <span className="bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)] text-xs px-2 py-0.5 rounded-full">
            Single Rule
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full ${enabled ? 'bg-[var(--color-accent-blue)]' : 'bg-gray-300'}`}></div>
            <div
              className={`absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                enabled ? 'translate-x-5' : ''
              }`}
            ></div>
          </label>
          <MoreVertical size={16} className="text-gray-500 cursor-pointer" />
        </div>
      </div>

      {/* Apply To */}
      <div>
        <span className="text-sm font-medium text-gray-500">Apply to:</span>
        <span className="ml-2 text-[var(--color-accent-blue)] bg-[var(--color-accent-blue)]/10 px-2 py-0.5 rounded-full text-sm">
          {product}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700">{description}</p>

      {/* Footer */}
      <div className="text-xs text-gray-500">Created: {created}</div>
    </div>
  );
};

export default RuleCard;

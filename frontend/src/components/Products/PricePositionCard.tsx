// PricePositionCard.jsx
const PricePositionCard = () => (
  <div className="border rounded-md p-4">
    <h4 className="font-semibold mb-2">Price Position</h4>
    <ul className="space-y-1 text-sm">
      <li>🟠 Highest price: 0</li>
      <li>🟣 Higher than av.: 0</li>
      <li>🟡 Average: 0</li>
      <li>🟢 Cheaper than av.: 0</li>
      <li>🔵 Cheapest price: 0</li>
      <li>⚪ All equal: 0</li>
    </ul>
  </div>
);
export default PricePositionCard;
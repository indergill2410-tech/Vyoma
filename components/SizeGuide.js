"use client";

const GUIDES = {
  women: {
    label: "Women",
    columns: ["Bust (cm)", "Waist (cm)", "Hip (cm)"],
    rows: [
      { size: "XS", values: ["76-81", "60-65", "84-89"] },
      { size: "S", values: ["81-86", "65-70", "89-94"] },
      { size: "M", values: ["86-91", "70-76", "94-99"] },
      { size: "L", values: ["91-97", "76-82", "99-105"] },
      { size: "XL", values: ["97-104", "82-89", "105-112"] },
    ],
  },
  men: {
    label: "Men",
    columns: ["Chest (cm)", "Waist (cm)", "Hip (cm)"],
    rows: [
      { size: "S", values: ["91-96", "76-81", "91-96"] },
      { size: "M", values: ["96-101", "81-86", "96-101"] },
      { size: "L", values: ["101-107", "86-92", "101-107"] },
      { size: "XL", values: ["107-113", "92-99", "107-113"] },
      { size: "XXL", values: ["113-121", "99-107", "113-121"] },
    ],
  },
  unisex: {
    label: "Unisex",
    columns: ["Chest (cm)", "Waist (cm)", "Hip (cm)"],
    rows: [
      { size: "XS/S", values: ["81-91", "65-76", "89-99"] },
      { size: "S/M", values: ["86-101", "70-86", "94-101"] },
      { size: "M/L", values: ["96-107", "81-92", "99-107"] },
      { size: "L/XL", values: ["101-113", "86-99", "105-113"] },
      { size: "XL", values: ["107-121", "92-107", "112-121"] },
    ],
  },
};

export default function SizeGuide({ open, onClose, fit, audience = "women" }) {
  if (!open) return null;

  const guide = GUIDES[audience] || GUIDES.unisex;

  return (
    <div className="modal-scrim" onClick={onClose} role="dialog" aria-modal="true" aria-label="Size guide">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{guide.label} size guide</h3>
          <button className="drawer-close" onClick={onClose} aria-label="Close size guide">✕</button>
        </div>
        {fit && <p className="muted small">{fit}</p>}
        <table className="size-table">
          <thead>
            <tr>
              <th>Size</th>
              {guide.columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {guide.rows.map((row) => (
              <tr key={row.size}>
                <td><strong>{row.size}</strong></td>
                {row.values.map((value, index) => (
                  <td key={`${row.size}-${guide.columns[index]}`}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="muted xsmall">
          Measurements are body measurements, not garment. Between sizes? See the fit note above.
        </p>
      </div>
    </div>
  );
}

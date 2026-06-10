"use client";

// Body measurements, in cm. Helps you land the right size first time.
const ROWS = [
  { size: "XS", bust: "76–81", waist: "60–65", hip: "84–89" },
  { size: "S", bust: "81–86", waist: "65–70", hip: "89–94" },
  { size: "M", bust: "86–91", waist: "70–76", hip: "94–99" },
  { size: "L", bust: "91–97", waist: "76–82", hip: "99–105" },
  { size: "XL", bust: "97–104", waist: "82–89", hip: "105–112" },
];

export default function SizeGuide({ open, onClose, fit }) {
  if (!open) return null;
  return (
    <div className="modal-scrim" onClick={onClose} role="dialog" aria-modal="true" aria-label="Size guide">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>Size guide</h3>
          <button className="drawer-close" onClick={onClose} aria-label="Close size guide">✕</button>
        </div>
        {fit && <p className="muted small">{fit}</p>}
        <table className="size-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Bust (cm)</th>
              <th>Waist (cm)</th>
              <th>Hip (cm)</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.size}>
                <td><strong>{r.size}</strong></td>
                <td>{r.bust}</td>
                <td>{r.waist}</td>
                <td>{r.hip}</td>
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

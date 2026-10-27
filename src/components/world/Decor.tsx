import type { CSSProperties } from "react";
import type { FlowerId } from "@/lib/quiz-data";
import { FLOWER_INFO } from "@/lib/quiz-data";

const INK = "#65445F";

export function Star({ size = 18, fill = "#FFF0A8", className = "", style }: { size?: number; fill?: string; className?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17l-6.1 3.4 1.5-6.8L2.2 9l6.9-.7z" fill={fill} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function Cloud({ width = 120, className = "", style }: { width?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg width={width} viewBox="0 0 120 60" className={className} style={style} aria-hidden>
      <path d="M25 50h70a18 18 0 000-36 24 24 0 00-44-4A18 18 0 0025 50z" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" />
      <circle cx="48" cy="34" r="2" fill={INK} /><circle cx="68" cy="34" r="2" fill={INK} />
      <path d="M54 39q4 4 8 0" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Butterfly({ size = 40, color = "#FFC6DF", className = "", style }: { size?: number; color?: string; className?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} style={style} aria-hidden>
      <ellipse cx="12" cy="14" rx="9" ry="10" fill={color} stroke={INK} strokeWidth="2" />
      <ellipse cx="28" cy="14" rx="9" ry="10" fill={color} stroke={INK} strokeWidth="2" />
      <ellipse cx="13" cy="28" rx="6" ry="7" fill="#C6E4FF" stroke={INK} strokeWidth="2" />
      <ellipse cx="27" cy="28" rx="6" ry="7" fill="#C6E4FF" stroke={INK} strokeWidth="2" />
      <rect x="18.5" y="8" width="3" height="26" rx="1.5" fill={INK} />
    </svg>
  );
}

export function Heart({ size = 20, fill = "#FFC6DF", className = "", style }: { size?: number; fill?: string; className?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 21s-8-5.3-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.7-8 11-8 11z" fill={fill} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function Sun({ size = 110, className = "", style }: { size?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style} aria-hidden>
      <g className="animate-spin-slow" style={{ transformOrigin: "50px 50px" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x="47" y="2" width="6" height="14" rx="3" fill="#FFF0A8" stroke={INK} strokeWidth="1.6" transform={`rotate(${i * 30} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="28" fill="#FFE27A" stroke={INK} strokeWidth="2.5" />
      <circle cx="41" cy="47" r="2.6" fill={INK} /><circle cx="59" cy="47" r="2.6" fill={INK} />
      <circle cx="36" cy="55" r="4" fill="#FFC6DF" /><circle cx="64" cy="55" r="4" fill="#FFC6DF" />
      <path d="M43 56q7 7 14 0" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Original SVG flower for every outcome. */
export function FlowerIllustration({ flower, size = 200, face = true, className = "", style }: { flower: FlowerId; size?: number; face?: boolean; className?: string; style?: CSSProperties }) {
  const info = FLOWER_INFO[flower];
  const faceEl = face ? (
    <g>
      <circle cx="92" cy="96" r="3.4" fill={INK} /><circle cx="108" cy="96" r="3.4" fill={INK} />
      <circle cx="86" cy="104" r="4" fill="#FF9EC4" opacity=".8" /><circle cx="114" cy="104" r="4" fill="#FF9EC4" opacity=".8" />
      <path d="M94 105q6 6 12 0" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </g>
  ) : null;
  const stem = (
    <g>
      <path d="M100 130 C 98 160, 104 180, 100 200" stroke="#7FBF8A" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M100 168 q -26 -14 -34 4 q 18 10 34 -4z" fill="#A8DDB0" stroke={INK} strokeWidth="2" />
      <path d="M101 180 q 26 -14 34 4 q -18 10 -34 -4z" fill="#A8DDB0" stroke={INK} strokeWidth="2" />
    </g>
  );

  let head: React.ReactNode;
  if (flower === "tulip") {
    head = (
      <g>
        <path d="M70 70 Q 66 128 100 132 Q 134 128 130 70 L 115 90 L 100 64 L 85 90 Z" fill={info.petal} stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
        {faceEl}
      </g>
    );
  } else if (flower === "lavender") {
    head = (
      <g>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <ellipse cx={88} cy={40 + i * 15} rx="10" ry="8" fill={info.petal} stroke={INK} strokeWidth="2" />
            <ellipse cx={112} cy={40 + i * 15} rx="10" ry="8" fill={info.petal} stroke={INK} strokeWidth="2" />
          </g>
        ))}
        <circle cx="100" cy="100" r="22" fill={info.petal} stroke={INK} strokeWidth="2.4" />
        {faceEl}
      </g>
    );
  } else if (flower === "lily") {
    head = (
      <g>
        <path d="M100 130 Q 100 70 140 50" stroke="#7FBF8A" strokeWidth="5" fill="none" />
        {[[128, 62], [146, 86], [58, 66]].map(([x, y], i) => (
          <path key={i} d={`M${x - 12} ${y} q 12 -18 24 0 l -3 8 -4 -4 -5 6 -5 -6 -4 4z`} fill="#FFFFFF" stroke={INK} strokeWidth="2" />
        ))}
        <path d="M100 100 Q 92 70 58 58" stroke="#7FBF8A" strokeWidth="4" fill="none" />
        <path d="M74 92 q 26 -40 52 0 l -6 18 -8 -8 -12 12 -12 -12 -8 8z" fill="#FFFFFF" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
        <g transform="translate(0 -4)">{faceEl}</g>
      </g>
    );
  } else {
    const cfg = {
      daisy: { n: 14, rx: 9, ry: 28, r: 22 },
      sunflower: { n: 18, rx: 9, ry: 26, r: 26 },
      cherry: { n: 5, rx: 20, ry: 26, r: 18 },
      rose: { n: 8, rx: 22, ry: 26, r: 24 },
      forgetmenot: { n: 5, rx: 19, ry: 22, r: 16 },
    }[flower];
    head = (
      <g>
        {Array.from({ length: cfg.n }).map((_, i) => (
          <ellipse key={i} cx="100" cy={100 - cfg.r - cfg.ry * 0.6} rx={cfg.rx} ry={cfg.ry} fill={info.petal} stroke={INK} strokeWidth="2.2" transform={`rotate(${(360 / cfg.n) * i} 100 100)`} />
        ))}
        {flower === "cherry" && Array.from({ length: 5 }).map((_, i) => (
          <path key={i} d="M100 46 l -4 -6 m 4 6 l 4 -6" stroke={INK} strokeWidth="2" transform={`rotate(${72 * i} 100 100)`} />
        ))}
        {flower === "rose" && <circle cx="100" cy="100" r="34" fill="#FF8FA8" stroke={INK} strokeWidth="2.2" />}
        <circle cx="100" cy="100" r={cfg.r + 6} fill={info.center} stroke={INK} strokeWidth="2.6" />
        {flower === "rose" && <path d="M78 92 q 22 -22 44 0" stroke={INK} strokeWidth="2" fill="none" />}
        {faceEl}
      </g>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 200 210" className={className} style={style} role="img" aria-label={`${info.name} illustration`}>
      {stem}
      {head}
    </svg>
  );
}

export const STICKERS = ["🍓", "🍎", "🎀", "💌", "🍄", "🌙", "🌷", "🐞", "🧁", "🌈", "📮", "🍒"];

export default function AlertTriangle({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g filter="url(#filter0_d_3847_5265)">
      <path d="M12 3L18 15L6 15L12 3Z" fill="#1A1B23"/>
      <path d="M12.4472 2.77639L12 1.88196L11.5528 2.77639L5.55279 14.7764L5.19099 15.5L6 15.5L18 15.5L18.809 15.5L18.4472 14.7764L12.4472 2.77639Z" stroke="#2A3038"/>
    </g>
    <defs>
      <filter id="filter0_d_3847_5265" x="0.381836" y="0.763672" width="23.2363" height="23.2363" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3847_5265"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3847_5265" result="shape" />
        </filter>
      </defs>
    </svg>
  </div>

  );
}

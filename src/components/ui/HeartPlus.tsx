export const HeartPlus = ({size = 24, fill = "none", className = "", ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`lucide lucide-heart-plus ${className}`}
    {...props}>
    {/* Heart shape with fill */}
    <path
      d="M13.5 19.5 12 21l-7-7c-1.5-1.45-3-3.2-3-5.5A5.5 5.5 0 0 1 7.5 3c1.76 0 3 .5 4.5 2 1.5-1.5 2.74-2 4.5-2a5.5 5.5 0 0 1 5.402 6.5"
      fill={fill}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Plus sign remains stroked */}
    <path d="M15 15h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 12v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

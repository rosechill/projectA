export default function IconClose({ width = 25, height = 25, color = '#0091FF', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      color={color}
      {...props}
      className="h-6 w-6"
      viewBox="0 0 24 24"
      stroke="black"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" fill={color} />
    </svg>
  )
}

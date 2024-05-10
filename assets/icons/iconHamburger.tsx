export default function IconHamburger({ width = 25, height = 25, color = '#fff', ...props }) {
  return (
    <svg
      width={width}
      height={height}
      color={color}
      {...props}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.5832 11.6667C34.5832 12.357 34.0235 12.9167 33.3332 12.9167H6.6665C5.97615 12.9167 5.4165 12.357 5.4165 11.6667C5.4165 10.9763 5.97615 10.4167 6.6665 10.4167H33.3332C34.0235 10.4167 34.5832 10.9763 34.5832 11.6667Z"
        fill="#fff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.5832 20C34.5832 20.6903 34.0235 21.25 33.3332 21.25H6.6665C5.97615 21.25 5.4165 20.6903 5.4165 20C5.4165 19.3097 5.97615 18.75 6.6665 18.75H33.3332C34.0235 18.75 34.5832 19.3097 34.5832 20Z"
        fill="#fff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.5832 28.3333C34.5832 29.0236 34.0235 29.5833 33.3332 29.5833H6.6665C5.97615 29.5833 5.4165 29.0236 5.4165 28.3333C5.4165 27.643 5.97615 27.0833 6.6665 27.0833H33.3332C34.0235 27.0833 34.5832 27.643 34.5832 28.3333Z"
        fill="#fff"
      />
    </svg>
  )
}

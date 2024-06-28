import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* SVG Background */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        style={{ zIndex: -1 }}
        opacity="0.46"
      >
        <defs>
          <filter
            id="bbblurry-filter"
            x="-100%"
            y="-100%"
            width="400%"
            height="400%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              stdDeviation="112"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="SourceGraphic"
              edgeMode="none"
              result="blur"
            ></feGaussianBlur>
          </filter>
        </defs>
        <g filter="url(#bbblurry-filter)">
          <ellipse
            rx="18.75%"
            ry="18.75%"
            cx="31.43%"
            cy="35.79%"
            fill="hsl(37, 99%, 67%)"
          ></ellipse>
          <ellipse
            rx="18.75%"
            ry="18.75%"
            cx="51.88%"
            cy="67.76%"
            fill="hsl(316, 73%, 52%)"
          ></ellipse>
          <ellipse
            rx="18.75%"
            ry="18.75%"
            cx="69.56%"
            cy="33.57%"
            fill="hsl(185, 100%, 57%)"
          ></ellipse>
        </g>
      </svg>

      {/* Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <SignIn />
      </div>
    </div>
  );
}

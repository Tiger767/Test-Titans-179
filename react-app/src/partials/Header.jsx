import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../utils/Dropdown';

function Header() {

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const trigger = useRef(null);
  const mobileNav = useRef(null);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target) || trigger.current.contains(target)) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <svg className="w-8 h-8 fill-current text-purple-600" viewBox="64.07 37.06 421.483 393.216" xmlns="http://www.w3.org/2000/svg">
                <path d="M 347.905 39.724 C 350.38 39.355 353.9 39.447 356.542 40.509 C 359.283 41.611 362.356 43.608 364.001 46.398 C 365.853 49.538 368.419 51.127 366.357 58.96 C 363.654 69.228 350.796 91.94 334.897 118.743 C 375.749 122.326 424.52 130.069 440.085 130.176 C 446.636 130.221 447.039 127.852 450.292 128.606 C 453.731 129.403 458.083 132.287 460.107 135.28 C 462.087 138.208 463.039 142.815 462.462 146.272 C 461.881 149.754 459.035 153.771 456.573 156.087 C 454.36 158.169 452.661 159.201 448.722 160.013 C 442.295 161.336 432.716 160.952 418.885 160.013 C 396.694 158.505 358.945 150.668 322.308 148.235 C 320.734 148.13 319.111 148.035 317.442 147.948 C 316.559 149.421 315.675 150.898 314.791 152.376 C 316.064 167.074 317.402 193.378 318.001 220.099 C 349.78 219.749 383.655 219.164 400.826 219.529 C 414.46 219.819 421.511 219.163 427.522 221.099 C 431.599 222.412 433.979 224.03 435.766 226.988 C 437.819 230.386 438.962 237.241 438.122 241.121 C 437.391 244.499 435.079 247.587 432.233 249.366 C 429.109 251.318 427.735 251.206 419.67 251.721 C 404.666 252.68 358.149 251.526 318.318 250.748 C 318.28 260.662 318.083 269.977 317.676 278.024 C 315.684 317.439 306.313 365.812 302.758 389.519 C 300.723 403.089 300.297 410.305 298.046 417.001 C 296.433 421.8 295.229 425.304 292.158 427.6 C 288.931 430.012 282.753 431.445 278.81 430.741 C 275.087 430.077 271.013 426.985 268.995 424.067 C 267.075 421.292 266.584 420.642 266.639 413.86 C 266.796 394.787 284.456 307.828 287.054 276.454 C 288.07 264.185 287.961 257.737 287.642 250.242 C 282.832 250.187 278.384 250.154 274.413 250.151 C 269.689 250.147 265.043 250.183 260.503 250.242 C 236.099 298.568 210.051 353.373 197.544 381.668 C 188.989 401.022 188.774 415.099 182.233 421.319 C 177.893 425.447 171.348 425.229 167.315 424.46 C 163.889 423.807 162.167 423.196 159.07 418.571 C 152.165 408.256 141.326 376.079 133.16 347.905 C 123.012 312.898 115.243 260.358 104.893 221.492 C 95.457 186.057 80.002 146.029 74.271 123.345 C 70.719 109.282 69.646 102.271 68.775 92.723 C 67.985 84.068 67.025 74.641 68.775 68.383 C 70.162 63.422 73.068 59.254 76.234 56.997 C 79.086 54.965 83.094 54.05 86.442 54.642 C 90.038 55.278 94.357 56.393 97.041 61.316 C 101.764 69.977 98.784 91.755 103.323 112.352 C 109.404 139.944 125.44 179.041 134.73 214.425 C 144.377 251.17 152.988 302.345 159.856 329.061 C 164.275 346.254 163.471 368.915 171.241 366.357 C 181.447 362.996 205.494 305.339 229.258 250.887 C 218.644 251.119 209.408 251.244 202.177 250.936 C 192.175 250.511 185.915 250.646 180.977 248.58 C 177.328 247.055 175.039 244.827 173.518 241.906 C 171.888 238.779 171.055 233.626 171.947 230.129 C 172.819 226.71 176.205 222.982 178.621 221.099 C 180.588 219.567 180.56 219.277 184.903 218.744 C 193.41 217.699 217.832 218.754 243.139 219.57 C 249.765 204.956 256.139 191.535 261.928 180.663 C 267.463 170.269 273.638 158.834 280.056 147.115 C 238.514 146.969 190.644 148.384 173.125 145.879 C 162.806 144.404 159.521 143.525 156.244 139.991 C 153.296 136.812 152.399 130.586 153.103 126.643 C 153.768 122.92 157.117 118.832 159.777 116.828 C 162.071 115.1 161.893 114.994 167.629 114.472 C 183.395 113.037 248.886 114.226 297.074 116.412 C 316.806 81.269 335.579 49.541 342.409 42.079 C 345.377 38.837 345.773 40.041 347.905 39.724 Z M 285.132 203.185 C 281.889 208.996 278.841 214.604 276.062 219.921 C 275.994 220.05 275.927 220.179 275.859 220.309 C 276.163 220.311 276.466 220.312 276.768 220.314 C 279.819 220.329 283.024 220.334 286.349 220.329 C 286.008 214.999 285.579 209.178 285.132 203.185 Z M 333.217 267.896 C 335.735 267.269 338.455 267.001 341.069 267.896 C 344.084 268.929 348.216 272.153 350.098 274.57 C 351.63 276.536 351.803 276.97 352.454 280.851 C 353.988 290.008 355.09 319.309 354.809 338.169 C 354.533 356.728 354.182 380.314 350.883 393.131 C 348.653 401.798 345.722 407.596 341.461 411.583 C 337.737 415.068 331.99 417.375 327.721 417.079 C 323.642 416.796 318.621 413.645 316.336 410.405 C 314.079 407.207 313.353 402.097 313.98 397.842 C 314.662 393.211 319.332 391.076 321.047 383.709 C 324.01 370.972 324.203 339.978 324.187 321.68 C 324.174 306.08 320.554 288.223 321.832 280.066 C 322.528 275.622 323.81 273.86 325.758 271.822 C 327.644 269.847 330.626 268.541 333.217 267.896 Z M 368.634 264.755 C 375.691 263.818 398.148 265.99 407.107 268.681 C 413.233 270.521 417.237 273.238 420.063 276.14 C 422.347 278.486 423.272 280.797 423.989 283.992 C 424.855 287.857 425.372 291.829 423.989 298.125 C 421.774 308.2 409.668 326.333 406.715 340.525 C 403.894 354.081 405.098 369.113 405.93 381.354 C 406.659 392.091 411.643 404.011 410.641 410.405 C 409.998 414.506 408.249 416.756 405.537 418.649 C 402.422 420.824 396.177 422.256 392.189 421.79 C 388.529 421.363 384.904 419.275 382.374 416.687 C 379.736 413.987 378.139 411.258 376.878 405.694 C 374.793 396.494 374.855 376.312 375.308 362.509 C 375.737 349.413 376.15 335.842 379.234 324.821 C 381.996 314.946 394.055 303.685 391.796 298.91 C 389.773 294.632 375.857 297.445 370.204 295.377 C 365.682 293.722 361.766 291.888 359.604 288.703 C 357.425 285.492 356.617 279.738 357.249 276.14 C 357.814 272.919 360.289 269.815 362.352 267.896 C 364.166 266.209 365.067 265.228 368.634 264.755 Z M 468.326 265.383 C 471.434 266.437 475.47 269.758 477.355 272.057 C 478.82 273.844 479.152 274.02 479.711 277.553 C 481.091 286.281 480.914 321.283 479.711 334.871 C 478.921 343.793 476.714 345.42 475.785 354.501 C 474.332 368.706 477.408 404.332 474.214 415.744 C 472.499 421.876 470.045 424.333 466.755 426.344 C 463.578 428.287 458.475 428.806 454.978 427.915 C 451.558 427.043 447.98 424.487 445.948 421.241 C 443.652 417.572 442.865 411.523 442.807 406.322 C 442.747 400.819 445.331 396.567 445.948 389.048 C 446.832 378.271 444.9 355.551 445.948 345.864 C 446.595 339.88 448.414 339.746 449.089 333.301 C 449.221 332.044 449.294 330.509 449.322 328.759 C 447.124 328.409 445.062 327.673 442.754 326.627 C 438.603 324.745 432.398 322.026 429.799 317.597 C 426.956 312.752 427.27 303.549 427.443 297.968 C 427.585 293.396 428.18 289.774 429.799 286.19 C 431.434 282.569 433.548 279.461 437.258 276.376 C 442.035 272.403 451.336 266.178 457.673 265.383 C 458.537 265.275 459.432 265.231 460.338 265.247 C 462.65 264.794 465.775 264.518 468.326 265.383 Z"/>
              </svg>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">

            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link to="/testVendia" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">Test Vendia</Link>
              </li>
              <li>
                <Link to="/janeHopkinsDoctor" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">Jane Hopkins Doctor</Link>
              </li>
              <li>
                <Link to="/janeHopkinsAdmin" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">Jane Hopkins Admin</Link>
              </li>
              <li>
                <Link to="/signin" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">Sign in</Link>
              </li>
              <li>
                <Link to="/signup" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">Sign up</Link>
              </li>
            </ul>

          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">

            {/* Hamburger button */}
            <button ref={trigger} className={`hamburger ${mobileNavOpen && 'active'}`} aria-controls="mobile-nav" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <span className="sr-only">Menu</span>
              <svg className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect y="4" width="24" height="2" rx="1" />
                <rect y="11" width="24" height="2" rx="1" />
                <rect y="18" width="24" height="2" rx="1" />
              </svg>
            </button>

            {/*Mobile navigation */}
            <nav id="mobile-nav" ref={mobileNav} className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out" style={mobileNavOpen ? { maxHeight: mobileNav.current.scrollHeight, opacity: 1 } : { maxHeight: 0, opacity: .8 } }>
              <ul className="bg-gray-800 px-4 py-2">
                <li>
                  <Link to="/signin" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Sign in</Link>
                </li>
                <li>
                  <Link to="/signup" className="font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out">Sign up</Link>
                </li>
              </ul>
            </nav>

          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;

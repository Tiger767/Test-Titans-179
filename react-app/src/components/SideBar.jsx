import React from "react";
import { Link } from "react-router-dom";
import "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
import "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";

function sidebar(props) {
  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <div className="main flex flex-row">
        <aside
          id="default-sidebar"
          class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div class="h-full px-6 py-6 overflow-y-auto bg-gray-800 border-4 border-r-gray-400 dark:bg-gray-800">
            <ul class="space-y-8 font-medium text-xl mt-14">
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-200 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700"
                >
                  <span class="icon pt-1">
                    <ion-icon size="large" name={props.firstIcon}></ion-icon>
                  </span>
                  <span class="ml-3 pr-3">{props.firstItem}</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-200 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700"
                >
                  <span class="icon pt-1">
                    <ion-icon size="large" name={props.secondIcon}></ion-icon>
                  </span>
                  <span class="flex-1 ml-3 whitespace-nowrap">
                    {props.secondItem}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-200 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700"
                >
                  <span class="icon pt-1">
                    <ion-icon size="large" name={props.thirdIcon}></ion-icon>
                  </span>
                  <span class="flex-1 ml-3 pr-3 whitespace-nowrap">
                    {props.thirdItem}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-200 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700"
                >
                  <span class="icon pt-1">
                    <ion-icon size="large" name={props.fourthIcon}></ion-icon>
                  </span>
                  <span class="flex-1 ml-3 whitespace-nowrap">
                    {props.fourthItem}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-200 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 mt-100"
                >
                  <span class="icon pt-1">
                    <ion-icon size="large" name={props.fifthIcon}></ion-icon>
                  </span>
                  <span class="flex-1 ml-3 whitespace-nowrap">
                    {props.fifthItem}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-200 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 mt-100"
                >
                  <span class="icon pt-1">
                    <ion-icon size="large" name={props.sixthIcon}></ion-icon>
                  </span>
                  <span class="flex-1 ml-3 whitespace-nowrap">
                    {props.sixthItem}
                  </span>
                </a>
              </li>
              {/* <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                <span class="icon pt-1">
                  <ion-icon size="large" name={props.sixthIcon}></ion-icon>
                </span>
                <span class="flex-1 ml-3 whitespace-nowrap">
                  {props.sixthItem}
                </span>
              </a>
            </li> */}
              {/* <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                <span class="icon pt-1">
                  <ion-icon size="large" name={props.seventhIcon}></ion-icon>
                </span>
                <span class="flex-1 ml-3 whitespace-nowrap">
                  {props.seventhItem}
                </span>
              </a>
            </li> */}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default sidebar;

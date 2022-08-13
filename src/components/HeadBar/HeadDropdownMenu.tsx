import React, { MouseEvent, useEffect, useRef } from "react";
import s from "./HeadBar.module.css";

export const HeadDropdownMenu = ({ openProfileMenu, setOpenProfileMenu, exit }: any) => {

    const onClose = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
    };

    return (
        <div className={s.dropdown_menu} onClick={onClose} onBlur={() => setOpenProfileMenu(false)} tabIndex={-1} >
            <div className={s.user_info}>
                <p>NAME SURNAME</p>
                <p>test@gmail.com</p>
            </div>
            <a href="#" className={s.link_menu_item}>
                <svg width="22px" height="22px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className={s.svg}>
                    <title />
                    <g data-name="Layer 2" id="Layer_2">
                        <path d="M16,14a6,6,0,1,1,6-6A6,6,0,0,1,16,14ZM16,4a4,4,0,1,0,4,4A4,4,0,0,0,16,4Z" />
                        <path d="M24,30H8a2,2,0,0,1-2-2V22a7,7,0,0,1,7-7h6a7,7,0,0,1,7,7v6A2,2,0,0,1,24,30ZM13,17a5,5,0,0,0-5,5v6H24V22a5,5,0,0,0-5-5Z" />
                    </g>
                </svg>
                Profile
            </a>
            <a href="#" className={s.link_menu_item}>
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 324.143 324.143" width={22} height={22} className={s.svg}>
                    <g>
                        <g>
                            <g>
                                <circle cx="88.071" cy="164.571" r="19" />
                                <circle cx="162.071" cy="164.571" r="19" />
                                <path
                                    d="M162.071,0C73.162,0,0.83,72.332,0.83,161.241c0,37.076,12.788,73.004,36.1,101.677
				c-6.65,16.756-17.788,31.245-32.401,42.089c-2.237,1.66-3.37,4.424-2.94,7.177c0.429,2.754,2.349,5.042,4.985,5.942
				c11.683,3.992,23.856,6.017,36.182,6.017c19.572,0,38.698-5.093,55.569-14.763c20.158,8.696,41.584,13.104,63.747,13.104
				c88.909,0,161.241-72.333,161.241-161.242S250.98,0,162.071,0z M162.071,307.483c-21.32,0-41.881-4.492-61.11-13.351
				c-2.292-1.057-4.959-0.891-7.102,0.443c-15.313,9.529-32.985,14.566-51.104,14.566c-6.053,0-12.065-0.564-17.981-1.684
				c12.521-12.12,22.014-26.95,27.788-43.547c0.878-2.525,0.346-5.328-1.398-7.354C28.378,230.07,15.83,196.22,15.83,161.241
				C15.83,80.604,81.434,15,162.071,15s146.241,65.604,146.241,146.241C308.313,241.88,242.709,307.483,162.071,307.483z"
                                />
                                <circle cx="236.071" cy="164.571" r="19" />
                            </g>
                        </g>
                    </g>
                </svg>
                Messages
            </a>
            <a href="#" className={s.link_menu_item}>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 471.701 471.701" width={22} height={22} className={s.svg}>
                    <g>
                        <path
                            d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
		c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
		l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
		C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
		s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
		c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
		C444.801,187.101,434.001,213.101,414.401,232.701z"
                        />
                    </g>
                </svg>
                Saved items
            </a>
            <a href="#" className={s.link_menu_item}>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 204.993 204.993" width={22} height={22} className={s.svg}>
                    <g>
                        <g>
                            <g>
                                <g>
                                    <g>
                                        <path
                                            d="M113.711,202.935H92.163c-3.242,0-4.373,0.007-15.421-27.364l-8.532-3.468
						c-23.248,10.547-26,10.547-26.92,10.547h-1.779l-1.517-1.303l-15.275-14.945c-2.323-2.319-3.128-3.124,8.825-30.137
						l-3.479-8.231C0,117.977,0,116.81,0,113.496V92.37c0-3.31,0-4.355,27.972-15.171l3.479-8.249
						c-12.644-26.602-11.774-27.428-9.28-29.776l16.427-16.105l2.04-0.064c2.48,0,11.681,3.357,27.371,9.981l8.507-3.454
						C86.758,2.054,88.015,2.058,91.246,2.058h21.548c3.228,0,4.363,0.004,15.411,27.382l8.546,3.443
						c23.212-10.533,26-10.533,26.927-10.533h1.768l1.517,1.281l15.275,14.92c2.323,2.344,3.117,3.146-8.836,30.17l3.489,8.278
						c28.101,10.014,28.101,11.177,28.101,14.498v21.101c0,3.232,0,4.37-28.008,15.192l-3.457,8.256
						c12.58,26.487,11.749,27.317,9.394,29.69l-16.552,16.205l-2.051,0.057c-2.469,0-11.649-3.361-27.317-9.992l-8.557,3.457
						C118.174,202.935,117.007,202.935,113.711,202.935z M94.403,194.213h16.996c1.95-3.976,6.166-14.516,9.541-23.595l0.68-1.807
						l15.475-6.249l1.664,0.705c9.223,3.933,20.124,8.292,24.372,9.631l11.943-11.681c-1.517-4.205-6.116-14.494-10.264-23.173
						l-0.837-1.764l6.403-15.285l1.743-0.673c9.316-3.586,20.11-8.013,24.143-10.032V93.88c-4.08-1.918-14.831-6.009-24.096-9.294
						l-1.814-0.648l-6.445-15.3l0.769-1.725c3.965-8.947,8.375-19.501,9.788-23.753l-11.975-11.706
						c-3.865,1.349-14.688,5.987-23.817,10.153l-1.7,0.78l-15.475-6.238l-0.691-1.721c-3.658-9.13-8.203-19.716-10.253-23.635
						H93.569c-1.961,3.965-6.163,14.509-9.53,23.585l-0.669,1.797l-15.432,6.27l-1.664-0.712
						c-9.244-3.926-20.167-8.278-24.429-9.616L29.923,43.805c1.496,4.198,6.109,14.48,10.243,23.159l0.848,1.768L34.579,84.01
						l-1.732,0.669c-9.301,3.582-20.077,8.006-24.111,10.017v16.431c4.08,1.925,14.82,6.027,24.079,9.326l1.8,0.655l6.446,15.249
						l-0.769,1.721c-3.965,8.94-8.371,19.48-9.788,23.724l12,11.742c3.854-1.36,14.663-5.998,23.803-10.168l1.711-0.784
						l15.443,6.277l0.691,1.721C87.821,179.723,92.352,190.291,94.403,194.213z M102.495,137.653
						c-19.759,0-35.849-15.772-35.849-35.159c0-19.372,16.087-35.134,35.849-35.134c19.748,0,35.799,15.765,35.799,35.134
						C138.294,121.881,122.243,137.653,102.495,137.653z M102.495,76.09c-14.956,0-27.113,11.846-27.113,26.405
						c0,14.569,12.154,26.426,27.113,26.426c14.931,0,27.078-11.857,27.078-26.426C129.569,87.936,117.426,76.09,102.495,76.09z"
                                        />
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                Settings
            </a>
            <div className={s.link_menu_item} onClick={exit}>
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" width={22} height={22} className={s.svg}>
                    <g>
                        <g>
                            <path
                                d="M358.401,192V12.8c0-7.066-5.734-12.8-12.8-12.8h-332.8c-7.066,0-12.8,5.734-12.8,12.8v486.4
			c0,7.066,5.734,12.8,12.8,12.8h332.8c7.066,0,12.8-5.734,12.8-12.8V320h-25.6v166.4h-307.2V25.6h307.2V192H358.401z"
                            />
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                d="M508.161,246.844l-74.931-76.595c-4.941-5.06-13.047-5.146-18.099-0.205c-5.052,4.941-5.146,13.056-0.205,18.099
			l53.854,55.057H193.673c-7.066,0-12.8,5.734-12.8,12.8c0,7.066,5.734,12.8,12.8,12.8h275.098l-53.854,55.057
			c-4.941,5.043-4.847,13.158,0.205,18.099c5.06,4.941,13.158,4.855,18.099-0.205l75.128-76.8
			C513.289,259.9,513.204,251.785,508.161,246.844z"
                            />
                        </g>
                    </g>
                </svg>
                Logout
            </div>
        </div>
    );
};

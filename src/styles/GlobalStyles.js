import { createGlobalStyle } from 'styled-components';
import theme from '@/src/styles/theme';

const GlobalStyle = createGlobalStyle`

	//root , html, body style
	html.lenis,
	html.lenis body {
		height: auto;
	}
	.lenis.lenis-smooth {
		scroll-behavior: auto !important;
	}
	.lenis.lenis-smooth [data-lenis-prevent] {
		overscroll-behavior: contain;
	}
	.lenis.lenis-stopped {
		overflow: hidden;
	}
	.lenis.lenis-smooth iframe {
		pointer-events: none;
	}


	/* Viewport Height Custom Properties Support */
    :root {
        /* Fallback values - will be overridden by useViewportHeight hook */
        --vh: 1vh;
        --dvh: 1vh;
        --svh: 1vh;
        --lvh: 1vh;
    }

    /* Viewport height utility classes */
    .vh-100 {
        height: calc(var(--vh, 1vh) * 100) !important;
    }

    .vh-90 {
        height: calc(var(--vh, 1vh) * 90) !important;
    }

    .vh-75 {
        height: calc(var(--vh, 1vh) * 75) !important;
    }

    .vh-50 {
        height: calc(var(--vh, 1vh) * 50) !important;
    }

    .vh-25 {
        height: calc(var(--vh, 1vh) * 25) !important;
    }

    .min-vh-100 {
        min-height: calc(var(--vh, 1vh) * 100) !important;
    }

    .min-vh-90 {
        min-height: calc(var(--vh, 1vh) * 90) !important;
    }

    .min-vh-75 {
        min-height: calc(var(--vh, 1vh) * 75) !important;
    }

    .min-vh-50 {
        min-height: calc(var(--vh, 1vh) * 50) !important;
    }

    /* Small viewport utilities (for mobile with browser UI) */
    .svh-100 {
        height: calc(var(--svh, 1vh) * 100) !important;
    }

    .min-svh-100 {
        min-height: calc(var(--svh, 1vh) * 100) !important;
    }

    /* Dynamic viewport utilities */
    .dvh-100 {
        height: calc(var(--dvh, 1vh) * 100) !important;
    }

    .min-dvh-100 {
        min-height: calc(var(--dvh, 1vh) * 100) !important;
    }

    /* Large viewport utilities */
    .lvh-100 {
        height: calc(var(--lvh, 1vh) * 100) !important;
    }

    .min-lvh-100 {
        min-height: calc(var(--lvh, 1vh) * 100) !important;
    }




    //cursor css
    .cursor {
        z-index: ${({ theme }) => theme.numericScale.zIndex.full} !important;
    }


    html, body {
        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        &::-webkit-scrollbar-track {
            background: transparent;
            border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background: ${({ theme }) => theme.colors.theme.metallicBronze};
            border-radius: 4px;
            transition: background 0.3s ease;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: ${({ theme }) => theme.colors.theme.metallicBronze};
        }

        &::-webkit-scrollbar-corner {
            background: transparent;
        }
    }

    body {
        position: relative;
        background: ${({ theme }) => theme.colors.theme.background?.base};
        color: ${({ theme }) => theme.colors.black.base};
        font-family: ${({ theme }) => theme.typography.fonts.primary};
        transition: background 0.3s, color 0.3s;

        /* --- Typography & Rendering --- */
        font-kerning: normal;
        font-optical-sizing: auto;
        font-synthesis: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-feature-settings: "kern", "liga", "clig", "calt";
        font-variation-settings: normal;
        text-size-adjust: 100%;
        font-weight: 400;
        letter-spacing: -0.4px;
        line-height: 120%;
        font-size: 18px;
        -webkit-user-drag: none;
        -webkit-user-select: none;
        scrollbar-gutter: stable;
        -moz-user-select: none;
        /* --- Text clarity & performance --- */
        backface-visibility: hidden;
        -webkit-text-stroke: 0.2px transparent; /* subtle clarity boost */


        /* --- Other fine-tuning --- */
        -webkit-tap-highlight-color: transparent;
        -webkit-text-size-adjust: 100%;
        text-rendering: geometricPrecision;

        /* --- Scrollbar --- */
        scroll-behavior: smooth;
        overflow-x: hidden;
        font-feature-settings: normal;

        scroll-snap-type: y mandatory;
        overscroll-behavior: none;

        &::-webkit-scrollbar {
            display: none;
        }

    }


    #main-root {
        pointer-events: ${({ theme }) => theme.scale?.cursor?.none || 'auto'};
    }

    #main-wrapper {
        opacity: ${({ theme }) => theme.scale?.opacity?.['100'] || theme.effects.opacity[100]};
        min-height: ${({ theme }) => theme.scale?.height?.screen || 'calc(var(--vh, 1vh) * 100)'};
    }


    ::selection {
        background-color: ${({ theme }) => theme.colors.theme.primary.base};
        color: ${({ theme }) => theme.colors.white.base};
    }


    a {
        text-decoration: none;
        color: inherit;
        will-change: transform;
        transition: ${({ theme }) => theme.animations.transition.default};
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            list-style: none;
            margin-left: 0;
            padding-left: 0;

        }
    }


    //form style
    .form-error {
        position: absolute;
        color: #dc004e !important;
        bottom: -26px;
        font-size: 10px;
        letter-spacing: 0;
    }

    .form-group {
        position: relative;

        .error-message {
            position: absolute;
            color: #dc004e !important;
        }
    }

    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;

    }


    .form-control:hover, .form-control:focus {
        background-color: transparent !important;
    }

    input:-internal-autofill-selected, input:-internal-autofill-selected :hover, input:-internal-autofill-selected :focus, textarea:-internal-autofill-selected, textarea:-internal-autofill-selected:hover, textarea:-internal-autofill-selected:focus, select:-internal-autofill-selected, select:-internal-autofill-selected:hover, select:-internal-autofill-selected:focus {
        background-color: transparent !important;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
        background-color: transparent !important;
        -webkit-text-fill-color: #fff !important;
        -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
        box-shadow: 0 0 0 1000px transparent inset !important;
        transition: background-color 5000s ease-in-out 0s;
    }

    /* Alternative approach - completely remove autofill styling */
    input:-webkit-autofill {
        -webkit-background-clip: text !important;
        background-clip: text !important;
		-webkit-text-fill-color: #fff !important;
		-webkit-box-shadow: 0 0 0 1000px transparent inset !important;
		box-shadow: 0 0 0 1000px transparent inset !important;
		transition: background-color 5000s ease-in-out 0s;
		background-color: transparent !important;
		
		
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */

    input[type=number] {
        -moz-appearance: textfield;
    }


    .btn:focus, button:focus, button:active:focus, .btn.active.focus, .btn.active:focus, .btn.focus, .btn:active.focus, .btn:active:focus, .btn:focus {
        outline: none;
        box-shadow: none;
    }

    button, button:active, button:focus, button:focus-visible {
        outline: none !important;
        box-shadow: none !important;
    }


    .has-error .find-retainer-filter__control {
        border-color: ${({ theme }) => theme.colors.semantic.error.base} !important;
    }


    //dcastalia form style
    .form-control.has-error {
        border-color: ${({ theme }) => theme.colors.semantic.error.base} !important;
    }

    .form-control:disabled {
        background-color: transparent;
    }

    .has-error .find-retainer-filter__control {
        border-color: ${({ theme }) => theme.colors.semantic.error.base} !important;
    }

    button, button:active, button:focus, button:focus-visible {
        outline: none !important;
        box-shadow: none !important;
    }

    button, input, optgroup, select, textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0px;
    }

    input:not([type="image" i], [type="range" i], [type="checkbox" i], [type="radio" i]) {
        overflow-clip-margin: 0px !important;
        overflow: clip !important;
    }

    form {
        display: flex;
        position: relative;
        flex-flow: wrap;
        gap: 30px;
        justify-content: space-between;


        div {
            position: relative;
        }

        .form-item {
            margin-bottom: 50px;
        }

        .form-group {
            position: relative;

            .error-message {
                position: absolute;
                bottom: -2px;
            }

            input:-internal-input-suggested {
                color: #402D17 !important; /* Changed from rgba(64, 45, 23, 0.5) to match form-control color */
                font-weight: 400;
                font-style: normal;
                font-size: 1rem !important; /* 18px based on 18px body font */
                line-height: 1.2 !important; /* 120% */
                letter-spacing: -0.02em !important; /* -2% */
                background-color: transparent !important;
            }

            .form-control {
                border: none;
                border-bottom: 1px solid #402D17;;
                background-color: transparent !important;
                padding: 0 0 10px 0;
                outline: none;
                box-shadow: none;
                outline: 0;
                border-radius: 0;
                width: 100%;
                position: relative;
                z-index: 2;
                border-image: initial;
                border-bottom: 1px solid rgb(179, 173, 173);
                transition: border-color 0.3s ease-in-out;
                color: #402D17;
                font-weight: 400;
                font-style: normal;
                font-size: 1rem !important; /* 18px based on 18px body font */
                line-height: 1.2 !important; /* 120% */
                letter-spacing: -0.02em !important; /* -2% */


                &::placeholder {
                    color: rgba(64, 45, 23, 0.5);
                }

                &:focus {
                    box-shadow: none;
                    border-color: #402D17;
                }

                &:disabled {
                    background-color: rgba(64, 45, 23, 0.5);
                }

                &.has-error {
                    border-color: ${({ theme }) => theme.colors.semantic.error.base} !important;
                }
            }
        }

        textarea {
            min-height: 120px !important;
            max-height: 120px !important;
        }
    }


    ${theme.grid.media.up.notebook} {
        .container, .custom-dc-container {
            max-width: ${theme.grid.container.laptop} !important;
            width: ${({ theme }) => theme.grid.container.laptop} !important;
            //padding: 0 !important;
        }
    }

    ${theme.grid?.media?.down.laptop} {
        .container, .custom-dc-container {
            max-width: ${theme.grid.container.tab} !important;
            width: ${theme.grid.container.tab} !important;
            //padding: 0 !important;
        }
    }

    ${theme.grid?.media?.down?.md} {
        .container, .custom-dc-container {
            max-width: ${theme.grid.container.md} !important;
            width: ${theme.grid.container.md} !important;
            //padding: 0 !important;
        }
    }











	body.scroll-down {


		.menu-text.color, .menu-lines.color {
			color: #0A2619;

			span {
				background: #0A2619;
			}
		}

		.menu-desktop {
			transform: translateY(-100%) !important;

			&.menu-open {

			}

	
		}
	}


	body.scroll-up {
		.menu-desktop {
			transform: translateY(0);

			&.menu-open {

			}
		}


		

	}






	


	.media-wrapper {
		background-color: #faf8f2;
		height: 100lvh;
		isolation: isolate;
		margin-bottom: -100lvh;
		position: sticky;
		top: 0;
		width: 100%;
		z-index: -1;
		img{
			left: 0px;
			position: absolute;
			top: 0px;
			height: 100%;
			object-fit: cover;
			width: 100%;
		}
	}

	/* Toaster notification position and padding fix */
	.sonner-toaster, .sonner-toast {
		top: 30px !important;
		right: 30px !important;
		position: fixed !important;
		padding-right: 30px !important;
		padding-top: 30px !important;
		z-index: 9999 !important;
	}
	.lg-backdrop{
		z-index: 9999 !important;
	}
	.lg-outer{
		z-index: 9999 !important;
	}
	
	
`;

export default GlobalStyle;

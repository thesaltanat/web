'use client';
import React, {
	useState,
	useEffect,
	useRef,
	useMemo,
	useCallback,
} from 'react';
import styled from 'styled-components';
import { useRouter, usePathname } from 'next/navigation';
import theme from '@/src/styles/theme';
import Link from 'next/link';
import { CURSOR_EXCLUSION } from 'haspr-cursor';
import parse from 'html-react-parser';

const CustomContextMenu = ({ data, navigationMenuData }) => {
	const menuRef = useRef(null);
	const [menuVisible, setMenuVisible] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
	const [canGoBack, setCanGoBack] = useState(false);
	const [canGoForward, setCanGoForward] = useState(false);
	const [forwardHistory, setForwardHistory] = useState([]);
	const router = useRouter();
	const pathname = usePathname();

	/* ------------ MUST BE STABLE ------------ */
	const handleContextMenu = useCallback(e => {
		e.preventDefault();

		setMenuVisible(true);
		setMenuPosition({
			x: e.clientX,
			y: e.clientY,
		});

		document.body.style.overflow = 'hidden';
	}, []);

	/* ------------ CLOSE MENU ------------ */
	const closeMenu = useCallback(() => {
		setMenuVisible(false);
		document.body.style.overflow = 'auto';
	}, []);

	/* ------------ GLOBAL RIGHT CLICK ------------ */
	useEffect(() => {
		document.addEventListener('contextmenu', handleContextMenu);

		return () => {
			document.removeEventListener('contextmenu', handleContextMenu);
		};
	}, [handleContextMenu]);

	/* ------------ CLICK OUTSIDE = CLOSE ------------ */
	useEffect(() => {
		const handleClick = e => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				closeMenu();
			}
		};

		document.addEventListener('click', handleClick);

		return () => document.removeEventListener('click', handleClick);
	}, [closeMenu]);

	/* ------------ ESC CLOSE ------------ */
	useEffect(() => {
		const onEsc = e => e.key === 'Escape' && closeMenu();
		document.addEventListener('keydown', onEsc);
		return () => document.removeEventListener('keydown', onEsc);
	}, [closeMenu]);
	useEffect(() => {
		setCanGoBack(window.history.length > 1);
		setCanGoForward(forwardHistory.length > 0);
	}, [forwardHistory]);

	/* =========================
		   KEYBOARD SHORTCUT HANDLER
		 ========================= */
	useEffect(() => {
		const handleKeys = e => {
			/* --- Back (Alt + Left Arrow) --- */
			if (e.altKey && e.key === 'ArrowLeft') {
				router.back();
			}

			/* --- Forward (Alt + Right Arrow) --- */
			if (e.altKey && e.key === 'ArrowRight') {
				router.forward?.();
			}

			/* --- Reload (Ctrl/Cmd + R) --- */
			if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
				e.preventDefault();
				window.location.reload();
			}

			/* --- Open Context Menu (Shift + F10) --- */
			if (e.shiftKey && e.key === 'F10') {
				e.preventDefault();
				setMenuVisible(true);
				setMenuPosition({
					x: window.innerWidth / 2,
					y: window.innerHeight / 2,
				});
			}

			/* --- Go Home (Alt + H) --- */
			if (e.altKey && e.key.toLowerCase() === 'h') {
				router.push('/');
			}

			/* --- Scroll Top (Home Key) --- */
			if (e.key === 'Home') {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}

			/* --- Copy URL (Ctrl/Cmd + L then C — Browser standard) --- */
			/* But we also add shortcut: Ctrl + Shift + C */
			if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'c') {
				navigator.clipboard.writeText(window.location.href);
			}

			/* --- Open in New Tab (Ctrl + Enter) --- */
			if (e.ctrlKey && e.key === 'Enter') {
				window.open(window.location.href, '_blank');
			}

			/* --- Close menu on ESC --- */
			if (e.key === 'Escape') {
				closeMenu();
			}
		};

		document.addEventListener('keydown', handleKeys);
		return () => document.removeEventListener('keydown', handleKeys);
	}, [router]);

	/* ============================== */

	const goHome = () => {
		router.push('/');
		closeMenu();
	};

	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		closeMenu();
	};

	const copyURL = async () => {
		await navigator.clipboard.writeText(window.location.href);
		closeMenu();
	};

	const openNewTab = () => {
		window.open(window.location.href, '_blank');
		closeMenu();
	};
	/* ================================= */

	const filteredMenuData = useMemo(
		() =>
			(navigationMenuData || []).filter(
				menuItem => menuItem?.item_url && menuItem?.item_title,
			),
		[navigationMenuData],
	);

	return (
		<div onContextMenu={handleContextMenu} className="pin-true-wrapper">
			{menuVisible && (
				<StyledContextMenu x={menuPosition.x} y={menuPosition.y}>
					<div className="ctx-menu" ref={menuRef}>
						<ul className="default-options">
							<li
								onClick={() => router.back()}
								className={canGoBack ? 'active' : ''}>
								<span>Back</span>
								<span>Alt + ←</span>
							</li>

							<li
								onClick={() =>
									router.push(
										forwardHistory[
											forwardHistory.length - 1
										] || pathname,
									)
								}
								className={canGoForward ? 'active' : ''}>
								<span>Forward</span>
								<span>Alt + →</span>
							</li>

							<li onClick={() => window.location.reload()}>
								<span>Reload</span>
								<span>Ctrl + R</span>
							</li>
						</ul>

						<div className="header">
							<h6>Quick Actions</h6>
						</div>
						<ul>
							<li onClick={goHome}>
								<span>Go Home</span>
								<span>Alt + H</span>
							</li>

							<li onClick={scrollTop}>
								<span>Scroll to Top</span>
								<span>Home</span>
							</li>

							<li onClick={copyURL}>
								<span>Copy Page URL</span>
								<span>Ctrl + Shift + C</span>
							</li>

							<li onClick={openNewTab}>
								<span>Open in New Tab</span>
								<span>Ctrl + Enter</span>
							</li>
						</ul>

						<div className="header">
							<h6>Navigation</h6>
						</div>

						<ul className="page" style={{ marginBottom: '15px' }}>
							{filteredMenuData.map(menuItem => (
								<li key={menuItem.item_url}>
									<Link
										prefetch={true}
										href={menuItem.item_url}>
										{parse(menuItem.item_title)}
									</Link>
								</li>
							))}
						</ul>

						<ul className="copyright">
							<li>
								<span>
									© {new Date().getFullYear()}{' '}
									{data?.copyright_text}
								</span>
							</li>
							<li>
								<a
									href="https://dcastalia.com"
									target="_blank"
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										gap: '5px',
									}}>
									<span>Site by Dcastalia</span>
									<img
										src="/images/static/dc-mini-logo.webp"
										alt="Dcastalia Logo"
										width={15}
										height={15}
									/>
								</a>
							</li>
						</ul>
					</div>
				</StyledContextMenu>
			)}
		</div>
	);
};
const StyledContextMenu = styled.div`
	position: fixed;
	top: ${({ y }) => y}px;
	left: ${({ x }) => x}px;
	background-color: ${theme.colors.theme.secondary.base};
	border-radius: 8px;
	border: 1px solid ${theme.colors.theme.secondary.base};
	box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
	width: 370px;
	height: ${({ menuHeight }) => menuHeight}px; // Use the dynamic menuHeight
	overflow: auto;
	z-index: 9999999999;

	.header {
		background: #fff;
		margin: 10px 24px;
		border-radius: 4px;
	}

	h6 {
		padding: 5px 10px;
		color: #2c3f59;
		font-size: 16px;
		margin: 0;
	}

	.ctx-menu {
		padding: 15px 0;

		ul {
			p {
				color: #fff;
				padding-left: 25px;
				padding-right: 24px;
			}

			li {
				display: flex;
				justify-content: space-between;
				padding: 0 24px 0 25px;
				background-color: transparent;
				transition: background-color 0.2s ease-in-out;
				cursor: pointer;

				&:last-child {
					margin-bottom: 0;
				}

				span {
					font-size: 14px;
					line-height: 22px;
					font-weight: 400;
					color: #fff !important;
					transition: color 0.2s ease-in-out;
				}

				a {
					font-size: 14px;
					line-height: 22px;
					font-weight: 400;
					color: #fff;
					transition: color 0.2s ease-in-out;
				}

				&:hover {
					background-color: ${theme.colors.theme.hoverColor.base};
					transition: background-color 0.2s ease-in-out;

					span {
						color: #ffffff;
						transition: color 0.2s ease-in-out;
					}
				}
			}
		}

		.default-options {
			li {
				cursor: pointer;

				span {
					color: #fff !important;
				}

				&.active {
					span {
						color: #fff !important;
					}
				}

				&:last-child {
					span {
						color: #fff !important;
					}
				}

				&:hover {
					span {
						color: #fff !important;
					}
				}
			}
		}

		.copyright {
			//border-top: 1px solid #f5f5f6;
			//border-bottom: 1px solid #f5f5f6;
			position: relative;
			padding: 10px 0;

			&:after {
				position: absolute;
				left: 0;
				right: 0;
				height: 1px;
				background: white;
				width: calc(100% - 48px);
				bottom: 0;
				margin: auto;
				content: '';
			}

			&:before {
				position: absolute;
				left: 0;
				right: 0;
				height: 1px;
				background: white;
				width: calc(100% - 48px);
				top: 0;
				margin: auto;
				content: '';
			}

			li {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				gap: 0;
				font-size: 12px;
				margin: 0;

				a {
					margin: 0;
				}

				span {
					font-size: 12px;
				}

				a {
					font-size: 12px;
				}

				&:hover {
					background-color: transparent !important;

					span {
						color: unset;
					}
				}
			}
		}

		.page {
			li {
				a {
					font-size: 14px;
					line-height: 22px;
					font-weight: 400;
					transition: all 0.2s ease-in-out;
				}

				&:hover {
					a {
						color: #ffffff !important;
						transition: all 0.2s ease-in-out;
					}
				}
			}
		}

		.credit {
			border-top: 1px solid #f5f5f6;

			li {
				a {
					width: 100%;
					display: flex;
					gap: 10px;

					span {
						font-size: 14px;
						line-height: 22px;
						font-weight: 400;
						transition: all 0.2s ease-in-out;
					}
				}

				&:hover {
					a {
						color: unset !important;

						span {
							color: #ffffff !important;
							transition: all 0.2s ease-in-out;
						}
					}
				}
			}
		}
	}

	.okay {
		margin-bottom: 10px;
	}
`;

export default React.memo(CustomContextMenu);

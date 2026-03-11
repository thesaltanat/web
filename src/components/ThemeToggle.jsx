import theme from '@/src/styles/theme';

export default function ThemeToggle({ themeMode, setThemeMode }) {
	return (
		<button
			onClick={() =>
				setThemeMode(themeMode === 'light' ? 'dark' : 'light')
			}
			style={{
				position: 'fixed',
				top: 20,
				right: 20,
				zIndex: 10000,
				padding: '10px 20px',
				borderRadius: '8px',
				border: 'none',
				background: themeMode === 'light' ? theme.colors.COLOR_GRAY_222 : theme.colors.white,
				color: themeMode === 'light' ? theme.colors.white : theme.colors.COLOR_GRAY_222,
				cursor: 'pointer',
				boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
			}}
			aria-label="Toggle theme">
			{themeMode === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
		</button>
	);
}

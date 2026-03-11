'use client';

import GlobalStyle from '@/src/styles/GlobalStyles';
import theme from '@/src/styles/theme';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import RoutePerformanceTracker from '@/src/utils/RoutePerformanceTracker';
import PrefetchingService from '@/src/utils/PrefetchingService';

export default function Providers({ children }) {
	// ✅ FIXED: Removed unused currentTheme state (Issue #4)
	// Theme color can be managed at the CSS level or moved to context if needed

	const activeTheme = {
		...theme,
		variants: {
			...theme.variants,
			active: theme.variants.light, // Use light theme by default
		},
	};

	return (
		<ThemeProvider theme={activeTheme}>
			<GlobalStyle />
			<ToastContainer />
			{/* Route Performance Tracking */}
			<RoutePerformanceTracker />

			{/* Route Prefetching Service */}
			<PrefetchingService />
			{children}
		</ThemeProvider>
	);
}

'use client';

import PageTransition from './PageTransition';

export default function PageTransitionProvider({ children }) {
	return <PageTransition>{children}</PageTransition>;
}

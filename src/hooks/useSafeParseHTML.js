"use client";

import { useMemo } from "react";
import parse from "html-react-parser";

export function useSafeHtml(htmlString) {
	return useMemo(() => {
		if (!htmlString || typeof htmlString !== "string") return "";
		try {
			return parse(htmlString);
		} catch {
			return htmlString;
		}
	}, [htmlString]);
}

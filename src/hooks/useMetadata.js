import { getApi } from '@/core';

function safeParseHtml(htmlString) {
	if (!htmlString || typeof htmlString !== 'string') return '';
	try {
		return parse(htmlString);
	} catch {
		return htmlString;
	}
}

export async function generateMetadata() {
	const meta = await getApi("home");

	return {
		title: {
			default: meta?.meta_title ? safeParseHtml(meta?.meta_title) : process.env.NEXT || "",
		},
		description: safeParseHtml(meta?.meta_description) || "",
		openGraph: {
			title: meta?.og_title || "",
			description: safeParseHtml(meta?.og_description) || "",
			metadataBase: new URL("https://thesaltanat.com/"),
			alternates: { canonical: "/" },
			images: [
				{
					url: meta?.og_image || "",
					alt: meta?.meta_title || "",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: meta.og_title || meta.meta_title || "Home",
			description:
				meta.og_description || meta.meta_description || "Welcome to our website",
			images: [meta.og_image || "/images/static/logo.svg"],
		},
		other: {
			schemaJson: meta?.custom_schema_json || "",
		},
	};
}

'use client';
import React, { useMemo } from 'react';
import { COMPONENT_MAP } from './ComponentRegistry';

// ✅ IMPROVED: Visible skeleton loader with proper height
const SectionLoader = () => (
	<div
		className="animate-pulse bg-gray-100 rounded-lg"
		style={{
			minHeight: '200px',
			margin: '1rem 0',
		}}
		aria-label="Loading section..."
	/>
);

// Individual Section Renderer
const SectionItem = React.memo(({ item, index, product }) => {
	const template = item?.section_data?.template || item?.data?.template;
	const Component = COMPONENT_MAP[template];

	if (!Component) {
		console.warn(`Template "${template}" not found in COMPONENT_MAP`);
		return null;
	}

	// Props logic for special templates
	const getProps = () => {
		const baseProps = { data: item };
		switch (template) {
			case 'page_banner_contact':
				return { ...baseProps, forContact: true };
			case 'at_a_glance':
				return { ...baseProps, product: product?.data };
			default:
				return baseProps;
		}
	};

	// ✅ IMPROVED: Use unique ID if available, fallback to index
	const uniqueKey =
		item?.id || item?.section_data?.id || `section-${template}-${index}`;

	return <Component key={uniqueKey} {...getProps()} />;
});

SectionItem.displayName = 'SectionItem';

// Top-level Renderer
const RenderedSection = ({ data, product }) => {
	// Memoize sections
	const sectionsList = useMemo(() => {
		return data?.sections || data?.posts?.list || [];
	}, [data?.sections, data?.posts?.list]);

	// Early exit if nothing to render
	if (!sectionsList?.length) return null;
	return (
		<>
			{sectionsList.map((item, index) => {
				const uniqueKey =
					item?.id || item?.section_data?.id || `section-${index}`;

				return (
					<SectionItem
						key={uniqueKey}
						item={item}
						index={index}
						product={product}
					/>
				);
			})}
		</>
	);
};

RenderedSection.displayName = 'RenderedSection';

export default React.memo(RenderedSection);

import AboutOverviewV2 from '@/src/modules/AboutOverview';
import FaqTemplate from '@/src/modules/accordion/Accordion.V1';
import ApplyForRoleTemplate from '@/src/modules/ApplyForRole';
import ArtofEscapTemplate1 from '@/src/modules/TextImageParallaxSection';
import AtAGLANCE from '@/src/modules/at-a-glance';
import BookNowTemplate from '@/src/modules/booknow';
import FeatureListTemplate from '@/src/modules/feature_list';
import FeatureList from '@/src/modules/FeatureList';
import FeatureListTemplateProject from '@/src/modules/FeatureListProject';
import FormTemplate from '@/src/modules/form_template';
import GalleryTemplate from '@/src/modules/gallery';
import AboutOverview from '@/src/modules/overview/OverviewTemplate.V3';
import FeaturedProject from '@/src/modules/FeaturedProjectSingleSlider'
// Static imports for better SSR compatibility
import GeneralTemplate from '@/src/modules/GeneralTemplate';
import HeroBanner from '@/src/modules/HeroBanner';
import JobTemplate from '@/src/modules/JobList';
import MasonaryGallery from '@/src/modules/MasonaryGallery';
import NewsEvent from '@/src/modules/NewsEvents';
import MediaKitList from '@/src/modules/NewsEvents.V2';
import OverviewTemplateLong from '@/src/modules/overview/OverviewTemplate.v1';
import OverviewTemplateCareer from '@/src/modules/overview/OverviewTemplate.V2';
import PageBanner from '@/src/modules/page_banner/PageBanner.v1';
import PartnerTemplate from '@/src/modules/Partners';
import ProjectList from '@/src/modules/ProjectList';
import ProjectOverview from '@/src/modules/ProjectOverview';
import SliderTemplate1 from '@/src/modules/slider_template_1';
import TeamTemplate from '@/src/modules/team/Team.v1';
import TestimonialTemplate from '@/src/modules/testimonial';
import OverviewValue from '@/src/modules/Values';

// Component map
export const COMPONENT_MAP = {
	general_template: GeneralTemplate,
	page_header: PageBanner,
	page_banner_contact: PageBanner,
	hero_banner: HeroBanner,
	partner_template: PartnerTemplate,
	gallery_template: GalleryTemplate,
	form_template: FormTemplate,
	testimonial_template: TestimonialTemplate,
	feature_list_template: FeatureListTemplate,
	feature_list_project: FeatureListTemplateProject,
	book_now_template: BookNowTemplate,
	slider_template_1: SliderTemplate1,
	art_of_escap: ArtofEscapTemplate1,
	overview_interactive: OverviewTemplateLong,
	team_member: TeamTemplate,
	faq_template: FaqTemplate,
	overview_career: OverviewTemplateCareer,
	job_list: JobTemplate,
	apply_for_role: ApplyForRoleTemplate,
	media_kit_list: MediaKitList,
	news_event_list: NewsEvent,
	feature_list: FeatureList,
	about_overview: AboutOverview,
	project_list: ProjectList,
	overview: AboutOverviewV2,
	masonary_gallery: MasonaryGallery,
	at_a_glance: AtAGLANCE,
	project_overview: ProjectOverview,
	overview_and_value: OverviewValue,
	slider_template_2: FeaturedProject,
};

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID as string;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
// 페이지 조회 전송을 위한 태그
export const pageview = (url: URL) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url, // 페이지의 url
    // page_path 말고도 page_title, page_location, send_page_view 등을 보낼 수 있습니다.
  });
};

interface GTagEvent {
  action: string;
  category?: string;
  label?: string;
  value?: string;
}

export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

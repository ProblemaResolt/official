import { useEffect } from 'react';

const MetaTags = ({ title, description, keywords, ogImage, twitterSite, twitterCreator }) => {
  useEffect(() => {
    document.title = title ? `${title} | Portfolio` : 'Portfolio';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description || '');
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', keywords || '');

    // OGPタグ
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title ? `${title} | Portfolio` : 'Portfolio');
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description || '');
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', ogImage || '');
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', window.location.href);

    // Twitterカード
    document.querySelector('meta[name="twitter:card"]')?.setAttribute('content', 'summary_large_image');
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title ? `${title} | Portfolio` : 'Portfolio');
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description || '');
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', ogImage || '');
    document.querySelector('meta[name="twitter:site"]')?.setAttribute('content', twitterSite || '');
    document.querySelector('meta[name="twitter:creator"]')?.setAttribute('content', twitterCreator || '');
  }, [title, description, keywords, ogImage, twitterSite, twitterCreator]);

  return null;
};

export default MetaTags;

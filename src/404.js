const segments = location.pathname.replace(/^\/official\/?/, '').split('/');
sessionStorage.setItem('redirect', segments.join('/'));
window.location.href = '/official';

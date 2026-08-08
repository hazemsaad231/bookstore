// Declarations for side-effect CSS imports coming from npm packages (e.g. swiper).
// Without them some recent TypeScript versions raise ts(2882).
declare module 'swiper/css';
declare module 'swiper/css/*';
declare module '*.css';

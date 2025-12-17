export const getImgUrl = (posterPath) => {
    if (!posterPath) return 'https://placehold.co/150x225?text=No+Img';
    if (posterPath.startsWith('http')) return posterPath;
    // Remove '/api' from the base URL if it exists, as uploads are served from root '/uploads'
    const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : '';
    return `${baseUrl}${posterPath}`;
};

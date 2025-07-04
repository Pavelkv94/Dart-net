
export const getMediaSource = (path: string | undefined | null | File): string => {

    return `${import.meta.env.VITE_MEDIA_URL}/${path}`;
}
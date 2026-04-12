export const imgUrl = (name) => new URL(`../img/${name}`, import.meta.url).href;
export const awardUrl = (name) => new URL(`../image/${name}`, import.meta.url).href;
export const videoUrl = new URL('../bg.mp4', import.meta.url).href;
export const audioUrl = new URL('../yinyv.mp3', import.meta.url).href;

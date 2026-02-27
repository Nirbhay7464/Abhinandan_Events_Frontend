export function getVideoThumbnail(video: any) {
  if (!video?.url) return null;

  // 1️⃣ Manual thumbnail (Instagram case)
  if (video.thumbnail) {
    return video.thumbnail;
  }

  const url = video.url;

  // ================= YOUTUBE ID EXTRACTOR =================
  const extractYoutubeId = (url: string) => {
    try {
      const parsed = new URL(url);

      // youtu.be/VIDEO_ID
      if (parsed.hostname.includes("youtu.be")) {
        return parsed.pathname.split("/")[1];
      }

      // youtube.com/watch?v=VIDEO_ID
      const vParam = parsed.searchParams.get("v");
      if (vParam) return vParam;

      // youtube.com/shorts/VIDEO_ID
      if (parsed.pathname.includes("/shorts/")) {
        return parsed.pathname.split("/shorts/")[1].split("/")[0];
      }

      return null;
    } catch {
      return null;
    }
  };

  const videoId = extractYoutubeId(url);

  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  return null;
}
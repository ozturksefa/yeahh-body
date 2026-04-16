import { useState } from "react";
import { getYouTubeEmbedUrl, getYouTubeThumbnailUrl } from "./videoMap";

/**
 * Two-state tutorial preview:
 *   1. Poster — YouTube thumbnail + red play button + "Tutorial" label.
 *      Zero iframe cost until the user actually taps it.
 *   2. Playing — youtube-nocookie embed (privacy-respecting) with a close
 *      button that brings the poster back without navigating away.
 *
 * `videoId` is the 11-character YouTube ID. If the thumbnail 404s we just
 * hide the image and keep the label-only button so the user can still play.
 */
export default function VideoPreview({ videoId, title, compact = false }) {
  const [playing, setPlaying] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  if (!videoId) return null;

  if (playing) {
    return (
      <div className="video-preview video-preview-playing">
        <div className="video-preview-head">
          <span className="video-preview-title">📹 Tutorial{title ? ` · ${title}` : ""}</span>
          <button
            type="button"
            className="video-preview-close"
            onClick={() => setPlaying(false)}
            aria-label="Videoyu kapat"
          >
            ✕
          </button>
        </div>
        <div className="video-preview-frame-wrap">
          <iframe
            className="video-preview-frame"
            src={getYouTubeEmbedUrl(videoId)}
            title={title || "Tutorial video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`video-preview video-preview-thumb ${compact ? "video-preview-compact" : ""}`}
      onClick={() => setPlaying(true)}
      aria-label={title ? `${title} tutorial videosunu aç` : "Tutorial videosunu aç"}
    >
      {imgOk && (
        <img
          className="video-preview-img"
          src={getYouTubeThumbnailUrl(videoId)}
          alt=""
          loading="lazy"
          onError={() => setImgOk(false)}
        />
      )}
      <span className="video-preview-play" aria-hidden>▶</span>
      <span className="video-preview-label">📹 Tutorial Video</span>
    </button>
  );
}

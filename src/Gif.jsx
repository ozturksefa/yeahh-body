import { useState, useEffect } from "react";
import { getGifUrl, getYouTubeSearchUrl } from "./videoMap";

const MULTI_LABELS = {
  "Dumbbell 4 Ways Lateral Raise": ["Öne Kaldırma", "Yana Kaldırma", "Arkaya Kaldırma", "Çapraz Kaldırma"],
  "Machine Lat Pulldown": ["Makine", "Kablo"],
  "Assisted Pull Up": ["Makine Destekli", "Band Destekli"],
  "Incline Dumbbell Press": ["Dumbbell", "Barbell"],
  "Straight Arm Pulldown": ["Bar Attachment", "Rope Attachment"],
  "Incline Dumbbell Curl": ["Versiyon 1", "Versiyon 2"],
  "Leg Press": ["Önden Görünüm", "Yandan Görünüm"],
  "Machine Seated Leg Curl": ["Oturarak", "Yatarak"],
  "Standing Dumbbell Hammer Curl": ["Standart", "Cross Body"],
  "Dumbbell Goblet Squat": ["Dumbbell", "Kettlebell"],
  "Dumbbell Romanian Deadlift": ["Dumbbell", "Barbell"],
  "Standing Dumbbell Reverse Curl": ["Dumbbell", "Barbell"],
  "Dumbbell Deadlift": ["Dumbbell", "Barbell"],
};

function SingleGif({ url, label, exerciseName }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [src, setSrc] = useState(url);

  // Retry once on error with cache-bust
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
        setLoading(true);
        setSrc(url + "?r=" + Date.now());
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [error, url]);

  return (
    <div className="gif-box">
      {loading && !error && (
        <div className="gif-loading-spinner">
          <div className="spinner"></div>
          <span>Yükleniyor…</span>
        </div>
      )}
      {!error && (
        <img
          key={src}
          src={src}
          alt={label || ""}
          className="gif-img"
          loading="eager"
          style={{ opacity: loading ? 0 : 1 }}
          onLoad={() => setLoading(false)}
          onError={() => { setLoading(false); setError(true); }}
        />
      )}
      {error && exerciseName && (
        <YtFallback name={exerciseName} />
      )}
      {error && !exerciseName && (
        <div className="gif-error-fallback"><span>⚠️ GIF yüklenemedi</span></div>
      )}
      {label && !loading && !error && <div className="gif-label">{label}</div>}
    </div>
  );
}

function YtFallback({ name }) {
  const ytUrl = getYouTubeSearchUrl(name);
  return (
    <div className="gif-wrap gif-fallback">
      <a href={ytUrl} target="_blank" rel="noopener noreferrer" className="gif-yt-link">
        <span className="gif-yt-icon">▶</span>
        <span className="gif-yt-text">{name}<br/><small>YouTube'da izle</small></span>
      </a>
    </div>
  );
}

function ExerciseGif({ name }) {
  const gifUrl = getGifUrl(name);

  if (!gifUrl) {
    return <YtFallback name={name} />;
  }

  if (Array.isArray(gifUrl)) {
    const labels = MULTI_LABELS[name] || [];
    return (
      <div className="gif-wrap gif-multi">
        {gifUrl.map((url, i) => (
          <SingleGif key={`${name}-${url}-${i}`} url={url} label={labels[i] || null} exerciseName={i === 0 ? name : null} />
        ))}
      </div>
    );
  }

  return (
    <div className="gif-wrap">
      <SingleGif key={`${name}-${gifUrl}`} url={gifUrl} exerciseName={name} />
    </div>
  );
}

export default ExerciseGif;

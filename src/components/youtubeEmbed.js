import React from 'react';

// YoutubeEmbedコンポーネント
// props:
// - data: 動画情報の配列。各要素は{ title: string, url?: string, videoId?: string }形式であり、urlまたはvideoIdのいずれかを含む。
// - options: 動画再生のオプションを指定するオブジェクト。オプションは{ loop?: number, mute?: boolean, inline?: boolean, autoplay?: boolean }の形式で、デフォルトは空のオブジェクト
// - maxWidth: コンポーネントの最大幅（デフォルトは600px）
// - classContainer: コンテナーのクラス名（デフォルトは空文字列）
// - classTitle: タイトルのクラス名（デフォルトは空文字列）
// - classIframe: iframeのクラス名（デフォルトは空文字列）

const YoutubeEmbed = ({ data, options, maxWidth = 600, classContainer = "", classTitle = "", classIframe = "" }) => {
  // 動画情報が提供されない場合のデフォルト値
  const videoInfo = data || [];

  return (
    <>
      {/* 動画情報のマップ */}
      {videoInfo.map((video, index) => (
        <div key={index} className={`${classContainer}`} style={{ maxWidth: `${maxWidth}px` }}>
          {/* タイトル */}
          <h2 className={`${classTitle}`}>{video.title}</h2>
          {/* 動画の埋め込み */}
          <iframe
            width={`${options.width}`}
            height={`${options.height}`}
            className={`${classIframe}`}
            title={video.title}
            src={`https://www.youtube.com/embed/${getVideoId(video)}?${Object.entries(options).map(([key, value]) => `${key}=${value}`).join('&')}`}
            allow="accelerometer;  autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </>
  );
};

// 動画情報からビデオIDを取得する関数
const getVideoId = (video) => {
  if (video.url) {
    // URLが提供されている場合、ビデオIDを抽出
    const videoIdMatch = video.url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/);
    return videoIdMatch ? videoIdMatch[1] : "";
  } else if (video.videoId) {
    // videoIdが提供されている場合、そのまま返す
    return video.videoId;
  } else {
    return "";
  }
};

export default YoutubeEmbed;

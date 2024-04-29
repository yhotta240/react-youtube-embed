import React from 'react';

const YoutubeEmbed = ({ data, maxWidth = 600, classContainer = "", classTitle = "", classIframe = "" }) => {
  // 動画情報が提供されない場合のデフォルト値
  const videoInfo = data || [];

  return (
    <>
      {/* 動画情報のマップ */}
      {videoInfo.map((video, index) => (
        <div key={index} className={`mb-4 ${classContainer}`} style={{ maxWidth: `${maxWidth}px` }}>
          {/* タイトル */}
          <h2 className={`${classTitle}`}>{video.title}</h2>
          {/* 動画の埋め込み */}
          <iframe
            className={`${classIframe}`}
            title={video.title}
            src={`https://www.youtube.com/embed/${getVideoId(video)}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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

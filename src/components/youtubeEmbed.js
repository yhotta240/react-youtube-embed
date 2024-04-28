import React from 'react'

const YoutubeEmbed = ({ data, maxWidth = 512, maxHeight = 315, classTitle  }) => {
  const videoInfo = data || [];

  return (
    <div className=''>
      {
        videoInfo.map((video, index) => (
          <div key={index}
            style={{
              maxWidth: `${maxWidth}px`,
              maxHeight: `${maxHeight}px`,
              width: '100%', height: 'auto',
              position: 'relative',
              margin: '0 auto',
            }}
          > 
            <h2 className={classTitle}>{video.title}</h2>
            <div
              style={{
                width: '100%',
                paddingTop: 'calc(100% * 315 / 512)', // アスペクト比 512:315
                position: 'relative',
              }}
            >
              <iframe
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                }}
                title={video.title}
                src={`https://www.youtube.com/embed/${video.url.split('v=')[1].split('&')[0]}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default YoutubeEmbed


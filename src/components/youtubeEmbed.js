import React from 'react'

const YoutubeEmbed = ({ data, maxWidth = 600, classTitle }) => {
  const videoInfo = data || [];

  return (
    <>
      {
        videoInfo.map((video, index) => (
          <div key={index} className="my-5">

            <div
              className=" relative mx-auto"
              style={{ maxWidth: `${maxWidth}px` }}
            >
              <h2 className={`${classTitle}`}>{video.title}</h2>

              <iframe
                className=" w-full aspect-video"
                title={video.title}
                src={`https://www.youtube.com/embed/${video.url.split('v=')[1].split('&')[0]}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>

            </div>
          </div>
        ))
      }
    </>

  )

}

export default YoutubeEmbed


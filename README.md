
## 概要
この記事では、ReactでYouTube動画を埋め込むためのカスタムコンポーネントであるYoutubeEmbedを作成する方法を紹介します。このコンポーネントを使用することで、簡単にYouTube動画を表示し、アプリケーションに組み込むことができます。

## コンポーネントの機能

- YouTube動画の埋め込み
- タイトルの表示
- カスタムスタイリング（今回はTailwind cssを採用）
- 動画情報のURLまたはビデオIDの両方に対応

**対応している動画のURL形式について**
```
https://www.youtube.com/watch?v=VIDEO_ID　標準形式のURL
https://youtu.be/VIDEO_ID　短縮URL
https://www.youtube.com/embed/VIDEO_ID　埋め込みプレーヤーのURL
```


## デモ

https://react-youtube-embed.vercel.app/


## 使用例

### Propsの説明
| プロパティ名       | 説明                                                                              | タイプ           | デフォルト値 |
|-------------------|-----------------------------------------------------------------------------------|------------------|--------------|
| data              | YouTube動画の情報を含む配列。各要素はタイトルとURLまたはビデオIDを持つオブジェクト。   | array            | []           |
| options           | YouTube動画の再生オプションを指定します。                                            | array            | []           |
| maxWidth          | 埋め込みコンテナーの最大幅（ピクセル単位）。                                           | number           | 600          |
| classContainer    | コンテナー要素に適用するカスタムクラス。                                               | string           | ""           |
| classTitle        | タイトル要素に適用するカスタムクラス。                                                 | string           | ""           |
| classIframe       | 埋め込みiframeに適用するカスタムクラス。                                               | string           | ""           |

**optionsプロパティについて**
| オプション   | 説明                           | デフォルト値 |
|-------------|--------------------------------|--------------|
| loop        | ループ再生回数（0または正の整数、0は無限ループ） | 1         |
| mute        | ミュート（trueまたはfalse）         | false        |
| inline      | インライン再生（trueまたはfalse）   | false        |
| autoplay    | 自動再生（trueまたはfalse）         | false        |

```react:App.js
import React from 'react';
import YoutubeEmbed from './YoutubeEmbed';

const App = () => {
  // YouTube動画情報
  const youtubeData = [
    {
      title: "動画1",
      url: "https://www.youtube.com/watch?v=videoId1"
    },
    {
      title: "動画2",
      videoId: "videoId2"
    }
  ];
  
  // optionsプロパティ
  const options = {
    loop: 1,
    mute: false,
    inline: true,
    autoPlay: true,
    // width: 700,
    // height: 400,
  };
  
  return (
    <div>
      <h1>YouTube動画</h1>
      <div className='m-4' >
        <YoutubeEmbed
          data={youtubeData}
          options={options}
          maxWidth={600}
          classContainer={"my-6 relative mx-auto "}
          classTitle={"md:text-xl mb-2 font-bold"}
          classIframe={"w-full aspect-video"}
        ></YoutubeEmbed>
      </div>
    </div>
  );
};

export default App;

```
### YouTube動画情報の取得方法

YouTube動画の情報を取得する方法は主に3つあります。以下に、JavaScriptオブジェクトとJSONを使用した静的なデータ表現、そしてAPIやデータベースを活用して動的に情報を取得する方法です。

#### JavaScriptオブジェクト:
JavaScriptオブジェクトを使用してYouTube動画の情報を表現する場合、静的なデータを直接コードに組み込みます。
```React:youtubeData.js
const youtubeData = [
  {
    title: "動画1のタイトル",
    url: "https://www.youtube.com/watch?v=videoId1"
  },
  {
    title: "動画2のタイトル",
    videoId: "videoId2"
  }
];
```
各要素は、YouTube動画の情報を表すオブジェクトです。各オブジェクトには、`title`プロパティには動画のタイトルが、`url`または`videoId`プロパティにはそれぞれYouTube動画のURLまたはビデオIDが含まれます。



#### JSON形式:
JavaScriptオブジェクトと同じ情報を持ちます。
```json:youtubeData.json
[
  {
    "title": "動画1のタイトル",
    "url": "https://www.youtube.com/watch?v=videoId1"
  },
  {
    "title": "動画2のタイトル",
    "videoId": "videoId2"
  }
]

```
JSON形式のデータは、JavaScriptのオブジェクトとして解釈されることができます。

#### APIやデータベースを使用:
YouTube Data APIなどのAPIを使用すると、YouTubeから動画の情報を取得し、必要な情報を取得したり、検索したりすることができます。データベースを使用する場合は、動画の情報をデータベースに保存し、必要に応じてデータベースから取得します。


## YoutubeEmbedコンポーネントの説明
デフォルト値の設定とプロップスの使用<br>
クラスの適用とスタイリング<br>
動画情報の解析とビデオIDの取得<br>

```react:youtubeEmbed.js
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


```





## まとめ

この記事では、ReactでYouTube動画を簡単に埋め込むためのYoutubeEmbedコンポーネントを作成する方法を紹介しました。このコンポーネントを使用することで、動画の埋め込みやカスタマイズが容易になります。

https://github.com/yhotta240/react-youtube-embed

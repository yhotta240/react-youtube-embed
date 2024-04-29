
import './App.css';
import Header from './components/Header';
import YoutubeEmbed from './components/youtubeEmbed';
import youtubeData from './youtube_data.json';

function App() {

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
      <div className='mb-12'>
        <Header></Header>
      </div>
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
}

export default App;

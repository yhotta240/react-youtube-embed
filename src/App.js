
import './App.css';
import Header from './components/Header';
import YoutubeEmbed from './components/youtubeEmbed';
import youtubeData from './youtube_data.json';

function App() {

  return (
    <div>
      <div className='mb-12'>
        <Header></Header>
      </div>
      <div className='m-4' >
        <YoutubeEmbed
          data={youtubeData}
          maxWidth={600}
          classTitle={"md:text-xl mb-2 font-bold"}
        ></YoutubeEmbed>
      </div>
    </div>
  );
}

export default App;

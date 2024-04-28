
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
      <div className='' >
        <YoutubeEmbed data={youtubeData} classTitle={"text-xl mb-2"} ></YoutubeEmbed>
      </div>
    </div>
  );
}

export default App;

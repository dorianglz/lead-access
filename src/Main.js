import './style/App.css';
import Lead from './component/lead';
import Header from './component/header';

function MainPage() {
  return (
    <div className="App">
      <Header />
      <div className='body'>
        <div className='stat'>
          <h1>stat</h1>
        </div>
        <div className='filter'>
          <h1>filter</h1>
        </div>
        <div className='leads'>
          <Lead />
        </div>
      </div>
    </div>
  );
}

export default MainPage;

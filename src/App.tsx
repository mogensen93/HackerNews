import './App.scss';
import NavBar from './components/navigation/NavBar';
import PostsBanner from './components/post/PostsBanner';
import Posts from './components/post/Posts';

function App() {
  return (
    <div className="App">
      <header>
      </header>
      <NavBar/>
      <PostsBanner/>
      <Posts/>
    </div>
  );
}

export default App;

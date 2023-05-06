import Home from './components/home';
import Footer from './components/global-components/footer';
import Header from './components/global-components/header';
import { BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Home/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

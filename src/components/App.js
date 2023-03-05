import Navbar from "./Navbar";
import Footer from "./Footer";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import About from "./about/About";
import Map from "./map/Map";
import Stats from "./stats/Stats";
import PageNotFound from "./page-not-found/PageNotFound";

function App() {
  return (
    <div className="App">
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" exact element={ <Map/> } />
                <Route path="/about" element={ <About/> }/>
                <Route path="/stats" element={ <Stats/> } />
                <Route path="*" element={ <PageNotFound/> } />
            </Routes>
            <Footer />
        </Router>
    </div>
  );
}

export default App;

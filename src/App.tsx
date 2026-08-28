import "./App.css";
import BlockGenerator from "@/pages/BlockGenerator/BlockGenerator";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

function App() {
    return (
        <div className="App">
            <Header />
            <BlockGenerator />
            <Footer className="App__footer">
                VoxelLab • Инструмент для персональной разработки под VoxelCore Engine lorem
            </Footer>
        </div>
    );
}

export default App;

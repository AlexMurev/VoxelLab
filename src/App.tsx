import "./App.css";
import BlockGenerator from "@/pages/BlockGenerator/BlockGenerator";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { createHashRouter, Outlet, RouterProvider} from "react-router-dom";
import VcmEditor from "./pages/VcmEditor/VcmEditor";
import NotFound from "./pages/NotFound/NotFound";

export function Layout() {
    return (
        <div className="App">
            <Header />
            <Outlet />
            <Footer className="App__footer">
                VoxelLab • Инструмент для персональной разработки под VoxelCore Engine
            </Footer>
        </div>
    );
}

const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <BlockGenerator />,
            },
            {
                path: "vcm-editor",
                element: <VcmEditor />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;

}

export default App;

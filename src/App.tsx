import { Route, Routes } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import RouteGuard from './routes/RouteGuard';
import RootRedirect from './routes/RootRedirect';
import useAuthInit from './hooks/useAuthInit';
import CreatePlant from './pages/CreatePlant';

const App = () => {
    useAuthInit();

    return (
        <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            <Route
                path="/home"
                element={
                    <RouteGuard>
                        <Home />
                    </RouteGuard>
                }
            />
            <Route
                path="/create-plant"
                element={
                    <RouteGuard>
                        <CreatePlant />
                    </RouteGuard>
                }
            />
        </Routes>
    );
};

export default App;

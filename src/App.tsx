import { Route, Routes } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import RouteGuard from './routes/RouteGuard';
import RootRedirect from './routes/RootRedirect';
import useAuthInit from './hooks/useAuthInit';
import CreatePlant from './pages/CreatePlant';
import SearchPlant from './pages/SearchPlant';
import DetailPlant from './pages/DetailPlant';
import DetailMyPlant from './pages/DetailMyPlant';

const App = () => {
    useAuthInit();

    return (
        <div className="overflow-hidden grid grid-rows-[1fr_50px] h-full">
            <div className="h-full overflow-y-auto">
                <Routes>
                    <Route path="/" element={<RootRedirect />} />
                    <Route path="login" element={<Login />} />
                    <Route path="auth/callback" element={<AuthCallback />} />

                    <Route
                        path="/home"
                        element={
                            <RouteGuard>
                                <Home />
                            </RouteGuard>
                        }
                    />
                    <Route path="search" element={<SearchPlant />} />
                    <Route path="detail-plant/:plantId" element={<DetailPlant />} />
                    <Route
                        path="detail-my-plant/:plantName"
                        element={
                            <RouteGuard>
                                <DetailMyPlant />
                            </RouteGuard>
                        }
                    />
                    <Route
                        path="create-plant"
                        element={
                            <RouteGuard>
                                <CreatePlant />
                            </RouteGuard>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};

export default App;

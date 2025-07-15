import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from '../pages/Chat';
import Login from '../pages/Login';

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

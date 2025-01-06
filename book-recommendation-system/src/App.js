import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddBook from './pages/AddBook';

export default function App() {
    return (
        <Router>
            <nav className="bg-blue-600 text-white py-4">
                <div className="container mx-auto flex justify-center space-x-4">
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                    <Link to="/add" className="hover:underline">
                        Add Book
                    </Link>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddBook />} />
            </Routes>
        </Router>
    );
}

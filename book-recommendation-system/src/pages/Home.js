import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/books").then((response) => {
            setBooks(response.data);
        });
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(searchQuery) ||
            book.author.toLowerCase().includes(searchQuery) ||
            book.genre.toLowerCase().includes(searchQuery)
    );

    const renderBooks = (books) =>
        books.map((book) => (
            <div
                key={book.id}
                className="flex flex-col items-center p-4 shadow-md rounded-lg bg-white"
            >
                <img
                    src={book.coverImage || "https://via.placeholder.com/150"}
                    alt={book.title}
                    className="w-32 h-48 object-cover mb-2"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                />
                <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-sm text-gray-500">{book.genre}</p>
                <p className="text-yellow-500">{"★".repeat(book.rating)}</p>
            </div>
        ));

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Book Recommendations</h1>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search books by title, author, or genre"
                value={searchQuery}
                onChange={handleSearch}
                className="mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-4/5 md:w-1/2"
            />

            {/* Render Filtered Books */}
            <div className="w-4/5">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Books</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {filteredBooks.length > 0 ? (
                        renderBooks(filteredBooks)
                    ) : (
                        <p className="text-gray-500 col-span-full text-center">
                            No books found matching your search.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

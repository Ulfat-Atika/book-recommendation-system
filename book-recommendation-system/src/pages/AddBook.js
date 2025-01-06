import { useState } from 'react';
import axios from 'axios';

export default function AddBook() {
    const [form, setForm] = useState({
        title: '',
        author: '',
        genre: '',
        rating: '',
        coverImage: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/books', form)
            .then(() => {
                alert('Book added successfully!');
                setForm({
                    title: '',
                    author: '',
                    genre: '',
                    rating: '',
                    coverImage: '',
                });
            })
            .catch(() => alert('Failed to add book.'));
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
            <h1 className="text-4xl font-bold text-green-600 mb-6">Add a New Book</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6 w-3/4 md:w-1/2 flex flex-col"
            >
                <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="mb-4 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="author"
                    placeholder="Author"
                    value={form.author}
                    onChange={handleChange}
                    required
                    className="mb-4 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="genre"
                    placeholder="Genre"
                    value={form.genre}
                    onChange={handleChange}
                    required
                    className="mb-4 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="rating"
                    type="number"
                    placeholder="Rating"
                    value={form.rating}
                    onChange={handleChange}
                    required
                    className="mb-4 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="coverImage"
                    placeholder="Cover Image URL"
                    value={form.coverImage}
                    onChange={handleChange}
                    required
                    className="mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Book
                </button>
            </form>
        </div>
    );
}

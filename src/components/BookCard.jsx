import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <div className="book-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow stagger-item">
      <div className="overflow-hidden">
        <img 
          src={book.cover} 
          alt={`Copertina di ${book.title}`} 
          className="w-full h-48 object-cover transition-transform"
        />
      </div>
      <div className="p-4">
        <Link to={`/libro/${book.id}`}>
          <h3 className="font-bold text-lg hover:text-blue-600 transition-colors">{book.title}</h3>
        </Link>
        <p className="text-gray-600">{book.author}</p>
        <span className="badge inline-block mt-2">
          {book.category}
        </span>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Bookmark,
  Eye,
  Share2,
  FileText,
} from 'lucide-react';
import { useMedia } from '../../state/MediaContext';
import { UniversalMediaCard } from './UniversalMediaCard';

export const ReadingLibraryView: React.FC = () => {
  const { mediaItems, openAddMediaModal, openBookReader } = useMedia();
  const [search, setSearch] = useState('');

  const books = mediaItems.filter(
    (m) =>
      m.category === 'book' &&
      (m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] p-4 md:p-8 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <BookOpen size={22} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Reading Library</h1>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Google Drive PDF books, engineering manuals, whitepapers, and reading collections.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddMediaModal}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 flex items-center gap-2 active:scale-95 transition-all"
          >
            <Plus size={16} />
            <span>Add Book Link</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search books, authors, and whitepapers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <span className="text-xs text-[var(--text-secondary)] font-mono">
            {books.length} Book{books.length !== 1 ? 's' : ''} in Collection
          </span>
        </div>

        {/* Bookshelf View */}
        {books.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <BookOpen size={36} className="mx-auto text-white/20" />
            <h3 className="text-sm font-bold text-white">No books found</h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Click "+ Add Book Link" to paste Google Drive PDF and e-book sharing links.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {books.map((book) => (
              <div
                key={book.id}
                onClick={() => openBookReader(book)}
                className="p-4 rounded-[22px] bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-emerald-500/50 cursor-pointer transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black/60 border border-white/10 shadow-lg">
                    <img
                      src={book.thumbnailUrl}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Eye size={20} />
                      </div>
                    </div>
                    {book.pageCount && (
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-white/90">
                        {book.pageCount} pages
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 mt-1">
                      {book.description || 'Google Drive verified reading publication.'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                  <span>{book.collectionName ? `📁 ${book.collectionName}` : 'Anthology'}</span>
                  <button
                    type="button"
                    className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Read</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

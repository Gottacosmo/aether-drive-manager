import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  ExternalLink,
  Eye,
  Share2,
  Download,
  Folder,
} from 'lucide-react';
import { useMedia } from '../../state/MediaContext';
import { UniversalMediaCard } from './UniversalMediaCard';

export const DocumentLibraryView: React.FC = () => {
  const { mediaItems, openAddMediaModal, openBookReader, openShareModal } = useMedia();
  const [search, setSearch] = useState('');

  const documents = mediaItems.filter(
    (m) =>
      m.category === 'document' &&
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
              <div className="w-10 h-10 rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
                <FileText size={22} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Document Library</h1>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Google Docs, Spreadsheets, Presentations, architectural schematics, and technical specifications.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddMediaModal}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white shadow-lg shadow-cyan-600/30 flex items-center gap-2 active:scale-95 transition-all"
          >
            <Plus size={16} />
            <span>Add Document Link</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search specifications, contracts, and blueprints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <span className="text-xs text-[var(--text-secondary)] font-mono">
            {documents.length} Document{documents.length !== 1 ? 's' : ''} Stored
          </span>
        </div>

        {/* Document Grid */}
        {documents.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <FileText size={36} className="mx-auto text-white/20" />
            <h3 className="text-sm font-bold text-white">No documents found</h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Click "+ Add Document Link" to paste Google Docs, Sheets, and PDF links.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {documents.map((doc) => (
              <UniversalMediaCard key={doc.id} media={doc} layout="grid" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

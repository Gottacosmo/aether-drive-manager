import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  Plus,
  Users,
  Check,
  Smile,
  Film,
  Send,
  Share2,
} from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { useMedia } from '../../state/MediaContext';
import { UniversalMediaCard } from '../media/UniversalMediaCard';
import { GoogleDriveMediaItem } from '../../types/media';

interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  mediaItem?: GoogleDriveMediaItem;
  likes: number;
  commentsCount: number;
}

export const SocialFeedView: React.FC = () => {
  const { stories, contacts, setActiveModal, user } = useApp();
  const { mediaItems, openEmbedPicker, showToast } = useMedia();

  const [postText, setPostText] = useState('');
  const [attachedMedia, setAttachedMedia] = useState<GoogleDriveMediaItem | null>(null);

  // Community Posts pre-seeded with rich Google Drive media embeds
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: 'post_1',
      authorName: 'Alex Vance',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      timeAgo: '15m ago',
      content: 'Just launched our Friday Night 4K Cinema Watch Room! Anyone with the link can join the live sync room. Bring popcorn! 🍿🎥',
      mediaItem: mediaItems.find((m) => m.category === 'movie') || mediaItems[0],
      likes: 24,
      commentsCount: 6,
    },
    {
      id: 'post_2',
      authorName: 'Elena Rostova',
      authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      timeAgo: '2h ago',
      content: 'Deep work study session music track. Recorded with Rhodes piano and analog tape filter. Enjoy the binaural frequencies! 🎧✨',
      mediaItem: mediaItems.find((m) => m.category === 'music') || mediaItems[1],
      likes: 42,
      commentsCount: 11,
    },
    {
      id: 'post_3',
      authorName: 'Marcus Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      timeAgo: '4h ago',
      content: 'Recommended reading for our consensus algorithm refactoring: Designing Data-Intensive Applications. Open the embedded reader below directly.',
      mediaItem: mediaItems.find((m) => m.category === 'book') || mediaItems[2],
      likes: 31,
      commentsCount: 4,
    },
  ]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim() && !attachedMedia) return;

    const newPost: CommunityPost = {
      id: 'post_' + Date.now(),
      authorName: user.name,
      authorAvatar: user.avatar,
      timeAgo: 'Just now',
      content: postText.trim(),
      mediaItem: attachedMedia || undefined,
      likes: 1,
      commentsCount: 0,
    };

    setPosts([newPost, ...posts]);
    setPostText('');
    setAttachedMedia(null);
    showToast('Community post published sitewide!');
  };

  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] p-4 md:p-8 select-none">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Stories & Community Feed
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              24-hour status posts, shared Google Drive embeds, and group watch parties.
            </p>
          </div>

          <button
            onClick={() => setActiveModal('create_story')}
            className="glass-btn glass-btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5"
          >
            <Plus size={15} />
            <span>Post Story</span>
          </button>
        </div>

        {/* Stories Gallery Bar */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
            24-Hour Ephemeral Stories
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {stories.map((story) => (
              <div
                key={story.id}
                onClick={() => setActiveModal('stories')}
                className="relative h-64 rounded-[22px] overflow-hidden border border-white/10 group cursor-pointer shadow-lg hover:scale-[1.02] transition-transform"
              >
                <img
                  src={story.imageUrl}
                  alt={story.userName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-3 flex flex-col justify-between text-white">
                  <div className="flex items-center gap-2">
                    <img
                      src={story.userAvatar}
                      alt={story.userName}
                      className="w-8 h-8 rounded-full border border-white object-cover"
                    />
                    <span className="text-xs font-bold truncate">{story.userName}</span>
                  </div>

                  <div>
                    <p className="text-xs font-medium line-clamp-2">{story.caption}</p>
                    <span className="text-[10px] text-white/70 mt-1 block">
                      Expires in {Math.round((story.expiresAt - Date.now()) / 3600000)}h
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Post Composer with Google Drive Media Embedding */}
        <div className="p-4 md:p-5 rounded-[24px] glass-panel border border-[var(--border-subtle)] space-y-3 shadow-xl">
          <div className="flex items-start gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border border-white/10"
            />
            <div className="flex-1 space-y-2">
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Share a thought, review, or paste any Google Drive link..."
                rows={2}
                className="w-full bg-white/[0.04] p-3 rounded-xl border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500 resize-none"
              />

              {/* Attached Media Preview */}
              {attachedMedia && (
                <div className="relative rounded-xl overflow-hidden border border-blue-500/40 p-2 bg-blue-500/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={attachedMedia.thumbnailUrl}
                      alt={attachedMedia.title}
                      className="w-12 h-9 rounded-lg object-cover bg-black"
                    />
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-white truncate">{attachedMedia.title}</h5>
                      <span className="text-[10px] text-blue-300 capitalize">
                        Attached Google Drive {attachedMedia.category}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachedMedia(null)}
                    className="text-white/60 hover:text-rose-400 p-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Composer Toolbar */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => openEmbedPicker((item) => setAttachedMedia(item))}
                  className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-bold flex items-center gap-1.5 transition-colors border border-blue-500/30"
                >
                  <Film size={14} />
                  <span>Attach Saved Google Drive Media</span>
                </button>

                <button
                  type="button"
                  onClick={handleCreatePost}
                  disabled={!postText.trim() && !attachedMedia}
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-xs font-bold text-white shadow-md shadow-blue-600/30 flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <Send size={13} />
                  <span>Publish Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Community Posts Stream with Embedded Players */}
        <div className="space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            Community Posts & Media Discussions
          </h3>

          {posts.map((post) => (
            <div
              key={post.id}
              className="p-5 rounded-[24px] glass-panel border border-[var(--border-subtle)] space-y-4 shadow-xl select-none"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{post.authorName}</h4>
                    <span className="text-[10px] text-white/50">{post.timeAgo}</span>
                  </div>
                </div>
              </div>

              {/* Post Text */}
              <p className="text-xs text-white/90 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>

              {/* Embedded Interactive Media Card */}
              {post.mediaItem && (
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                  <UniversalMediaCard media={post.mediaItem} layout="grid" />
                </div>
              )}

              {/* Action Reactions */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="flex items-center gap-1.5 hover:text-rose-400 transition-colors"
                  >
                    <Heart size={15} className={post.likes > 0 ? 'fill-rose-500 text-rose-500' : ''} />
                    <span>{post.likes}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <MessageCircle size={15} />
                    <span>{post.commentsCount} comments</span>
                  </div>
                </div>

                <button
                  onClick={() => showToast('Post link copied to clipboard!')}
                  className="hover:text-white flex items-center gap-1"
                >
                  <Share2 size={14} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

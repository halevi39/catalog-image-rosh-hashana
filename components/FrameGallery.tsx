import { useState, useMemo } from 'react';
import { frames, Frame, FrameCategory } from '@/data/frames';
import { FilterBar } from '@/components/FilterBar';
import { FrameCard } from '@/components/FrameCard';
import { Lightbox } from '@/components/Lightbox';

export function FrameGallery() {
  const [activeFilter, setActiveFilter] = useState<FrameCategory>('horizontal-photo');
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);

  const filteredFrames = useMemo(() => {
    if (activeFilter === 'all') return frames;
    return frames.filter((frame) => frame.category === activeFilter);
  }, [activeFilter]);

  return (
    <div data-ev-id="ev_0f852d01fa" className="min-h-screen bg-gray-50" dir="rtl">
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        totalCount={frames.length}
        filteredCount={filteredFrames.length} />

      
      <main data-ev-id="ev_b7bb8a901e" className="max-w-7xl mx-auto px-4 py-8">
        <div data-ev-id="ev_fd8b61a4f6" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFrames.map((frame) =>
          <FrameCard
            key={frame.id}
            frame={frame}
            onClick={() => setSelectedFrame(frame)} />

          )}
        </div>

        {filteredFrames.length === 0 &&
        <div data-ev-id="ev_7c226e4da2" className="text-center py-16">
            <p data-ev-id="ev_222267e01e" className="text-gray-500 text-lg">לא נמצאו עיצובים בקטגוריה זו</p>
          </div>
        }
      </main>

      {selectedFrame &&
      <Lightbox
        frame={selectedFrame}
        frames={filteredFrames}
        onClose={() => setSelectedFrame(null)}
        onNavigate={setSelectedFrame} />

      }
    </div>);

}
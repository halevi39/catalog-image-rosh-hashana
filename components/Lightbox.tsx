import { useEffect, useCallback, useRef } from 'react';
import { X, ChevronRight, ChevronLeft, Mail } from 'lucide-react';
import { Frame } from '@/data/frames';

interface LightboxProps {
  frame: Frame;
  frames: Frame[];
  onClose: () => void;
  onNavigate: (frame: Frame) => void;
}

// WhatsApp icon component
function WhatsAppIcon({ className }: {className?: string;}) {
  return (
    <svg data-ev-id="ev_7853160adc"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}>

      <path data-ev-id="ev_31d83b9fa0" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>);

}

export function Lightbox({ frame, frames, onClose, onNavigate }: LightboxProps) {
  const currentIndex = frames.findIndex((f) => f.id === frame.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < frames.length - 1;

  // Touch swipe tracking
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goToPrev = useCallback(() => {
    if (hasPrev) {
      onNavigate(frames[currentIndex - 1]);
    }
  }, [hasPrev, currentIndex, frames, onNavigate]);

  const goToNext = useCallback(() => {
    if (hasNext) {
      onNavigate(frames[currentIndex + 1]);
    }
  }, [hasNext, currentIndex, frames, onNavigate]);

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  // Handle touch end - detect swipe
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Only trigger if horizontal swipe is greater than vertical (not scrolling)
    // and swipe distance is at least 50px
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX < 0) {
        // Swipe left → Next (RTL)
        goToNext();
      } else {
        // Swipe right → Previous (RTL)
        goToPrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Share via WhatsApp
  const shareWhatsApp = () => {
    const message = `היי, אני מעוניין/ת בעיצוב ${frame.code}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Share via Email
  const shareEmail = () => {
    const subject = `בקשה לעיצוב ${frame.code}`;
    const body = `שלום,\n\nאני מעוניין/ת בעיצוב ${frame.code}.\n\nתודה!`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToNext(); // RTL: left goes to next
      if (e.key === 'ArrowRight') goToPrev(); // RTL: right goes to prev
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, goToPrev, goToNext]);

  return (
    <div data-ev-id="ev_8cb71869ae"
    className="fixed inset-0 z-50 flex items-center justify-center"
    onClick={onClose}>

      {/* Backdrop */}
      <div data-ev-id="ev_d924247caa" className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Content */}
      <div data-ev-id="ev_684d43f9b7"
      className="relative z-10 flex items-center justify-center w-full h-full p-4"
      onClick={(e) => e.stopPropagation()}>

        {/* Navigation - Previous (appears on right for RTL) */}
        {/* Desktop/tablet: outside image, Mobile portrait: inside image */}
        <button data-ev-id="ev_d2f27908ca"
        onClick={goToPrev}
        disabled={!hasPrev}
        className={`absolute z-20 p-2 sm:p-3 rounded-full transition-colors
            right-2 sm:right-4 md:right-8 lg:right-16
            top-1/2 -translate-y-1/2
            bg-black/50 sm:bg-white/10 hover:bg-white/30
            ${!hasPrev ? 'opacity-30 cursor-not-allowed' : ''}`}
        aria-label="Previous design">

          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </button>

        {/* Image Container - with touch swipe support */}
        <div data-ev-id="ev_0df9d16303"
        className="relative flex flex-col items-center max-w-full max-h-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}>

          <img data-ev-id="ev_5244f42301"
          src={frame.src}
          alt={frame.name}
          className="max-w-[90vw] sm:max-w-[85vw] max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg shadow-2xl" />


          {/* Frame info - compact on mobile */}
          <div data-ev-id="ev_597d14085c" className="mt-3 flex flex-col items-center gap-2">
            <div data-ev-id="ev_8ebec148aa" className="bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
              <span data-ev-id="ev_2175168d0e" className="hidden sm:inline">{frame.name} • </span>
              <span data-ev-id="ev_217227e0bc" className="sm:hidden">{frame.code} • </span>
              {currentIndex + 1} / {frames.length}
            </div>

            {/* Share buttons */}
            <div data-ev-id="ev_3e69edee66" className="flex gap-3">
              <button data-ev-id="ev_6eb2329895"
              onClick={shareWhatsApp}
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors"
              aria-label="Share via WhatsApp">

                <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span data-ev-id="ev_fd8e82d2b9" className="hidden sm:inline">WhatsApp</span>
              </button>
              <button data-ev-id="ev_aa05479f8d"
              onClick={shareEmail}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors"
              aria-label="Share via Email">

                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span data-ev-id="ev_0dd7a1df90" className="hidden sm:inline">Email</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation - Next (appears on left for RTL) */}
        <button data-ev-id="ev_ca0b9327df"
        onClick={goToNext}
        disabled={!hasNext}
        className={`absolute z-20 p-2 sm:p-3 rounded-full transition-colors
            left-2 sm:left-4 md:left-8 lg:left-16
            top-1/2 -translate-y-1/2
            bg-black/50 sm:bg-white/10 hover:bg-white/30
            ${!hasNext ? 'opacity-30 cursor-not-allowed' : ''}`}
        aria-label="Next design">

          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </button>
      </div>

      {/* Close button */}
      <button data-ev-id="ev_d594628848"
      onClick={onClose}
      className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      aria-label="Close lightbox">

        <X className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </button>
    </div>);

}
import { Frame } from '@/data/frames';

interface FrameCardProps {
  frame: Frame;
  onClick: () => void;
}

export function FrameCard({ frame, onClick }: FrameCardProps) {
  const isVertical = frame.category === 'vertical-photo' || frame.category === 'vertical-name';

  return (
    <button data-ev-id="ev_8a2b5f88e0"
    onClick={onClick}
    className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">

      <div data-ev-id="ev_0f0ff0b496" className={`${isVertical ? 'aspect-[3/4]' : 'aspect-[4/3]'} overflow-hidden bg-gray-100`}>
        <img data-ev-id="ev_1f3485c64b"
        src={frame.src}
        alt={frame.name}
        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        loading="lazy" />

      </div>
      <div data-ev-id="ev_8b96c3d1eb" className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div data-ev-id="ev_7fe23a17cf" className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p data-ev-id="ev_8335f207f6" className="text-sm font-medium text-right">{frame.name}</p>
      </div>
      <div data-ev-id="ev_0aa105f5b7" className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-700">
        {frame.code}
      </div>
    </button>);

}
import { FrameCategory, categoryLabels, categories } from '@/data/frames';
import { Image, RectangleVertical, Baby, Type, StickyNote, Calendar, Check } from 'lucide-react';

interface FilterBarProps {
  activeFilter: FrameCategory;
  onFilterChange: (category: FrameCategory) => void;
  totalCount: number;
  filteredCount: number;
}

const categoryStyles: Record<Exclude<FrameCategory, 'all'>, {gradient: string;icon: React.ReactNode;}> = {
  'horizontal-photo': {
    gradient: 'from-pink-500 to-rose-500',
    icon: <Image className="w-6 h-6" />
  },
  'vertical-photo': {
    gradient: 'from-purple-500 to-violet-600',
    icon: <RectangleVertical className="w-6 h-6" />
  },
  'horizontal-name': {
    gradient: 'from-blue-500 to-cyan-500',
    icon: <Baby className="w-6 h-6" />
  },
  'vertical-name': {
    gradient: 'from-teal-500 to-emerald-500',
    icon: <Type className="w-6 h-6" />
  },
  'memo-board': {
    gradient: 'from-orange-500 to-amber-500',
    icon: <StickyNote className="w-6 h-6" />
  },
  'calendar-rules': {
    gradient: 'from-indigo-500 to-purple-600',
    icon: <Calendar className="w-6 h-6" />
  }
};

export function FilterBar({ activeFilter, onFilterChange, filteredCount }: FilterBarProps) {
  return (
    <div data-ev-id="ev_d711f711ec" className="bg-gradient-to-b from-gray-50 to-white py-8 border-b border-gray-100">
      <div data-ev-id="ev_57be6d8384" className="max-w-5xl mx-auto px-4">
        <h2 data-ev-id="ev_89b7dc5bcf" className="text-center text-2xl font-bold text-gray-800 mb-6">בחר קטגוריה</h2>
        
        <div data-ev-id="ev_99587c2283" className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => {
            const isActive = activeFilter === category;
            const style = categoryStyles[category];

            return (
              <button data-ev-id="ev_204d6696f8"
              key={category}
              onClick={() => onFilterChange(category)}
              className={`relative group overflow-hidden rounded-2xl p-5 text-white font-medium transition-all duration-300 
                  ${isActive ?
              'ring-4 ring-offset-2 ring-gray-400 scale-[1.02] shadow-xl' :
              'hover:scale-[1.03] hover:shadow-xl shadow-lg'}
                  bg-gradient-to-br ${
              style.gradient}
                `}>

                {/* Shine effect on hover */}
                <div data-ev-id="ev_d7e8b9910a" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                {/* Content */}
                <div data-ev-id="ev_611bdba25b" className="relative flex flex-col items-center gap-3">
                  <div data-ev-id="ev_7f59d2abd6" className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {style.icon}
                  </div>
                  <span data-ev-id="ev_8b984da120" className="text-sm md:text-base text-center leading-tight">
                    {categoryLabels[category]}
                  </span>
                </div>

                {/* Active checkmark */}
                {isActive &&
                <div data-ev-id="ev_776bcc120f" className="absolute top-2 left-2 bg-white rounded-full p-1 shadow-md">
                    <Check className="w-4 h-4 text-gray-800" />
                  </div>
                }
              </button>);

          })}
        </div>

        <p data-ev-id="ev_6f43fd1974" className="text-center text-sm text-gray-500 mt-6">
          {filteredCount} עיצובים בקטגוריה זו
        </p>
      </div>
    </div>);

}
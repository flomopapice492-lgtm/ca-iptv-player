import React from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { FiClock, FiTag } from 'react-icons/fi';

interface EPGGuideProps {
  programs: any[];
  selectedYear?: number;
  onYearChange?: (year: number) => void;
  loading?: boolean;
}

const EPGGuide: React.FC<EPGGuideProps> = ({
  programs,
  selectedYear = new Date().getFullYear(),
  onYearChange,
  loading = false,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 29 }, (_, i) => 1998 + i);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg">
      {/* Year Filter */}
      <div className="p-4 border-b border-gray-700">
        <p className="text-sm text-gray-400 mb-3">Filter by Year (1998-2026)</p>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => onYearChange?.(year)}
              className={`px-3 py-1 rounded text-sm whitespace-nowrap transition-colors ${
                selectedYear === year
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Programs Grid */}
      <div className="p-4 grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
        {programs.length > 0 ? (
          programs.map((program) => (
            <div
              key={program.id}
              className="program-item group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-white group-hover:text-red-500 transition-colors flex-1">
                  {program.title}
                </h4>
                {program.rating > 0 && (
                  <span className="ml-2 text-yellow-400 font-bold text-sm">
                    {program.rating}/10
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                {program.description}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <FiClock size={14} />
                  <span>
                    {format(new Date(program.start), 'MMM d, HH:mm')} -
                    {format(new Date(program.end), 'HH:mm')}
                  </span>
                </div>
                {program.category && (
                  <div className="flex items-center space-x-1">
                    <FiTag size={14} />
                    <span className="bg-gray-700 px-2 py-0.5 rounded">
                      {program.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>No programs found for this year</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EPGGuide;

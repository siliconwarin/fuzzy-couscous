import React from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';
import type { AdContent } from '@/types/quiz';

interface AdCardProps {
  ad: AdContent;
  hasAnswered: boolean;
  redflag?: string;
  type?: string;
  showRedflagInList?: boolean;
}

const Highlight = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span className={`bg-yellow-200 px-1 py-0.5 rounded ${className}`}>
    {children}
  </span>
);

const AdCard: React.FC<AdCardProps> = ({
  ad,
  hasAnswered,
  redflag,
  showRedflagInList = true,
}) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(1247);
  const { title, description, image } = ad;
  const contentList = (description || '')
    .split('\n')
    .filter((line: string) => line.trim() !== '');

  const shouldShowRedflagInList = showRedflagInList && title !== redflag;

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">AD</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {title}
            </h3>
            <p className="text-gray-500 text-xs">Sponsored • 2 ชั่วโมงที่แล้ว</p>
          </div>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-800 whitespace-pre-line mb-3">
          {contentList.map((line: string, idx: number) => (
            <React.Fragment key={idx}>
              {redflag && shouldShowRedflagInList && line.includes(redflag)
                ? line.split(redflag).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        hasAnswered ? (
                          <Highlight className="inline-block px-1">
                            {redflag}
                          </Highlight>
                        ) : (
                          <span className="text-blue-600 underline cursor-default select-text">
                            {redflag}
                          </span>
                        )
                      )}
                    </span>
                  ))
                : line}
              {idx < contentList.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
        {image && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img
              src={image}
              className="w-full h-auto max-h-64 object-cover"
              alt="Advertisement"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/placeholder.svg?height=320&width=600";
              }}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-3 border-t border-gray-100">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{likes.toLocaleString()}</span>
            </button>
            <button className="text-gray-600 hover:text-blue-500 flex items-center space-x-1">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">แสดงความคิดเห็น</span>
            </button>
            <button className="text-gray-600 hover:text-green-500">
              <Share className="w-5 h-5" />
            </button>
          </div>
          <button className="text-gray-600 hover:text-yellow-500">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdCard;

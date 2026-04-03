import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import type { Item } from '../types/index.js';

interface ItemCardProps {
  item: Item;
}

export const ItemCard = ({ item }: ItemCardProps) => {
  const getStatusBadge = () => {
    switch (item.status) {
      case 'available':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">대여가능</span>;
      case 'rented':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">대여중</span>;
      case 'unavailable':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">대여불가</span>;
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      tools: '공구/DIY',
      camping: '캠핑용품',
      kitchen: '주방기기',
      sports: '스포츠',
      baby: '유아용품',
      electronics: '전자기기',
      party: '파티용품',
      others: '기타',
    };
    return labels[category] || category;
  };

  return (
    <Link to={`/item/${item.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="relative">
          <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
          <div className="absolute top-2 right-2">{getStatusBadge()}</div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
            <MapPin size={14} />
            <span>{item.ownerBuilding}</span>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded">
              {getCategoryLabel(item.category)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900">{item.rating}</span>
              <span className="text-xs text-gray-500">({item.reviewCount})</span>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-indigo-600">{item.dailyPrice.toLocaleString()}원</p>
              <p className="text-xs text-gray-500">/ 일</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

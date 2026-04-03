import { useState } from 'react';
import { ItemCard } from '../components/ItemCard';
import { mockItems } from '../data/mockData';
import { Search, Filter } from 'lucide-react';

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: '전체' },
    { id: 'tools', label: '공구/DIY' },
    { id: 'camping', label: '캠핑용품' },
    { id: 'kitchen', label: '주방기기' },
    { id: 'sports', label: '스포츠' },
    { id: 'baby', label: '유아용품' },
    { id: 'electronics', label: '전자기기' },
  ];

  const filteredItems = mockItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">이웃과 함께 나누는 똑똑한 소비</h1>
        <p className="text-lg opacity-90">
          급하게 필요한 물건, 사기 전에 써보고 싶은 물건을 우리 단지 이웃과 공유하세요
        </p>
        <div className="mt-6 flex gap-6 text-sm">
          <div>
            <p className="text-2xl font-bold">523명</p>
            <p className="opacity-80">가입 주민</p>
          </div>
          <div>
            <p className="text-2xl font-bold">89건</p>
            <p className="opacity-80">누적 거래</p>
          </div>
          <div>
            <p className="text-2xl font-bold">94.5%</p>
            <p className="opacity-80">거래 성공률</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="물건 이름이나 설명으로 검색하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
        <Filter size={20} className="text-gray-600 flex-shrink-0" />
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">검색 결과가 없습니다</p>
        </div>
      )}
    </div>
  );
};

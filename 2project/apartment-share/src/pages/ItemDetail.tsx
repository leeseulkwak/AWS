import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { mockItems } from '../data/mockData';
import { Star, MapPin, Calendar, Shield, Camera, ArrowLeft } from 'lucide-react';

export const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pickupMethod, setPickupMethod] = useState<'doorknob' | 'parcel_box' | 'office'>('doorknob');

  const item = mockItems.find((item) => item.id === id);

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-gray-500">물건을 찾을 수 없습니다</p>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return days * item.dailyPrice;
  };

  const handleReservation = () => {
    alert('대여 신청이 완료되었습니다! 물건 주인의 승인을 기다려주세요.');
    navigate('/my-rentals');
  };

  const getConditionLabel = (condition: string) => {
    const labels: Record<string, string> = {
      excellent: '최상',
      good: '좋음',
      fair: '보통',
    };
    return labels[condition] || condition;
  };

  const pickupMethods = [
    { id: 'doorknob', label: '문고리 거래', description: '현관 문고리에 걸어두기' },
    { id: 'parcel_box', label: '무인택배함', description: '무인택배함 이용' },
    { id: 'office', label: '관리사무소', description: '관리사무소 맡기기' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} />
        <span>뒤로가기</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div>
          <img src={item.imageUrl} alt={item.title} className="w-full rounded-lg shadow-lg" />

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Camera className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">물건 상태 인증 시스템</h4>
                <p className="text-sm text-blue-800">
                  수령 시와 반납 시 물건의 상태를 사진으로 촬영하여 업로드합니다.
                  쏘카와 같이 파손 여부를 명확하게 확인할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Shield className="text-green-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-green-900 mb-1">삼성화재 보험 적용</h4>
                <p className="text-sm text-green-800">
                  모든 거래는 삼성화재 보험이 적용되어 분실이나 파손 시 보상받을 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{item.rating}</span>
                <span className="text-gray-500 text-sm">({item.reviewCount}개 리뷰)</span>
              </div>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                상태: {getConditionLabel(item.condition)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <MapPin size={18} />
              <span>{item.ownerBuilding} · {item.ownerName}님</span>
            </div>

            <p className="text-gray-700 mb-6">{item.description}</p>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-600">대여료</span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-indigo-600">{item.dailyPrice.toLocaleString()}원</p>
                  <p className="text-sm text-gray-500">/ 일</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar size={16} />
                    대여 시작일
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar size={16} />
                    대여 종료일
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">수령 방법</label>
                  <div className="space-y-2">
                    {pickupMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${
                          pickupMethod === method.id
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="pickupMethod"
                          value={method.id}
                          checked={pickupMethod === method.id}
                          onChange={(e) => setPickupMethod(e.target.value as any)}
                          className="mt-1"
                        />
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">{method.label}</p>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {startDate && endDate && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">예상 대여료</span>
                      <span className="text-xl font-bold text-gray-900">
                        {calculateTotalPrice().toLocaleString()}원
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1}일 대여
                    </p>
                  </div>
                )}

                <button
                  onClick={handleReservation}
                  disabled={!startDate || !endDate || item.status !== 'available'}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {item.status === 'available' ? '대여 신청하기' : '현재 대여 불가'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

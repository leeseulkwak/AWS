import { useState } from 'react';
import { mockRentals } from '../data/mockData';
import { Calendar, MapPin, Camera, CheckCircle, Clock } from 'lucide-react';

export const MyRentals = () => {
  const [activeTab, setActiveTab] = useState<'renting' | 'lending'>('renting');

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { label: string; className: string }> = {
      pending: { label: '승인 대기', className: 'bg-yellow-100 text-yellow-700' },
      approved: { label: '승인 완료', className: 'bg-blue-100 text-blue-700' },
      active: { label: '대여중', className: 'bg-green-100 text-green-700' },
      returned: { label: '반납 완료', className: 'bg-purple-100 text-purple-700' },
      completed: { label: '거래 완료', className: 'bg-gray-100 text-gray-700' },
      cancelled: { label: '취소됨', className: 'bg-red-100 text-red-700' },
    };
    const badge = badges[status] || { label: status, className: 'bg-gray-100 text-gray-700' };
    return <span className={`px-3 py-1 rounded-full text-sm font-medium ${badge.className}`}>{badge.label}</span>;
  };

  const getPickupMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      doorknob: '문고리 거래',
      parcel_box: '무인택배함',
      office: '관리사무소',
      direct: '직접 대면',
    };
    return labels[method] || method;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">내 대여 내역</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('renting')}
          className={`pb-3 px-4 font-semibold transition-colors ${
            activeTab === 'renting'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          내가 빌린 물건
        </button>
        <button
          onClick={() => setActiveTab('lending')}
          className={`pb-3 px-4 font-semibold transition-colors ${
            activeTab === 'lending'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          내가 빌려준 물건
        </button>
      </div>

      {/* Rental List */}
      <div className="space-y-4">
        {mockRentals.map((rental) => (
          <div key={rental.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex gap-6">
              {/* Image */}
              <img src={rental.itemImage} alt={rental.itemTitle} className="w-32 h-32 object-cover rounded-lg" />

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{rental.itemTitle}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={14} />
                      <span>{getPickupMethodLabel(rental.pickupMethod)} · {rental.pickupLocation}</span>
                    </div>
                  </div>
                  {getStatusBadge(rental.status)}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <span>
                      {rental.startDate} ~ {rental.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    {activeTab === 'renting' ? (
                      <>
                        <span className="font-medium">대여자:</span>
                        <span>{rental.ownerName}</span>
                      </>
                    ) : (
                      <>
                        <span className="font-medium">빌린 사람:</span>
                        <span>{rental.renterName}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-indigo-600">{rental.totalPrice.toLocaleString()}원</div>

                  {/* Action Buttons based on status */}
                  <div className="flex gap-2">
                    {rental.status === 'approved' && (
                      <button className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Camera size={16} />
                        <span>수령 확인</span>
                      </button>
                    )}
                    {rental.status === 'active' && (
                      <button className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        <Camera size={16} />
                        <span>반납하기</span>
                      </button>
                    )}
                    {rental.status === 'returned' && activeTab === 'lending' && (
                      <button className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <CheckCircle size={16} />
                        <span>반납 확인</span>
                      </button>
                    )}
                    {rental.status === 'completed' && (
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        리뷰 작성
                      </button>
                    )}
                    {rental.status === 'pending' && activeTab === 'lending' && (
                      <>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          승인
                        </button>
                        <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                          거절
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Photo Upload Info */}
                {(rental.status === 'active' || rental.status === 'completed') && rental.pickupImages && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Camera size={14} />
                      <span className="font-medium">수령 시 사진 인증 완료</span>
                    </div>
                    {rental.returnImages && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={14} className="text-green-600" />
                        <span className="font-medium text-green-600">반납 시 사진 인증 완료</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {mockRentals.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <Clock size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">대여 내역이 없습니다</p>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <h3 className="font-semibold text-indigo-900 mb-3">사진 인증 안내</h3>
        <ul className="space-y-2 text-sm text-indigo-800">
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">1.</span>
            <span>물건을 수령할 때 물건의 전체 모습과 세부 상태를 촬영해주세요</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">2.</span>
            <span>반납할 때도 동일하게 사진을 촬영해주세요</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">3.</span>
            <span>파손이나 분실 발생 시 삼성화재 보험으로 보상받을 수 있습니다</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

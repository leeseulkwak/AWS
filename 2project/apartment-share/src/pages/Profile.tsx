import { mockUser } from '../data/mockData';
import { Star, MapPin, ShieldCheck, Package, Award } from 'lucide-react';

export const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">마이페이지</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-600">
            {mockUser.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{mockUser.name}</h2>
              {mockUser.verified && (
                <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  <ShieldCheck size={14} />
                  <span>입주민 인증</span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <MapPin size={16} />
              <span>
                {mockUser.apartment} {mockUser.building} {mockUser.unit}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">{mockUser.rating}</span>
                <span className="text-gray-500 text-sm">({mockUser.reviewCount}개 리뷰)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">대여한 물건</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">빌려준 물건</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">32,500</p>
              <p className="text-sm text-gray-600">절약한 금액</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">활동 통계</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">거래 성공률</span>
              <span className="font-semibold text-gray-900">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">리뷰 작성률</span>
              <span className="font-semibold text-gray-900">95%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">반납 정시율</span>
              <span className="font-semibold text-gray-900">98%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '98%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">획득한 뱃지</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="text-yellow-600" size={32} />
            </div>
            <p className="font-medium text-gray-900 text-sm">첫 거래</p>
            <p className="text-xs text-gray-500">2026-03-15</p>
          </div>

          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="text-blue-600" size={32} />
            </div>
            <p className="font-medium text-gray-900 text-sm">리뷰 마스터</p>
            <p className="text-xs text-gray-500">리뷰 10개 작성</p>
          </div>

          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Package className="text-green-600" size={32} />
            </div>
            <p className="font-medium text-gray-900 text-sm">나눔의 달인</p>
            <p className="text-xs text-gray-500">5회 대여</p>
          </div>

          <div className="text-center p-4 border border-gray-200 rounded-lg opacity-50">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="text-gray-400" size={32} />
            </div>
            <p className="font-medium text-gray-900 text-sm">완벽주의자</p>
            <p className="text-xs text-gray-500">파손 0건 달성</p>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 받은 리뷰</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-indigo-500 pl-4">
            <div className="flex items-center gap-2 mb-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">5.0</span>
              <span className="text-gray-500 text-sm">이영희님</span>
            </div>
            <p className="text-gray-700 text-sm">
              깨끗하게 사용해주시고 약속 시간도 잘 지켜주셨습니다. 감사합니다!
            </p>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4">
            <div className="flex items-center gap-2 mb-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">5.0</span>
              <span className="text-gray-500 text-sm">박민수님</span>
            </div>
            <p className="text-gray-700 text-sm">
              정말 필요한 물건을 빌려주셔서 큰 도움이 되었습니다. 다음에도 이용하고 싶어요.
            </p>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4">
            <div className="flex items-center gap-2 mb-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">4.5</span>
              <span className="text-gray-500 text-sm">최지원님</span>
            </div>
            <p className="text-gray-700 text-sm">
              친절하고 물건 관리도 잘 되어있습니다. 추천합니다!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import { mockKPIData } from '../data/mockData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, Users, ShoppingCart, BarChart3, Shield, AlertCircle } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const KPIDashboard = () => {
  const kpi = mockKPIData;

  const dauChartData = {
    labels: kpi.dailyActiveUsers.map((d) => d.date),
    datasets: [
      {
        label: '일일 활성 사용자 (DAU)',
        data: kpi.dailyActiveUsers.map((d) => d.count),
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const categoryChartData = {
    labels: kpi.categoryDistribution.map((c) => c.category),
    datasets: [
      {
        label: '카테고리별 거래 건수',
        data: kpi.categoryDistribution.map((c) => c.count),
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(14, 165, 233, 0.8)',
        ],
      },
    ],
  };

  const transactionTrendData = {
    labels: kpi.transactionTrend.map((t) => t.date),
    datasets: [
      {
        label: '주간 거래 건수',
        data: kpi.transactionTrend.map((t) => t.transactions),
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
      },
    ],
  };

  const metrics = [
    {
      label: '일일 활성 사용자 (DAU)',
      value: kpi.dau,
      unit: '명',
      icon: Users,
      color: 'bg-blue-500',
      change: '+12.3%',
    },
    {
      label: '월간 활성 사용자 (MAU)',
      value: kpi.mau,
      unit: '명',
      icon: Users,
      color: 'bg-indigo-500',
      change: '+8.7%',
    },
    {
      label: '총 거래 건수',
      value: kpi.totalTransactions,
      unit: '건',
      icon: ShoppingCart,
      color: 'bg-purple-500',
      change: '+23.4%',
    },
    {
      label: '거래 성공률',
      value: kpi.successRate,
      unit: '%',
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+2.1%',
    },
    {
      label: '평균 대여 기간',
      value: kpi.averageRentalDays,
      unit: '일',
      icon: BarChart3,
      color: 'bg-yellow-500',
      change: '-0.3일',
    },
    {
      label: '재방문 사용자 비율',
      value: kpi.repeatUserRate,
      unit: '%',
      icon: TrendingUp,
      color: 'bg-pink-500',
      change: '+5.6%',
    },
    {
      label: '이웃 간 거래 비율',
      value: kpi.neighborTransactionRate,
      unit: '%',
      icon: Users,
      color: 'bg-cyan-500',
      change: '+3.2%',
    },
    {
      label: '리뷰 작성률',
      value: kpi.reviewRate,
      unit: '%',
      icon: BarChart3,
      color: 'bg-orange-500',
      change: '+7.8%',
    },
    {
      label: '평균 거래액',
      value: kpi.averageRevenue.toLocaleString(),
      unit: '원',
      icon: ShoppingCart,
      color: 'bg-emerald-500',
      change: '+11.2%',
    },
    {
      label: '보험 청구율',
      value: kpi.insuranceClaimRate,
      unit: '%',
      icon: Shield,
      color: 'bg-red-500',
      change: '-0.5%',
    },
    {
      label: '물건 파손율',
      value: kpi.damageRate,
      unit: '%',
      icon: AlertCircle,
      color: 'bg-gray-500',
      change: '-0.3%',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">베타 테스트 KPI 대시보드</h1>
        <p className="text-gray-600">실시간 지표를 확인하고 서비스 성과를 분석하세요</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${metric.color} p-3 rounded-lg`}>
                <metric.icon className="text-white" size={24} />
              </div>
              <span className="text-sm text-green-600 font-medium">{metric.change}</span>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">{metric.label}</h3>
            <p className="text-2xl font-bold text-gray-900">
              {metric.value}
              <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">일일 활성 사용자 추이</h2>
          <Line
            data={dauChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">카테고리별 거래 분포</h2>
          <Doughnut
            data={categoryChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">주간 거래 건수 추이</h2>
        <Bar
          data={transactionTrendData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
            },
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">주요 인사이트</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <p className="text-gray-700">
              <strong>거래 성공률 94.5%</strong>로 베타 테스트 목표(90%) 초과 달성. 입주민 인증 시스템이
              신뢰도 향상에 기여
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <p className="text-gray-700">
              <strong>공구/DIY 카테고리</strong>가 전체 거래의 31%로 가장 높은 수요. 캠핑용품(25%)이 그 다음
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <p className="text-gray-700">
              <strong>재방문율 67.8%</strong>로 커뮤니티 활성화 성공. 이웃 간 거래 비율도 82.3%로 높게 유지
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <p className="text-gray-700">
              <strong>물건 파손율 2.3%</strong>로 낮은 수준 유지. 사진 인증 시스템과 보험 적용이 효과적
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
            <p className="text-gray-700">
              <strong>리뷰 작성률 91.2%</strong>로 높은 참여도. 품질 관리와 커뮤니티 신뢰 구축에 기여
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">다음 단계 제안</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="font-semibold text-gray-900 mb-1">확장 준비</h3>
            <p className="text-gray-600">
              현재 3개 아파트 523명 → 10개 아파트 2,000명 목표로 확장 테스트 진행
            </p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold text-gray-900 mb-1">카테고리 확대</h3>
            <p className="text-gray-600">
              전자제품, 가전제품 등 고가 품목 추가. 보험 범위 확대 및 손상 관리 프로세스 강화
            </p>
          </div>
          <div className="border-l-4 border-pink-500 pl-4">
            <h3 className="font-semib-strong text-gray-900 mb-1">마케팅 제휴</h3>
            <p className="text-gray-600">
              "대여 후 구매" 연계 시스템 구축. 제조사/판매사와 제휴하여 구매 전환 시 할인 제공
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

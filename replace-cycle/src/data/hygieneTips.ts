export interface HygieneTip {
  name: string;
  icon: string;
  category: string;
  type: '교체' | '세탁';
  intervalDays: number;
  tip: string;
}

export const HYGIENE_TIPS: HygieneTip[] = [
  // 침실
  { name: '베개 속',       icon: '🛌', category: '침실', type: '교체', intervalDays: 730,  tip: '베개 속에는 땀과 피지가 스며들어 2년이 지나면 무게의 10%가 먼지진드기와 배설물로 채워집니다. 세탁으로는 제거되지 않아요.' },
  { name: '매트리스 커버', icon: '🛏️', category: '침실', type: '세탁', intervalDays: 180,  tip: '성인은 하룻밤에 약 200ml의 땀을 흘립니다. 6개월에 한 번은 세탁하지 않으면 먼지진드기 번식의 온상이 됩니다.' },
  { name: '베개 커버',     icon: '🌙', category: '침실', type: '세탁', intervalDays: 7,    tip: '베개 커버에는 피부 각질·피지가 매일 쌓입니다. 1주일 이상 사용하면 피부 트러블과 모공 막힘의 원인이 될 수 있어요.' },
  { name: '이불 커버',     icon: '🧸', category: '침실', type: '세탁', intervalDays: 14,   tip: '이불 커버는 수면 중 흘린 땀과 각질이 직접 닿는 곳입니다. 2주에 한 번 세탁하면 피부 건강에 도움이 돼요.' },
  { name: '침실 커튼',     icon: '🪟', category: '침실', type: '세탁', intervalDays: 180,  tip: '커튼은 먼지와 집먼지진드기의 서식지입니다. 6개월에 한 번 세탁하지 않으면 수면 중 알레르기를 유발할 수 있어요.' },
  { name: '매트리스',      icon: '💤', category: '침실', type: '교체', intervalDays: 2920, tip: '매트리스는 8년이 지나면 스프링 탄성이 저하되고 내부에 먼지진드기가 크게 늘어납니다. 허리 통증이 생기면 교체 시기예요.' },

  // 거실
  { name: '소파 쿠션 커버', icon: '🛋️', category: '거실', type: '세탁', intervalDays: 30,  tip: '소파 쿠션은 피부와 가장 오래 맞닿는 패브릭 중 하나입니다. 한 달에 한 번 세탁하지 않으면 집먼지진드기 수가 급격히 늘어납니다.' },
  { name: '에어컨 필터',    icon: '❄️', category: '거실', type: '교체', intervalDays: 30,  tip: '에어컨 필터가 막히면 곰팡이·세균이 바람을 타고 실내로 퍼집니다. 가동 중에는 2주~1달마다 교체가 필요합니다.' },
  { name: '공기청정기 필터',icon: '🌬️', category: '거실', type: '교체', intervalDays: 180, tip: '헤파 필터는 포화 상태가 되면 오히려 오염 물질을 다시 내뿜습니다. 제조사 권장 주기인 6개월을 넘기지 마세요.' },
  { name: '거실 카펫',      icon: '🧶', category: '거실', type: '세탁', intervalDays: 180, tip: '카펫 1㎡당 먼지진드기가 최대 10만 마리까지 서식할 수 있습니다. 6개월마다 세탁하고 2~3년마다 교체를 권장해요.' },
  { name: '청소기 필터',    icon: '🧹', category: '거실', type: '교체', intervalDays: 90,  tip: '청소기 필터가 막히면 흡입한 먼지가 다시 실내로 배출됩니다. 3개월마다 교체해야 청소 효율이 유지됩니다.' },
  { name: '방향제',         icon: '🌸', category: '거실', type: '교체', intervalDays: 60,  tip: '방향제가 다 소진된 후 방치하면 용기 안에 곰팡이가 생길 수 있습니다. 2개월을 기준으로 교체해 주세요.' },

  // 욕실
  { name: '칫솔',        icon: '🪥', category: '욕실', type: '교체', intervalDays: 90,  tip: '칫솔모가 벌어지기 전에도 3개월이 지나면 세균이 최대 수백만 마리까지 번식합니다. 감기·구내염 후에는 즉시 교체하세요.' },
  { name: '욕실 매트',   icon: '🚿', category: '욕실', type: '교체', intervalDays: 180, tip: '욕실 매트는 항상 습한 상태라 곰팡이와 세균이 번식하기 가장 쉬운 곳입니다. 6개월~1년마다 교체가 권장됩니다.' },
  { name: '샤워 커튼',   icon: '🛁', category: '욕실', type: '교체', intervalDays: 180, tip: '샤워 커튼 안쪽에는 습기로 인한 핑크 곰팡이가 빠르게 증식합니다. 육안으로 보이지 않아도 6개월마다 교체하는 게 좋습니다.' },
  { name: '수건',        icon: '🧺', category: '욕실', type: '교체', intervalDays: 365, tip: '수건은 매번 세탁해도 1~2년이 지나면 섬유 사이에 세균이 잔류합니다. 냄새가 나거나 흡수력이 떨어지면 교체 신호예요.' },
  { name: '면도기 날',   icon: '🪒', category: '욕실', type: '교체', intervalDays: 14,  tip: '면도기 날은 5~7회 사용 후 무뎌지며 세균이 번식합니다. 2주마다 교체하면 피부 자극과 면도 후 트러블을 줄일 수 있어요.' },
  { name: '샤워 헤드 필터', icon: '💧', category: '욕실', type: '교체', intervalDays: 90, tip: '샤워 헤드 필터에는 석회질과 세균이 쌓여 피부·두피 트러블을 유발합니다. 3개월마다 교체해 깨끗한 물을 사용하세요.' },
  { name: '변기 솔',     icon: '🚽', category: '욕실', type: '교체', intervalDays: 180, tip: '변기 솔은 사용 후 물기가 남아 세균이 빠르게 번식합니다. 6개월마다 교체하고 사용 후 건조 보관하는 것이 중요해요.' },

  // 부엌
  { name: '도마',        icon: '🔪', category: '부엌', type: '교체', intervalDays: 365, tip: '도마의 칼집 안은 세척이 닿지 않아 살모넬라·대장균이 잔존합니다. 눈에 보이는 홈이 깊어지면 반드시 교체해야 합니다.' },
  { name: '행주',        icon: '🧻', category: '부엌', type: '교체', intervalDays: 30,  tip: '행주는 주방에서 가장 세균이 많은 물건 중 하나입니다. 한 달에 한 번은 새것으로 교체하는 것이 권장됩니다.' },
  { name: '냉장고 탈취제', icon: '🧊', category: '부엌', type: '교체', intervalDays: 90, tip: '탈취제 효과가 사라지면 냉장고 안 식품에 냄새와 세균이 교차 오염됩니다. 3개월마다 교체해 식품 안전을 지키세요.' },
  { name: '정수기 필터', icon: '🚰', category: '부엌', type: '교체', intervalDays: 180, tip: '정수기 필터 교체 시기를 놓치면 오히려 오염된 물이 나올 수 있습니다. 제조사 권장 주기(보통 6개월)를 꼭 지키세요.' },
  { name: '수세미',      icon: '🧽', category: '부엌', type: '교체', intervalDays: 14,  tip: '주방 수세미는 가정에서 세균이 가장 많은 물건입니다. 2주마다 교체하지 않으면 닦을수록 세균을 퍼뜨리는 셈이 돼요.' },
  { name: '후드 필터',   icon: '🍳', category: '부엌', type: '교체', intervalDays: 90,  tip: '후드 필터에 기름때가 쌓이면 환기 효율이 떨어지고 화재 위험이 높아집니다. 3개월마다 교체 또는 세척이 필요해요.' },
  { name: '프라이팬',    icon: '🥘', category: '부엌', type: '교체', intervalDays: 730, tip: '테플론 코팅 프라이팬은 2년이 지나거나 코팅이 벗겨지면 유해물질이 음식에 섞일 수 있습니다. 스크래치가 생기면 즉시 교체하세요.' },

  // 자동차
  { name: '엔진 오일',      icon: '🛢️', category: '자동차', type: '교체', intervalDays: 180,  tip: '엔진 오일은 6개월 또는 5,000~10,000km마다 교체가 권장됩니다. 교체 시기를 넘기면 엔진 마모가 급격히 진행돼요.' },
  { name: '에어컨 필터 (차)', icon: '🚗', category: '자동차', type: '교체', intervalDays: 365,  tip: '차량 에어컨 필터는 1년 또는 15,000km마다 교체하지 않으면 곰팡이·세균이 실내로 유입됩니다. 환절기 전에 점검하세요.' },
  { name: '와이퍼',         icon: '🌧️', category: '자동차', type: '교체', intervalDays: 365,  tip: '와이퍼 고무가 노화되면 빗물이 제대로 닦이지 않아 시야 확보가 어렵습니다. 1년마다 또는 줄무늬가 생기면 교체하세요.' },
  { name: '타이어',         icon: '⚙️', category: '자동차', type: '교체', intervalDays: 1825, tip: '타이어는 5년 또는 40,000~60,000km마다 교체를 권장합니다. 트레드 깊이가 1.6mm 이하면 제동 거리가 크게 늘어나요.' },
  { name: '브레이크 패드',  icon: '🛑', category: '자동차', type: '교체', intervalDays: 730,  tip: '브레이크 패드는 2년 또는 30,000~40,000km마다 점검해야 합니다. 제동 시 소음이 나면 즉시 교체 신호예요.' },
  { name: '배터리',         icon: '🔋', category: '자동차', type: '교체', intervalDays: 1095, tip: '차량 배터리 수명은 보통 3~5년입니다. 3년이 지나면 겨울 전 사전 점검해 갑작스러운 방전을 예방하세요.' },
  { name: '에어 필터',      icon: '💨', category: '자동차', type: '교체', intervalDays: 365,  tip: '엔진 에어 필터가 막히면 연비가 나빠지고 출력이 저하됩니다. 1년 또는 15,000km마다 교체가 권장됩니다.' },
];

import { useState, useMemo } from 'react';
import type { ConsumableItem, ItemWithStatus } from './types';
import { enrichItem } from './utils/cycleUtils';
import { useItems } from './hooks/useItems';
import { useNotifications } from './hooks/useNotifications';
import { useMoveInDate } from './hooks/useMoveInDate';
import { ItemCard } from './components/ItemCard';
import { ItemForm } from './components/ItemForm';
import { EmptyState } from './components/EmptyState';
import { HygieneTipCard } from './components/HygieneTipCard';
import { Toast } from './components/Toast';
import { CalendarView } from './components/CalendarView';
import { HYGIENE_TIPS } from './data/hygieneTips';
import type { HygieneTip } from './data/hygieneTips';
import './App.css';

const TABS = ['전체', '침실', '거실', '욕실', '부엌', '자동차'];
const TAB_CATEGORIES = ['침실', '거실', '욕실', '부엌', '자동차'];

const sortByUrgency = (a: ItemWithStatus, b: ItemWithStatus): number => {
  const statusOrder: Record<string, number> = { overdue: 0, due: 1, soon: 2, ok: 3, completed: 4 };
  const orderDiff = statusOrder[a.status]! - statusOrder[b.status]!;
  if (orderDiff !== 0) return orderDiff;
  return a.daysRemaining - b.daysRemaining;
};

const App = () => {
  const { items, addItem, updateItem, deleteItem, markReplaced } = useItems();
  const { permission, requestPermission } = useNotifications(items);
  const { elapsed, setMoveInDate } = useMoveInDate();
  const [showMoveInPicker, setShowMoveInPicker] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ConsumableItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('전체');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastCompletedItem, setLastCompletedItem] = useState<{ id: string; prevDate: string } | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const enrichedItems = useMemo<ItemWithStatus[]>(
    () => items.map(enrichItem).sort(sortByUrgency),
    [items],
  );

  const pagedItems = useMemo(() => {
    let filtered = activeTab === '전체' ? enrichedItems : enrichedItems.filter((i) => i.category === activeTab);

    if (searchQuery.trim()) {
      filtered = filtered.filter((i) =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [enrichedItems, activeTab, searchQuery]);

  const visibleTips = useMemo(() => {
    const addedNames = new Set(items.map((i) => i.name));
    const tipsForTab = activeTab === '전체'
      ? HYGIENE_TIPS
      : HYGIENE_TIPS.filter((t) => t.category === activeTab);
    return tipsForTab.filter((t) => !addedNames.has(t.name));
  }, [items, activeTab]);

  const groupedTips = useMemo(() => {
    if (activeTab !== '전체') return null;
    return TAB_CATEGORIES
      .map((cat) => ({ category: cat, tips: visibleTips.filter((t) => t.category === cat) }))
      .filter((g) => g.tips.length > 0);
  }, [activeTab, visibleTips]);

  const handleSave = (data: Omit<ConsumableItem, 'id' | 'createdAt'>) => {
    if (editingItem) {
      updateItem(editingItem.id, data);
    } else {
      addItem(data);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item: ItemWithStatus) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (deleteConfirmId === id) {
      deleteItem(id);
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(id);
      setTimeout(() => setDeleteConfirmId(null), 3000);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleOpenForm = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleAddFromTip = (tip: HygieneTip) => {
    addItem({
      name: tip.name,
      icon: tip.icon,
      category: tip.category,
      type: tip.type,
      intervalDays: tip.intervalDays,
      lastReplacedAt: new Date().toISOString().split('T')[0],
    });
  };

  const handleNotificationRequest = async () => {
    await requestPermission();
  };

  const handleMarkReplaced = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setLastCompletedItem({
        id: item.id,
        prevDate: item.lastReplacedAt,
      });
      markReplaced(id);
      setToastMessage(`${item.name} ${item.type === '교체' ? '교체' : '세탁'} 완료했어요!`);
    }
  };

  const handleUndoComplete = () => {
    if (lastCompletedItem) {
      updateItem(lastCompletedItem.id, {
        lastReplacedAt: lastCompletedItem.prevDate,
        completedAt: undefined,
      });
      setLastCompletedItem(null);
      setToastMessage(null);
    }
  };

  const toggleCategoryExpansion = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const overdueCount = enrichedItems.filter(
    (i) => i.status === 'overdue' || i.status === 'due',
  ).length;

  const completedTodayCount = enrichedItems.filter(
    (i) => i.status === 'completed',
  ).length;


  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__content">
          <div>
            <h1 className="app-header__title">살림노트</h1>
            <p className="app-header__subtitle">교체·세탁 주기 관리</p>
            {elapsed ? (
              <button className="move-in-badge" onClick={() => setShowMoveInPicker(true)}>
                🏠 {elapsed}
              </button>
            ) : (
              <button className="move-in-badge move-in-badge--empty" onClick={() => setShowMoveInPicker(true)}>
                🏠 입주일 설정하기
              </button>
            )}
          </div>

          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-card__icon">📦</div>
              <div className="stat-card__content">
                <div className="stat-card__value">{items.length}</div>
                <div className="stat-card__label">전체</div>
              </div>
            </div>
            <div className="stat-card stat-card--success">
              <div className="stat-card__icon">✅</div>
              <div className="stat-card__content">
                <div className="stat-card__value">{completedTodayCount}</div>
                <div className="stat-card__label">오늘 완료</div>
              </div>
            </div>
            <div className="stat-card stat-card--warning">
              <div className="stat-card__icon">⚠️</div>
              <div className="stat-card__content">
                <div className="stat-card__value">{overdueCount}</div>
                <div className="stat-card__label">교체 필요</div>
              </div>
            </div>
          </div>

          {showSearch && (
            <div className="search-bar">
              <span className="search-bar__icon">🔍</span>
              <input
                type="text"
                className="search-bar__input"
                placeholder="항목 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button
                  className="search-bar__clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="검색어 지우기"
                >
                  ✕
                </button>
              )}
              <button
                className="search-bar__close"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
                aria-label="검색 닫기"
              >
                ✕
              </button>
            </div>
          )}

          <div className="app-header__actions">
            <button
              className={`btn btn--ghost btn--sm${showSearch ? ' btn--active' : ''}`}
              onClick={() => setShowSearch(!showSearch)}
              title="검색"
            >
              🔍
            </button>
            <button
              className="btn btn--ghost btn--sm"
              onClick={() => setShowCalendar(true)}
              title="캘린더"
            >
              📅
            </button>
            {permission !== 'granted' && (
              <button
                className="btn btn--ghost btn--sm"
                onClick={handleNotificationRequest}
                title="알림 허용"
              >
                🔔
              </button>
            )}
          </div>
        </div>
        {overdueCount > 0 && (
          <div className="overdue-banner">⚠️ 교체가 필요한 소모품 {overdueCount}개</div>
        )}
        <div className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`tab-btn${activeTab === tab ? ' tab-btn--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <main className="app-main">
        {items.length === 0 ? (
          <EmptyState onAddItem={handleOpenForm} />
        ) : pagedItems.length === 0 ? (
          <div className="tab-empty-state">
            <div className="tab-empty-state__icon">🏠</div>
            <p className="tab-empty-state__question">
              지금 사용하고 있는 {activeTab} 소모품은<br />언제 교체하셨어요?
            </p>
            <button className="btn btn--primary" onClick={handleOpenForm}>
              + {activeTab} 소모품 추가
            </button>
          </div>
        ) : (
          <div className="item-list">
            {pagedItems.map((item) => (
              <div key={item.id}>
                {deleteConfirmId === item.id && (
                  <div className="delete-confirm">
                    정말 삭제하시겠어요? 한 번 더 삭제 버튼을 누르세요.
                  </div>
                )}
                <ItemCard
                  item={item}
                  onMarkReplaced={handleMarkReplaced}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
        {visibleTips.length > 0 && (
          <div className="hygiene-tips-section">
            <p className="hygiene-tips-section__label">🍯 교체 주기 꿀팁</p>
            {groupedTips
              ? groupedTips.map((group) => {
                  const isExpanded = expandedCategories.has(group.category);
                  const displayTips = isExpanded ? group.tips : group.tips.slice(0, 3);
                  const hasMore = group.tips.length > 3;

                  return (
                    <div key={group.category}>
                      <p className="hygiene-tips-section__group-header">{group.category}</p>
                      {displayTips.map((tip) => (
                        <HygieneTipCard key={tip.name} tip={tip} onAdd={handleAddFromTip} />
                      ))}
                      {hasMore && (
                        <button
                          className="btn btn--secondary btn--sm show-more-btn"
                          onClick={() => toggleCategoryExpansion(group.category)}
                        >
                          {isExpanded ? '접기 ▲' : `더보기 (${group.tips.length - 3}개 더) ▼`}
                        </button>
                      )}
                    </div>
                  );
                })
              : (() => {
                  const isExpanded = expandedCategories.has(activeTab);
                  const displayTips = isExpanded ? visibleTips : visibleTips.slice(0, 3);
                  const hasMore = visibleTips.length > 3;

                  return (
                    <>
                      {displayTips.map((tip) => (
                        <HygieneTipCard key={tip.name} tip={tip} onAdd={handleAddFromTip} />
                      ))}
                      {hasMore && (
                        <button
                          className="btn btn--secondary btn--sm show-more-btn"
                          onClick={() => toggleCategoryExpansion(activeTab)}
                        >
                          {isExpanded ? '접기 ▲' : `더보기 (${visibleTips.length - 3}개 더) ▼`}
                        </button>
                      )}
                    </>
                  );
                })()
            }
          </div>
        )}
      </main>

      {showMoveInPicker && (
        <div className="modal-backdrop" onClick={() => setShowMoveInPicker(false)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h2 className="modal__title">입주일 설정</h2>
              <button className="btn-icon" onClick={() => setShowMoveInPicker(false)}>✕</button>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="move-in-date">입주한 날짜</label>
              <input
                id="move-in-date"
                className="form-input"
                type="date"
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  if (e.target.value) {
                    setMoveInDate(e.target.value);
                    setShowMoveInPicker(false);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <ItemForm
          key={editingItem?.id ?? 'new'}
          item={editingItem}
          defaultCategory={activeTab === '전체' ? '부엌' : activeTab}
          onSave={handleSave}
          onClose={handleCloseForm}
        />
      )}

      {showCalendar && (
        <div className="modal-backdrop" onClick={() => setShowCalendar(false)}>
          <div className="modal modal--wide" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h2 className="modal__title">📅 교체 일정</h2>
              <button className="btn-icon" onClick={() => setShowCalendar(false)}>✕</button>
            </div>
            <div className="modal__body">
              <CalendarView items={enrichedItems} />
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
          onUndo={lastCompletedItem ? handleUndoComplete : undefined}
        />
      )}

      <button
        className="fab"
        onClick={handleOpenForm}
        aria-label="소모품 추가"
      >
        <span className="fab__icon">+</span>
        <span className="fab__tooltip">소모품 추가</span>
      </button>
    </div>
  );
};

export default App;

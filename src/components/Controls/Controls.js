import React from 'react';

const Controls = ({
                      selectedCategory,
                      setSelectedCategory,
                      unitPriceOrder,
                      setUnitPriceOrder,
                      totalRevenueOrder,
                      setTotalRevenueOrder,
                      toggleTable,
                      showTable,
                      categories,
                      setPaginationEnabled,
                      paginationEnabled
                  }) => {
    const handleCheckboxChange = () => {
        setPaginationEnabled(!paginationEnabled);
    };

    return (
        <div className="controls">
            <label>
                Выбор категории
                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                    <option value="Все категории">Все категории</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </label>
            <br /><br />
            <label>
                Сортировка по цене одной штуки
                <select value={unitPriceOrder} onChange={e => setUnitPriceOrder(e.target.value)}>
                    <option value="none">Без сортировки</option>
                    <option value="ascending">По возрастанию</option>
                    <option value="descending">По убыванию</option>
                </select>
            </label>
            <br /><br />
            <label>
                Сортировка по общей выручке
                <select value={totalRevenueOrder} onChange={e => setTotalRevenueOrder(e.target.value)}>
                    <option value="none">Без сортировки</option>
                    <option value="ascending">По возрастанию</option>
                    <option value="descending">По убыванию</option>
                </select>
            </label>
            <br /><br />
            <label>
                Пагинация
                <input
                    type="checkbox"
                    checked={paginationEnabled}
                    onChange={handleCheckboxChange}
                />
            </label>
            <br /><br />
            <input type="button" value={showTable ? "Скрыть таблицу" : "Показать таблицу"} onClick={toggleTable} />
        </div>
    );
};

export default Controls;

const getHistoryUseCase = require("../../services/usecases/getHistoryUseCase");

const typeLabels = {
  running: "跑步",
  cycling: "骑车",
  strength: "力量训练",
  plank: "平板支撑",
  pushups: "俯卧撑",
  custom: "其他"
};

const buildFitnessSummary = (entry) => {
  const label = typeLabels[entry.type] || "训练";
  const caloriesText = entry.calories ? ` / ${entry.calories} 千卡` : "";
  if (entry.duration) {
    return `${label} ${entry.duration} 分钟${caloriesText}`;
  }
  if (entry.count) {
    return `${label} ${entry.count} 次${caloriesText}`;
  }
  return caloriesText ? `${label}${caloriesText}` : label;
};

const buildBodySummary = (entry) => {
  const parts = [];
  if (entry.weight) {
    parts.push(`体重 ${entry.weight}斤`);
  }
  if (entry.waistline) {
    parts.push(`腰围 ${entry.waistline}cm`);
  }
  return parts.join(" / ") || "暂无身体数据";
};

Page({
  data: {
    filters: [
      { label: "近 7 天", value: "7d" },
      { label: "本月", value: "month" },
      { label: "全部", value: "all" }
    ],
    activeFilter: "7d",
    fitnessList: [],
    bodyList: []
  },
  onShow() {
    this.loadEntries();
  },
  loadEntries() {
    const { fitnessEntries, bodyEntries } = getHistoryUseCase.execute({
      range: this.data.activeFilter
    });
    const fitnessList = fitnessEntries.map((entry) => ({
        id: entry.id,
        date: entry.date,
        title: buildFitnessSummary(entry),
        label: entry.date
      }))
      .sort((a, b) => (a.date > b.date ? -1 : 1));

    const bodyList = bodyEntries.map((entry) => ({
        id: entry.id,
        date: entry.date,
        title: buildBodySummary(entry),
        label: entry.date
      }))
      .sort((a, b) => (a.date > b.date ? -1 : 1));

    this.setData({ fitnessList, bodyList });
  },
  onFilterChange(event) {
    const value = event.currentTarget.dataset.value;
    this.setData({ activeFilter: value }, () => this.loadEntries());
  },
  goToFitnessDetail(event) {
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/index?kind=fitness&id=${id}`
    });
  },
  goToBodyDetail(event) {
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/index?kind=body&id=${id}`
    });
  },
  goToLog() {
    wx.switchTab({
      url: "/pages/log/index"
    });
  },
  goHome() {
    wx.switchTab({
      url: "/pages/home/index"
    });
  }
});

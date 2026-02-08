const {
  FITNESS_KEY,
  BODY_KEY,
  getEntries
} = require("../../utils/storage");
const { isWithinDays, isSameMonth } = require("../../utils/date");

const typeLabels = {
  running: "跑步",
  cycling: "骑车",
  strength: "力量训练",
  plank: "平板支撑",
  pushups: "俯卧撑",
  custom: "其他"
};

const buildSummary = (fitnessEntry) => {
  if (!fitnessEntry) return "暂无健身记录";
  const label = typeLabels[fitnessEntry.type] || "训练";
  const caloriesText = fitnessEntry.calories ? ` / ${fitnessEntry.calories} 千卡` : "";
  if (fitnessEntry.duration) {
    return `${label} ${fitnessEntry.duration} 分钟${caloriesText}`;
  }
  if (fitnessEntry.count) {
    return `${label} ${fitnessEntry.count} 次${caloriesText}`;
  }
  return caloriesText ? `${label}${caloriesText}` : label;
};

const buildBodyMeta = (bodyEntry) => {
  if (!bodyEntry) return "暂无身体数据";
  const parts = [];
  if (bodyEntry.weight) {
    parts.push(`体重 ${bodyEntry.weight}斤`);
  }
  if (bodyEntry.waistline) {
    parts.push(`腰围 ${bodyEntry.waistline}cm`);
  }
  return parts.join(" / ") || "暂无身体数据";
};

const filterByRange = (date, range) => {
  if (range === "7d") return isWithinDays(date, 7);
  if (range === "month") return isSameMonth(date);
  return true;
};

Page({
  data: {
    filters: [
      { label: "近 7 天", value: "7d" },
      { label: "本月", value: "month" },
      { label: "全部", value: "all" }
    ],
    activeFilter: "7d",
    listPreview: []
  },
  onShow() {
    this.loadEntries();
  },
  loadEntries() {
    const fitnessEntries = getEntries(FITNESS_KEY);
    const bodyEntries = getEntries(BODY_KEY);
    const grouped = new Map();

    fitnessEntries.forEach((entry) => {
      if (!filterByRange(entry.date, this.data.activeFilter)) return;
      if (!grouped.has(entry.date)) grouped.set(entry.date, {});
      grouped.get(entry.date).fitness = entry;
    });

    bodyEntries.forEach((entry) => {
      if (!filterByRange(entry.date, this.data.activeFilter)) return;
      if (!grouped.has(entry.date)) grouped.set(entry.date, {});
      grouped.get(entry.date).body = entry;
    });

    const listPreview = Array.from(grouped.entries())
      .map(([date, data]) => ({
        date,
        title: date,
        subtitle: buildSummary(data.fitness),
        meta: buildBodyMeta(data.body)
      }))
      .sort((a, b) => (a.date > b.date ? -1 : 1));

    this.setData({ listPreview });
  },
  onFilterChange(event) {
    const value = event.currentTarget.dataset.value;
    this.setData({ activeFilter: value }, () => this.loadEntries());
  },
  goToDetail(event) {
    const date = event.currentTarget.dataset.date;
    wx.navigateTo({
      url: `/pages/detail/index?date=${date}`
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

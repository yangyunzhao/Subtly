const getHistoryUseCase = require("../../services/usecases/getHistoryUseCase");
const { getToday } = require("../../utils/date");

const hasEntryForDate = (entries, date) => {
  return entries.some((entry) => entry.date === date);
};

const countEntriesForDate = (entries, date) => {
  return entries.filter((entry) => entry.date === date).length;
};

Page({
  data: {
    today: "",
    fitnessStatus: "暂无记录",
    bodyStatus: "暂无记录"
  },
  async onShow() {
    const today = getToday();
    try {
      const { fitnessEntries, bodyEntries } = await getHistoryUseCase.execute({ range: "all" });
      const fitnessCount = countEntriesForDate(fitnessEntries, today);
      const bodyCount = countEntriesForDate(bodyEntries, today);
      this.setData({
        today,
        fitnessStatus: fitnessCount ? `已记录 ${fitnessCount} 条` : "未记录",
        bodyStatus: bodyCount ? `已记录 ${bodyCount} 条` : "未记录"
      });
    } catch (error) {
      wx.showToast({
        title: error.message || "加载失败，请稍后重试",
        icon: "none"
      });
    }
  },
  goToLog() {
    wx.switchTab({
      url: "/pages/log/index"
    })
  },
  goToHistory() {
    wx.switchTab({
      url: "/pages/history/index"
    })
  }
})

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
  onShow() {
    const today = getToday();
    getHistoryUseCase.execute({ range: "all" }).then(({ fitnessEntries, bodyEntries }) => {
      const fitnessCount = countEntriesForDate(fitnessEntries, today);
      const bodyCount = countEntriesForDate(bodyEntries, today);
      this.setData({
        today,
        fitnessStatus: fitnessCount ? `已记录 ${fitnessCount} 条` : "未记录",
        bodyStatus: bodyCount ? `已记录 ${bodyCount} 条` : "未记录"
      });
    });
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

const { FITNESS_KEY, BODY_KEY, getEntries } = require("../../utils/storage");
const { getToday } = require("../../utils/date");

const hasEntryForDate = (entries, date) => {
  return entries.some((entry) => entry.date === date);
};

Page({
  data: {
    today: "",
    fitnessStatus: "暂无记录",
    bodyStatus: "暂无记录"
  },
  onShow() {
    const today = getToday();
    const fitnessEntries = getEntries(FITNESS_KEY);
    const bodyEntries = getEntries(BODY_KEY);
    this.setData({
      today,
      fitnessStatus: hasEntryForDate(fitnessEntries, today) ? "已记录" : "未记录",
      bodyStatus: hasEntryForDate(bodyEntries, today) ? "已记录" : "未记录"
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
  },
  goToDetail() {
    const date = this.data.today || getToday();
    wx.navigateTo({
      url: `/pages/detail/index?date=${date}`
    });
  }
})

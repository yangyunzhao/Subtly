Page({
  data: {},
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
    wx.navigateTo({
      url: "/pages/detail/index"
    })
  }
})

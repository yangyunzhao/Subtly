Page({
  data: {},
  goToLog() {
    wx.navigateTo({
      url: "/pages/log/index"
    })
  },
  goToHistory() {
    wx.navigateTo({
      url: "/pages/history/index"
    })
  },
  goToDetail() {
    wx.navigateTo({
      url: "/pages/detail/index"
    })
  }
})

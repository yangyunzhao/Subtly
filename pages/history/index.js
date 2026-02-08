Page({
  data: {
    listPreview: [
      {
        title: "2024-04-10",
        subtitle: "跑步 30 分钟",
        meta: "体重 70.2kg"
      },
      {
        title: "2024-04-09",
        subtitle: "力量训练 45 分钟",
        meta: "腰围 82.5cm"
      }
    ]
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

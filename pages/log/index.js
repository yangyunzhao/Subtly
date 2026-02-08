const getToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

Page({
  data: {
    workoutTypes: ["跑步", "骑车", "力量训练", "平板支撑", "俯卧撑", "其他"],
    form: {
      date: "",
      typeIndex: 0,
      duration: "",
      count: "",
      notes: "",
      weight: "",
      waistline: ""
    }
  },
  onLoad() {
    this.setData({
      "form.date": getToday()
    });
  },
  onDateChange(event) {
    this.setData({
      "form.date": event.detail.value
    });
  },
  onTypeChange(event) {
    this.setData({
      "form.typeIndex": Number(event.detail.value)
    });
  },
  onInputChange(event) {
    const field = event.currentTarget.dataset.field;
    this.setData({
      [`form.${field}`]: event.detail.value
    });
  },
  onSubmit() {
    const { form, workoutTypes } = this.data;
    if (!form.date) {
      wx.showToast({
        title: "请先选择日期",
        icon: "none"
      });
      return;
    }
    const preview = `日期 ${form.date}，项目 ${workoutTypes[form.typeIndex]}`;
    wx.showToast({
      title: preview,
      icon: "none",
      duration: 2000
    });
  },
  goHome() {
    wx.switchTab({
      url: "/pages/home/index"
    });
  }
});

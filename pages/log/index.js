const {
  FITNESS_KEY,
  BODY_KEY,
  upsertEntry
} = require("../../utils/storage");
const { getToday } = require("../../utils/date");

const workoutOptions = [
  { label: "跑步", value: "running" },
  { label: "骑车", value: "cycling" },
  { label: "力量训练", value: "strength" },
  { label: "平板支撑", value: "plank" },
  { label: "俯卧撑", value: "pushups" },
  { label: "其他", value: "custom" }
];

Page({
  data: {
    workoutTypes: workoutOptions.map((item) => item.label),
    form: {
      date: "",
      typeIndex: 0,
      duration: "",
      count: "",
      calories: "",
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
  onSaveFitness() {
    const { form } = this.data;
    if (!form.date) {
      wx.showToast({
        title: "请先选择日期",
        icon: "none"
      });
      return;
    }
    if (!form.duration && !form.count) {
      wx.showToast({
        title: "请至少填写时长或次数",
        icon: "none"
      });
      return;
    }

    const now = Date.now().toString();
    const fitnessEntry = {
      id: now,
      date: form.date,
      type: workoutOptions[form.typeIndex].value,
      duration: form.duration ? Number(form.duration) : 0,
      count: form.count ? Number(form.count) : 0,
      calories: form.calories ? Number(form.calories) : 0,
      notes: form.notes || ""
    };
    upsertEntry(FITNESS_KEY, fitnessEntry);

    wx.showToast({
      title: "健身记录已保存",
      icon: "success",
      duration: 1500
    });
    setTimeout(() => {
      wx.switchTab({
        url: "/pages/history/index"
      });
    }, 500);
  },
  onSaveBody() {
    const { form } = this.data;
    if (!form.date) {
      wx.showToast({
        title: "请先选择日期",
        icon: "none"
      });
      return;
    }
    if (!form.weight && !form.waistline) {
      wx.showToast({
        title: "请至少填写体重或腰围",
        icon: "none"
      });
      return;
    }
    const now = Date.now().toString();
    const bodyEntry = {
      id: `${now}-body`,
      date: form.date,
      weight: form.weight ? Number(form.weight) : 0,
      waistline: form.waistline ? Number(form.waistline) : 0
    };
    upsertEntry(BODY_KEY, bodyEntry);
    wx.showToast({
      title: "身体数据已保存",
      icon: "success",
      duration: 1500
    });
    setTimeout(() => {
      wx.switchTab({
        url: "/pages/history/index"
      });
    }, 500);
  },
  goHome() {
    wx.switchTab({
      url: "/pages/home/index"
    });
  }
});

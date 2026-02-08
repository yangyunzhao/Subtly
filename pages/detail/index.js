const {
  FITNESS_KEY,
  BODY_KEY,
  getEntries,
  upsertEntry,
  deleteEntry
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

const findByDate = (entries, date) => {
  return entries.find((entry) => entry.date === date);
};

Page({
  data: {
    workoutTypes: workoutOptions.map((item) => item.label),
    fitnessId: "",
    bodyId: "",
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
  onLoad(options) {
    const date = options.date || getToday();
    this.setData({
      "form.date": date
    });
  },
  onShow() {
    this.loadEntries();
  },
  loadEntries() {
    const date = this.data.form.date;
    const fitnessEntry = findByDate(getEntries(FITNESS_KEY), date);
    const bodyEntry = findByDate(getEntries(BODY_KEY), date);
    const typeIndex = Math.max(
      0,
      workoutOptions.findIndex((item) => item.value === (fitnessEntry && fitnessEntry.type))
    );

    this.setData({
      fitnessId: fitnessEntry ? fitnessEntry.id : "",
      bodyId: bodyEntry ? bodyEntry.id : "",
      form: {
        date,
        typeIndex,
        duration: fitnessEntry && fitnessEntry.duration ? String(fitnessEntry.duration) : "",
        count: fitnessEntry && fitnessEntry.count ? String(fitnessEntry.count) : "",
        notes: fitnessEntry ? fitnessEntry.notes : "",
        weight: bodyEntry && bodyEntry.weight ? String(bodyEntry.weight) : "",
        waistline: bodyEntry && bodyEntry.waistline ? String(bodyEntry.waistline) : ""
      }
    });
  },
  onDateChange(event) {
    this.setData(
      {
        "form.date": event.detail.value
      },
      () => this.loadEntries()
    );
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
  onSave() {
    const { form, fitnessId, bodyId } = this.data;
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

    const fitnessEntry = {
      id: fitnessId || Date.now().toString(),
      date: form.date,
      type: workoutOptions[form.typeIndex].value,
      duration: form.duration ? Number(form.duration) : 0,
      count: form.count ? Number(form.count) : 0,
      notes: form.notes || ""
    };
    upsertEntry(FITNESS_KEY, fitnessEntry);

    if (form.weight || form.waistline) {
      const bodyEntry = {
        id: bodyId || `${fitnessEntry.id}-body`,
        date: form.date,
        weight: form.weight ? Number(form.weight) : 0,
        waistline: form.waistline ? Number(form.waistline) : 0
      };
      upsertEntry(BODY_KEY, bodyEntry);
    } else if (bodyId) {
      deleteEntry(BODY_KEY, bodyId);
    }

    wx.showToast({
      title: "已保存",
      icon: "success"
    });
  },
  onDelete() {
    const { fitnessId, bodyId } = this.data;
    wx.showModal({
      title: "确认删除",
      content: "删除后不可恢复，确定要删除吗？",
      success: (res) => {
        if (!res.confirm) return;
        if (fitnessId) deleteEntry(FITNESS_KEY, fitnessId);
        if (bodyId) deleteEntry(BODY_KEY, bodyId);
        wx.switchTab({
          url: "/pages/history/index"
        });
      }
    });
  },
  goHome() {
    wx.switchTab({
      url: "/pages/home/index"
    });
  }
});

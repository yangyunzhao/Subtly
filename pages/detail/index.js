const {
  FITNESS_KEY,
  BODY_KEY,
  getEntries,
  getEntryById,
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
    kind: "fitness",
    fitnessId: "",
    bodyId: "",
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
  onLoad(options) {
    const date = options.date || getToday();
    this.setData({
      kind: options.kind || "fitness",
      fitnessId: options.kind === "fitness" ? options.id || "" : "",
      bodyId: options.kind === "body" ? options.id || "" : "",
      "form.date": date
    });
  },
  onShow() {
    this.loadEntries();
  },
  loadEntries() {
    const date = this.data.form.date;
    const fitnessEntry = this.data.fitnessId
      ? getEntryById(FITNESS_KEY, this.data.fitnessId)
      : findByDate(getEntries(FITNESS_KEY), date);
    const bodyEntry = this.data.bodyId
      ? getEntryById(BODY_KEY, this.data.bodyId)
      : findByDate(getEntries(BODY_KEY), date);
    const typeIndex = Math.max(
      0,
      workoutOptions.findIndex((item) => item.value === (fitnessEntry && fitnessEntry.type))
    );

    this.setData({
      fitnessId: fitnessEntry ? fitnessEntry.id : "",
      bodyId: bodyEntry ? bodyEntry.id : "",
      form: {
        date: (fitnessEntry && fitnessEntry.date) || (bodyEntry && bodyEntry.date) || date,
        typeIndex,
        duration: fitnessEntry && fitnessEntry.duration ? String(fitnessEntry.duration) : "",
        count: fitnessEntry && fitnessEntry.count ? String(fitnessEntry.count) : "",
        calories: fitnessEntry && fitnessEntry.calories ? String(fitnessEntry.calories) : "",
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
    const value =
      event.detail && event.detail.value !== undefined
        ? event.detail.value
        : event.detail;
    this.setData({
      [`form.${field}`]: value
    });
  },
  onSaveFitness() {
    const { form, fitnessId } = this.data;
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
      calories: form.calories ? Number(form.calories) : 0,
      notes: form.notes || ""
    };
    upsertEntry(FITNESS_KEY, fitnessEntry);

    wx.showToast({
      title: "健身记录已保存",
      icon: "success"
    });
  },
  onSaveBody() {
    const { form, fitnessId, bodyId } = this.data;
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

    const bodyEntry = {
      id: bodyId || `${fitnessId || Date.now().toString()}-body`,
      date: form.date,
      weight: form.weight ? Number(form.weight) : 0,
      waistline: form.waistline ? Number(form.waistline) : 0
    };
    upsertEntry(BODY_KEY, bodyEntry);

    wx.showToast({
      title: "身体数据已保存",
      icon: "success"
    });
  },
  onDelete() {
    const { fitnessId, bodyId, kind } = this.data;
    const title = kind === "body" ? "确认删除身体数据" : "确认删除健身记录";
    const content = kind === "body" ? "删除身体数据后不可恢复，确定要删除吗？" : "删除健身记录后不可恢复，确定要删除吗？";
    wx.showModal({
      title,
      content,
      success: (res) => {
        if (!res.confirm) return;
        if (kind === "fitness" && fitnessId) deleteEntry(FITNESS_KEY, fitnessId);
        if (kind === "body" && bodyId) deleteEntry(BODY_KEY, bodyId);
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

const logFitnessUseCase = require("../../services/usecases/logFitnessUseCase");
const logBodyMetricsUseCase = require("../../services/usecases/logBodyMetricsUseCase");
const getEntryUseCase = require("../../services/usecases/getEntryUseCase");
const getHistoryUseCase = require("../../services/usecases/getHistoryUseCase");
const updateEntryUseCase = require("../../services/usecases/updateEntryUseCase");
const deleteEntryUseCase = require("../../services/usecases/deleteEntryUseCase");
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
  async loadEntries() {
    const date = this.data.form.date;
    let fitnessEntry = null;
    let bodyEntry = null;
    try {
      if (this.data.fitnessId) {
        fitnessEntry = await getEntryUseCase.execute({
          kind: "fitness",
          id: this.data.fitnessId
        });
      }
      if (this.data.bodyId) {
        bodyEntry = await getEntryUseCase.execute({
          kind: "body",
          id: this.data.bodyId
        });
      }
      if (!fitnessEntry || !bodyEntry) {
        const history = await getHistoryUseCase.execute({ range: "all" });
        if (!fitnessEntry) {
          fitnessEntry = findByDate(history.fitnessEntries, date);
        }
        if (!bodyEntry) {
          bodyEntry = findByDate(history.bodyEntries, date);
        }
      }
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
    } catch (error) {
      wx.showToast({
        title: error.message || "加载失败，请稍后重试",
        icon: "none"
      });
    }
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
  async onSaveFitness() {
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

    const entryId = fitnessId || Date.now().toString();
    const fitnessEntry = {
      id: entryId,
      date: form.date,
      type: workoutOptions[form.typeIndex].value,
      duration: form.duration ? Number(form.duration) : 0,
      count: form.count ? Number(form.count) : 0,
      calories: form.calories ? Number(form.calories) : 0,
      notes: form.notes || ""
    };
    try {
      if (fitnessId) {
        await updateEntryUseCase.execute({ kind: "fitness", id: fitnessId, patch: fitnessEntry });
      } else {
        await logFitnessUseCase.execute(fitnessEntry);
        this.setData({ fitnessId: entryId });
      }

      wx.showToast({
        title: "健身记录已保存",
        icon: "success"
      });
    } catch (error) {
      wx.showToast({
        title: error.message || "保存失败，请稍后重试",
        icon: "none"
      });
    }
  },
  async onSaveBody() {
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

    const entryId = bodyId || `${fitnessId || Date.now().toString()}-body`;
    const bodyEntry = {
      id: entryId,
      date: form.date,
      weight: form.weight ? Number(form.weight) : 0,
      waistline: form.waistline ? Number(form.waistline) : 0
    };
    try {
      if (bodyId) {
        await updateEntryUseCase.execute({ kind: "body", id: bodyId, patch: bodyEntry });
      } else {
        await logBodyMetricsUseCase.execute(bodyEntry);
        this.setData({ bodyId: entryId });
      }

      wx.showToast({
        title: "身体数据已保存",
        icon: "success"
      });
    } catch (error) {
      wx.showToast({
        title: error.message || "保存失败，请稍后重试",
        icon: "none"
      });
    }
  },
  onDelete() {
    const { fitnessId, bodyId, kind } = this.data;
    const title = kind === "body" ? "确认删除身体数据" : "确认删除健身记录";
    const content = kind === "body" ? "删除身体数据后不可恢复，确定要删除吗？" : "删除健身记录后不可恢复，确定要删除吗？";
    wx.showModal({
      title,
      content,
      success: async (res) => {
        if (!res.confirm) return;
        try {
          if (kind === "fitness" && fitnessId) {
            await deleteEntryUseCase.execute({ kind: "fitness", id: fitnessId });
          }
          if (kind === "body" && bodyId) {
            await deleteEntryUseCase.execute({ kind: "body", id: bodyId });
          }
          wx.switchTab({
            url: "/pages/history/index"
          });
        } catch (error) {
          wx.showToast({
            title: error.message || "删除失败，请稍后重试",
            icon: "none"
          });
        }
      }
    });
  },
  goHome() {
    wx.switchTab({
      url: "/pages/home/index"
    });
  }
});

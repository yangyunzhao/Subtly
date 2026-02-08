const getBaseUrl = () => {
  const app = getApp ? getApp() : null;
  return (app && app.globalData && app.globalData.apiBaseUrl) || "";
};

const request = ({ url, method = "GET", data }) => {
  const baseUrl = getBaseUrl();
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}${url}`,
      method,
      data,
      success: (res) => {
        const payload = res.data || {};
        if (payload.error) {
          reject(new Error(payload.error));
          return;
        }
        resolve(payload.data);
      },
      fail: reject
    });
  });
};

module.exports = {
  request
};

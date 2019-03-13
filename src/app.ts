// 运行时配置文件

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
  plugins: [
    require('dva-logger')(),
  ],
};

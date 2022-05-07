module.exports = {
  content: ["./src/**/*.tsx"],
  plugins: [require("@tailwindcss/line-clamp")],
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
      colors: {
        "gray-3e": "#3E3E3E",
        "gray-70": "#707070",
        "gray-ae": "#AEAEAE",
        "gray-b4": "#B4B4B4",
        "gray-9c": "#9C9C9C",
        "gray-f6": "#F6F6F6",
        "gray-f8": "#F8F8F8",
        "gray-c3": "#C3C3C3",
        "gray-d4": "#D4D4D4",
        "gray-87": "#878787",
        "gray-ed": "#EDEDED",
        "gray-ee": "#EEEEEE",
        "gray-e1": "#E1E1E1",
        "blue-main": "#063FC3",
      },
      borderRadius: {
        two: "4rpx",
        twelve: "24rpx",
        eight: "16rpx",
        six: "12rpx",
        five: "10rpx",
        forty: "80rpx",
        ten: "20rpx",
      },
      ...generateVariables({
        spacing: ["safe-t", "safe-b", "menu-h", "header-h"],
      }),
    },
    spacing: {
      ...generateRpx(),
      ...generatePercentage(),
      full: "100%",
      auto: "auto",
    },
    fontSize: (theme) => theme("spacing"),
    borderWidth: (theme) => theme("spacing"),
    lineHeight: (theme) => theme("spacing"),
    translate: (theme) => theme("spacing"),
    inset: (theme) => theme("spacing"),
    width: (theme) => ({ ...theme("spacing"), screen: "100vw" }),
    minWidth: (theme) => theme("width"),
    maxWidth: (theme) => theme("width"),
    height: (theme) => ({ ...theme("width"), screen: "100vh" }),
    minHeight: (theme) => theme("height"),
    maxHeight: (theme) => theme("height"),
  },
};

/** (0...999 as i) -> (i * 2)rpx */
function generateRpx() {
  return Object.assign(
    {},
    [...Array(1000).keys()].map((i) => `${i * 2}rpx`)
  );
}

/** (1...n as i)/(2,3,4,5,6,12 as n) -> (i / n)% */
function generatePercentage() {
  return Object.assign(
    {},
    ...[2, 3, 4, 5, 6, 12].map((n) =>
      Object.assign(
        {},
        ...[...Array(n).keys()].slice(1).map((i) => {
          return { [`${i}/${n}`]: `${(i / n) * 100}%` };
        })
      )
    )
  );
}

/** { key: [name, ...], ... } => { key: { name: 'var(--name)', ... }, ... } */
function generateVariables(variables) {
  const g = (arr) =>
    arr.reduce((r, v) => Object.assign(r, { [v]: `var(--${v})` }), {});
  return Object.entries(variables).reduce(
    (r, [k, v]) => Object.assign(r, { [k]: g(v) }),
    {}
  );
}

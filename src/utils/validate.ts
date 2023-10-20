export const validateUtils = {
  postCode: /^\d{7}$/, //ハイフンなし
  phoneNumber: /^0\d{9,10}$/, // ハイフンなし。固定・形態許容
  HalfWidthAlphanumericSymbols: /^[\u0021-\u007e]+$/u, // 半角英数字記号のみ
  hiragana: /^[\p{Script=Hiragana}ー－]+$/u,
};

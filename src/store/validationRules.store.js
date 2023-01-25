// state
const state = () => ({
  // fotm validation
  valid: true,

  // name rules
  nameRules: [
    (v) => !!v || "حقل الاسم مطلوب",
    (v) => (v && v.length > 2) || "الاسم يجب ان يكون اكثر من 3 حروف",
    (v) => (v && v.length < 255) || "الاسم يجب ان يكون اقل من 255 حرف",
  ],

  // email rules
  emailRules: [
    (v) => !!v || "حقل البريد الالكتروني مطلوب",
    (v) => /.+@.+\..+/.test(v) || "البريد الالكتروني غير صحيح",
  ],

  // phone rules
  phoneRules: [
    (v) => !!v || "حقل الهاتف مطلوب",
    (v) => (v && v.length == 12) || "الهاتف يجب ان يكون 12 رقم",
    (v) => /^\d+$/.test(v) || "الهاتف يجب ان يكون ارقام فقط",
    (v) => /^9665/.test(v) || "الهاتف يجب ان يبدأ ب 9665",
  ],

  // password rules
  passwordRules: [
    (v) => !!v || "حقل كلمة المرور مطلوب",
    (v) => (v && v.length > 7) || "كلمة المرور يجب ان تكون اكثر من 8 حروف",
  ],

  // confirm password rules
  confirmPasswordRules: [
    (v) => !!v || "حقل تأكيد كلمة المرور مطلوب",
    (v) =>
      (v && v.length > 7) || "تأكيد كلمة المرور يجب ان تكون اكثر من 8 حروف",
  ],

  // description rules
  descriptionRules: [
    (v) => (v && v.length > 2) || "الوصف يجب ان يكون اكثر من 3 حروف",
    (v) => (v && v.length < 255) || "الوصف يجب ان يكون اقل من 255 حرف",
  ],

  // message rules
  messageRules: [
    (v) => !!v || "حقل الرسالة مطلوب",
    (v) => (v && v.length > 2) || "الرسالة يجب ان تكون اكثر من 3 حروف",
    (v) => (v && v.length < 255) || "الرسالة يجب ان تكون اقل من 255 حرف",
  ],

  // select rules
  selectRules: [(v) => !!v || "برجاء اختيار القيمة"],

  // number rules
  numberRules: [
    (v) => !!v || "الحقل مطلوب",
    (v) => /^\d+$/.test(v) || "الرقم يجب ان يكون ارقام فقط",
  ],

  // nationalIdRules rules
  nationalIdRules: [
    (v) => !!v || "حقل الرقم الهوية مطلوب",
    (v) => (v && v.length == 10) || "الرقم الهوية يجب ان يكون 10 ارقام",
    (v) => /^\d+$/.test(v) || "الرقم الهوية يجب ان يكون ارقام فقط",
  ],

  // phoneOrEmailRules rules
  phoneOrEmailRules: [
    (v) => !!v || "حقل الهاتف او البريد الالكتروني مطلوب",
    // if it's email then check email rules
    (v) => {
      if (v.includes("@")) {
        return /.+@.+\..+/.test(v) || "البريد الالكتروني غير صحيح";
      } else {
        return (
          (v && v.length == 12) ||
          "الهاتف يجب ان يكون 12 رقم" ||
          (v && /^\d+$/.test(v)) ||
          "الهاتف يجب ان يكون ارقام فقط" ||
          (v && /^9665/.test(v)) ||
          "الهاتف يجب ان يبدأ ب 9665"
        );
      }
    },

    // if it's phone then check phone rules must start with 9665
    (v) => {
      if (!v.includes("@")) {
        return /^9665/.test(v) || "الهاتف يجب ان يبدأ ب 9665";
      }
    },
  ],

  // otpRules rules
  otpRules: [
    (v) => !!v || "حقل الرمز مطلوب",
    (v) => (v && v.length == 4) || "الرمز يجب ان يكون 4 ارقام",
    (v) => /^\d+$/.test(v) || "الرمز يجب ان يكون ارقام فقط",
  ],

  // durationRules rules
  durationRules: [
    (v) => !!v || "حقل المدة مطلوب",
    (v) => /^\d+$/.test(v) || "المدة يجب ان تكون ارقام فقط",
    (v) => (v && v >= 15) || "المدة يجب ان تكون اكبر من 15 دقيقة",
  ],

  // select file rules
  selectFileRules: [(v) => !!v || "برجاء اختيار الملف"],
});

// getters
const getters = {
  // fotm validation
  valid: (state) => state.valid,

  // name rules
  nameRules: (state) => state.nameRules,

  // email rules
  emailRules: (state) => state.emailRules,

  // phone rules
  phoneRules: (state) => state.phoneRules,

  // password rules
  passwordRules: (state) => state.passwordRules,

  // confirm password rules
  confirmPasswordRules: (state) => state.confirmPasswordRules,

  // description rules
  descriptionRules: (state) => state.descriptionRules,

  // message rules
  messageRules: (state) => state.messageRules,

  // select rules
  selectRules: (state) => state.selectRules,

  // number rules
  numberRules: (state) => state.numberRules,

  // national id rules
  nationalIdRules: (state) => state.nationalIdRules,

  // phone or email rules
  phoneOrEmailRules: (state) => state.phoneOrEmailRules,

  // otp rules
  otpRules: (state) => state.otpRules,

  // duration rules
  durationRules: (state) => state.durationRules,

  // select file rules
  selectFileRules: (state) => state.selectFileRules,
};

export default {
  namespaced: true,
  state,
  getters,
};

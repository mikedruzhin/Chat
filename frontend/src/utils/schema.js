import * as yup from 'yup';

export const signUpShema = (t) => yup.object().shape({
  username: yup.string().min(3, t('validation.maxCount')).max(20, t('validation.maxCount')).required(t('validation.required')),
  password: yup.string().min(6, t('validation.minCountPass')).required(t('validation.required')),
  confirmPassword: yup.string().oneOf([yup.ref('password')], t('validation.matchPass')),
});

export const newChannelShema = (t, channels) => yup.object().shape({
  body: yup.string().required(t('validation.required'))
    .min(3, t('validation.maxCount'))
    .max(20, t('validation.maxCount'))
    .notOneOf(channels, t('validation.uniqName')),
});

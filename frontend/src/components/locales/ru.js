const ru = {
  translation: {
    chatName: 'Hexlet Chat',
    loginPage: {
      enter: 'Войти',
      nickname: 'Ваш Ник',
      password: 'Пароль',
      withoutAcc: 'Нет аккаунта? ',
      reg: 'Регистрация',
      loginError: 'Неверные имя пользователя или пароль',
    },
    mainPage: {
      isLoading: 'Страница загружается',
      channels: 'Каналы',
      enterMessage: 'Введите сообщение...',
      send: 'Отправить',
      quitBtn: 'Выйти',
      newMessage: 'Новое сообщение',
      deleteChannel: 'Удалить',
      renameChannel: 'Переименовать',
      messagesCount: {
        key_zero: '{{count}} сообщений',
        key_one: '{{count}} сообщение',
        key_few: '{{count}} сообщения',
        key_many: '{{count}} сообщений',
      },
      channelMenu: 'Управление каналом',
    },
    modal: {
      createChannel: {
        createNewChannel: 'Создать новый канал',
        send: 'Отправить',
        cancel: 'Отменить',
        addChannel: 'Добавить канал',
        channelNameCount: 'От 3 до 20 символов',
        channelName: 'Имя канала',
        channelCreated: 'Канал создан!',
      },
      editChannel: {
        renameChannelNotification: 'Канал переименован!',
        renameChannel: 'Переименовать канал',
        newName: 'Введите новое имя',
      },
      deleteChannel: {
        deleteChannel: 'Удалить канал',
        sure: 'Уверены?',
        delete: 'Удалить',
        success: 'Канал удалён',
      },
    },
    regForm: {
      regErrors: 'Такой пользователь уже существует',
      register: 'Регистрация',
      confirmPassword: 'Подтвердите пароль',
      charactersCount: 'От 3 до 20 символов',
      charasterCountPassword: 'Не менее 6 символов',
      userName: 'Имя пользователя',
      password: 'Пароль',
    },
    notFoundPage: {
      notFound: 'Страница не найдена',
      youCanMove: 'Но вы можете перейти',
      mainPage: 'на главную страницу',
    },
    toast: {
      errorNetwork: 'Ошибка соединения',
    },
    validation: {
      required: 'Обязательное поле',
      maxCount: 'От 3 до 20 символов',
      uniqName: 'Имя канала должно быть уникальным',
      minCountPass: 'Пароль должен содержать не менее 6 символов',
      matchPass: 'Пароли должны совпадать',
    },
  },
};

export default ru;

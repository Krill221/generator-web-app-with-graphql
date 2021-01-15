import user from './user';
//top for generator

const ruRU = {
  props: {
    main: {
      AppName: "New App",
      AppTel: "+7 (900) 000-00-00",

    },
    menu: {
      Main: "Главная",
      Users: "Пользователи",
      Profile: "Профиль",
      SignIn: "Войти",
    },
    footer: {
      Copyrights: "Все права защищены",
      Phone: "Тел",
      Tel: "Тел",
      Person: "Конфиденциальность",
      Terms: "Условия",
    },
    profile: {
      SignIn: "Войти",
      SignOut: "Выйти",
      SignUp: "Зарегистрироваться",
      SignInHeader: "Вход",
      SignUpHeader: "Регистрирация",
      UserNotFound: "Пользователь не найден",
      ConfirmPassword: "Повторите пароль",
    },
    components: {
      New: "Новый",
      Add: "Добавить",
      Edit: "Редактироовать",
      Delete: "Удалить",
      Yes: "Да",
      No: "Нет"
    },
    models: {
      // models for generator
      user: { ...user },
    }
  }
};
export default ruRU;
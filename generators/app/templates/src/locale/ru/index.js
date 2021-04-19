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
      Users: "Users",
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
      Choose: "Выбрать",
      Yes: "Да",
      No: "Нет",
      Upload: "Загрузить",
      Change: "Изменить",
      Join: "Присоединиться",
      Error: "Ошибка",
      Uploaded: "Загружен",
      NotUploaded: "Не загружен",
      AddToCart: "В Корзину",
      MakeOrder: "Оформить",
      Cart: "Корзина",
      ToPay: "Перейти к оплате",
      Pay: "Оплатить",
      Paid: "Оплачен",
      Delivery: "Доставка",
    },
    models: {
      // models for generator
      user: { ...user },
    }
  }
};
export default ruRU;
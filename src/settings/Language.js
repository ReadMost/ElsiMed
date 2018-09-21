
const LANGUAGE = [
    //====================RU==========================0
    {
        is: 'RU',
        AuthContainer: {
            tempUpdate: 'Уважаемые пользователи! Регистрация будет доступна в следующей версии. ',
            copyright: '© 2018 Все права защищены.',
            signin: 'Войти',
            email: 'Электронная почта',
            min8: 'минимум 8 символов',
            emailError: 'неверный электронный адрес',
            password: 'Пароль',
            signup: 'Регистрация',
            appointment_request: 'Записаться на прием',
            iosBottom: {
                title: 'Запись на прием к врачу',
                free: 'Записаться к участковому врачу',
                fee: 'Записаться на платную услугу',
                saved: 'Записи',
            }
        },
        AppointmentFreeContainer:{
            title: 'Записаться на прием',
            title2: 'Записаться на платную услугу',
            enter_iin: 'Введите ИИН',
            btn_search: 'Найти',
            btn_confirm:'Продолжить',
            doctors: 'Выберите кабинет',
            cabinetError: 'Нет Кабинета',

            doNotExist: 'Такого человека не существует',
            repeatAgain: 'Проверьте интернет соединение или повторите позже',
            formatIncorrect: 'Неверный ИИН',
            notSupport: "Ваша организация прикрепления ещё не подключилась к нашей системе. Пожалуйста обратитесь к вашей организации.",
            useFee: "Вы должны  прикрепиться к поликлинике или записаться на платную основу ",
            goFee: 'Записаться на платную',
        },
        AgendaContainer:{
            title: "Расписание врачей",
            iosConfirm: {
                title: 'Запись на прием в ',
                action: 'Записаться',
            },
            iosTeacher: {
                title: 'Выберите врача'
            },
            noTable: 'На данную дату расписание не создано',
        },
        SettingContainer:{
            title: 'Настройки',
            change_password: 'изменить пароль',
            change_language: 'изменить язык',
            set_rating: 'поставить рейтинг',
        },
        AppointmentFormContainer:{
            title: 'Подтверждение записи',
            btn: 'Отправить',
            info: (fio, date, time)=>{
                return "Запись на прием к "+ fio +" в " + date + ", время " + time
            },
            maxLength: "максимальная длинна",
            reason: "Причина визита к врачу",
            error: 'Oшибка, повторите позже',
            serverError: 'Oшибка в сервере повторите позже',
            limit: 'Вы превысили  максимальный количество запросов',
            success: 'Вы успешна записаны',
            fillForm: 'Заполните форму',

        },
        SavedContainer:{
            title: 'Записи',
            loading: "Загружается",
            success: "Успешно удалено",
            problem: "Возникла проблема повторите позже",
            empty: " У вас нет сохраненных записей",
            time: "время",
            delete: 'Удалить запись',
        }
    },
    //===================KZ=============================1
    {
        is: 'KZ',
        AuthContainer: {
            tempUpdate: 'Құрметті пайдаланушылар! Тіркелу келесі нұсқасында қол жетімді болады. ',
            copyright: '© 2018 Барлық құқықтар қорғалған',
            signin: 'Жүйеге кіру',
            email: 'Электрондық пошта',
            min8: 'кемінде 8 таңба',
            emailError: 'жарамсыз электрондық пошта мекенжайы',
            password: 'Құпия сөз',
            signup: 'Тіркелу',
            appointment_request: 'Қабылдауға жазылу',
            iosBottom: {
                title: 'Дәріге Қабылдауға жазылу түрлері',
                free: 'Жергілікті дәрігерге тіркеліңіз',
                fee: 'Ақылы дәрігерге тіркеліңіз',
                saved: 'Жазылулар',
            }
        },
        AppointmentFreeContainer:{
            title: 'Қабылдауға жазылу',
            title2: 'Ақылы қызметке тіркеліңіз',
            enter_iin: 'ЖСН енгізіңіз',
            btn_search: 'Пайдаланушыны табу',
            btn_confirm:'Жалғастыру',
            doctors: 'Кабинет таңдаңыз',
            cabinetError: 'Кабинет табылмады',

            doNotExist: 'Мұндай адам жоқ',
            repeatAgain: 'Интернетке қосылуды тексеріңіз немесе кейінірек қайталап көріңіз.',
            formatIncorrect: 'Жарамсыз ЖСН',
            notSupport: "Тіркеме ұйымыңыз әлі жүйеге қосылмаған. Ұйымыңызға хабарласыңыз.",
            useFee: "Сіз клиникаға тіркелуіңіз керек немесе ақылы негізде тіркелуіңіз керек",
            goFee: 'Ақылы қызмеке тіркеліңіз',
        },
        AgendaContainer:{
            title: "Дәрігерлердің кестесі",
            iosConfirm: {
                title: 'Қабылдауға тіркелу',
                action: 'Тіркелу',
            },
            iosTeacher: {
                title: 'Дәрігерді таңдаңыз '
            },
            noTable: 'Бұл күн үшін кесте жасалмады',
            
        },
        SettingContainer:{
            title: 'Параметрлер',
            change_password: 'құпия сөзді өзгерту',
            change_language: 'тілді өзгерту',
            set_rating: 'рейтинг қою',
        },
        AppointmentFormContainer:{
            title: 'Жазбаны растау',
            btn: 'Жіберу',
            info: (fio, date, time)=>{
                return date + " күні, сағат "+time + ' ' + fio + " қабылдауға жазылу"
            },
            maxLength: "максималды ұзындығы",
            reason: "Дәрігерге барудың себебі",
            error: 'Қате, кейінірек қайталап көріңіз.',
            serverError: 'Серверде қате кейінірек қайталап көріңіз',
            limit: 'Сұраныстардың максималды санын астыңыз',
            success: 'Сіз сәтті тіркедіңіз',
            fillForm: 'Пішінді толтырыңыз',
        },
        SavedContainer:{
            title: 'Жазбалар',
            loading: "Жүктелeуде",
            success: "Сәтті жойылды",
            problem: "Кейінірек қайталап көріңіз",
            empty: "Сізде сақталған жазбалар жоқ",
            time: "уақыт",
            delete: 'Жазбаны жою',
        }
    },
]

export default LANGUAGE
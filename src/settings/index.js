import { Platform, Dimensions, View } from 'react-native';
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const DEVICE_WIDTH = Dimensions.get('window').width;

export const OPEN_TOKEN_CREDENTIALS = 'grant_type=client_credentials&scope=read write trust&client_id=$2a$10$v.6GHHdmT1AcFrzV/w4gquqCn31HCk6U2YlKBzDDTe2hwDV3iqHUa&client_secret=$2a$10$oRXOYEoNliBVyDbw0G7s4uLXSUcg7FdbIDNqyyb2Tshb5lTS5Yj2a'
export const  HOST = 'http://92.46.60.11:3838'

//NEW versions 
export const HOSTS_LIST = [
  'https://avicenna.online:1451',
  'http://92.46.60.11:3838',
  'https://alm.astonline.kz:1451',
  'http://92.46.60.10:3838',
]



export const MAIN_HEADER_COLOR = 'black'
export const MAIN_BACKGROUND_COLOR = 'white'

export const MAIN_COLOR = '#00C6AE'
// export const MAIN_COLOR = '#005F85'

export const SIDE_BAR_COLOR = '#292D32'
export const MAIN_BUTTONS_COLOR = '#3676DF'
export const BORDER_COLOR = '#A9A9A9'

export const REGISTRATION_ELEMENTS = [
    {
      offset: -500,
      keybord: 'email-address',
      name: 'email',
      valid: 'isEmailValid',
      input: 'emailInput',
      placeholder: 'Электронная почта',
      error: 'Неверный электронный адрес'
    },
    {
      offset: -400,
      keybord: 'default',
      name: 'name',
      valid: 'isNameValid',
      input: 'nameInput',
      placeholder: 'ФИО',
      error: 'неверный ФИО'
      
    },
    {
      offset: -300,
      keybord: 'numeric',
      name: 'iin',
      valid: 'isIinValid',
      input: 'iinInput',
      placeholder: 'ИИН',
      error: 'неверный ИИН'
      
    },
    {
      offset: -250,
      keybord: 'phone-pad',
      name: 'nomer',
      valid: 'isNomerValid',
      input: 'nomerInput',
      placeholder: 'номер телефона',
      error: 'неверный номер'
      
    },
    {
      offset: -200,
      keybord: 'default',
      isPassword: true,
      name: 'password',
      valid: 'isPasswordValid',
      input: 'passwordInput',
      placeholder: 'Пароль',
      error: 'минимум 8 символов'
      
    },
    {
      offset: -150,
      keybord: 'default',
      isPassword: true,
      name: 'passwordConfirmation',
      valid: 'isConfirmationValid',
      input: 'confirmationInput',
      placeholder: 'Повторите пароль',
      error: 'пароль не совпадает'
      
    }
  ]
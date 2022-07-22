import React, { useContext } from 'react';
import './Registration.scss';
import { Formik, Field } from 'formik';
// eslint-disable-next-line import/no-extraneous-dependencies
import block from 'bem-cn';
import * as Yup from 'yup';
import Button from '../button/Button';

import { ModalContext } from '../../context/context';

const d = block('description');
const f = block('form');
const input = block('input');
const data = block('data');
const select = block('select');
const w = block('warning');

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Слишком короткое имя!')
    .max(50, 'Слишком длинное имя!')
    .required('Обязательное поле'),
  lastName: Yup.string()
    .min(2, 'Слишком короткая фамилия!')
    .max(50, 'Слишком длинная фамилия')
    .required('Обязательное поле'),
  email: Yup.string().email('Invalid email').required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Слишком короткий пароль!')
    .max(50, 'Слишком длинный пароль!')
    .required('Обязательное поле'),
});

function Registration() {
  const { openModal } = useContext(ModalContext);

  const handleClickButton = () => {
    openModal({
      children: <h1>New window!</h1>,
    });
  };

  const generateDate = (type) => {
    const arr = [];
    const months = [...Array(12).keys()].map((key) => new Date(0, key));
    const startYear = 1900;
    const endYear = new Date().getFullYear();

    switch (type) {
      case 'day':
        for (let i = 1; i <= 31; i += 1) {
          arr.push(<option key={i} value={i}>{i}</option>);
        }
        break;

      case 'month':
        arr.push(months.map((month, id) => (
          <option
              /* eslint-disable-next-line react/no-array-index-key */
            key={id}
            value={month.toLocaleString('ru', { month: 'numeric' })}
          >
            {month.toLocaleString('ru', { month: 'long' })}
          </option>
        )));
        break;

      case 'year':

        for (let i = endYear; i >= startYear; i -= 1) {
          arr.push(<option key={i} value={i}>{i}</option>);
        }
        break;

      default:
        break;
    }

    return arr;
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: 'Мужчина',
        date: {
          day: 5,
          month: '7',
          year: '1998',
        },
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors, touched,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className={d()}>
            <div className={d('header')}>
              Создать аккаунт
            </div>
            <div className={d('subtitle')}>
              Быстро и легко.
            </div>
          </div>
          <div className={f()}>
            <div className={f('fullName')}>
              <div className={f('input-container', { gap: 'right' })}>
                <input
                  className={input()}
                  type="firstname"
                  placeholder="Имя"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstname}
                />
                {errors.firstName && touched.firstName ? (
                  <div className={w()}>{errors.firstName}</div>
                ) : null}
              </div>
              <div className={f('input-container')}>
                <input
                  className={input()}
                  type="lastname"
                  placeholder="Фамилия"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
                {errors.lastName && touched.lastName ? (
                  <div className={w()}>{errors.lastName}</div>
                ) : null}
              </div>
            </div>
            <div>
              <input
                className={input({ gap: 'top' })}
                type="text"
                placeholder="Номер мобильного телефона или эл. адрес"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <div className={w()}>{errors.email}</div>
              ) : null}
            </div>
            <div>
              <input
                className={input({ gap: 'top' })}
                type="text"
                placeholder="Новый пароль"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password ? (
                <div className={w()}>{errors.password}</div>
              ) : null}
            </div>
            <div className={data()}>
              Дата рождения
              {/* eslint-disable-next-line */}
              <a href="#" className={data('question')}><i/></a>
              <div className={data('select')}>
                <Field
                  as="select"
                  name="date.day"
                  aria-label="День"
                  title="День"
                  className={select()}
                >
                  {generateDate('day')}
                </Field>
                <Field
                  as="select"
                  name="date.month"
                  aria-label="Месяц"
                  title="Месяц"
                  className={select()}
                >
                  {generateDate('month')}
                </Field>
                <Field
                  as="select"
                  name="date.year"
                  aria-label="Год"
                  title="Год"
                  className={select()}
                >
                  {generateDate('year')}
                </Field>
              </div>
            </div>
            <div className={data()}>
              Пол
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,
                jsx-a11y/control-has-associated-label */}
              <a href="#" className={data('question')}><i /></a>
              <div className={data('select')}>
                <span className={select({ radio: true })}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className={select('label')}>Женщина</label>
                  <Field type="radio" className={select('input')} name="gender" value="Женщина" />
                </span>
                <span className={select({ radio: true })}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className={select('label')}>Мужчина</label>
                  <Field type="radio" className={select('input')} name="gender" value="Мужчина" />
                </span>
                <span className={select({ radio: true })}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className={select('label')}>Другое</label>
                  <Field type="radio" className={select('input')} name="gender" value="Другое" />
                </span>
              </div>
            </div>
            <p className={f('warning')}>
              Люди, которые пользуются нашим сервисом,
              могли загрузить вашу контактную информацию на Facebook.
              <a
                href="https://www.facebook.com/"
                id="non-users-notice-link"
                target="_blank"
                rel="nofollow noreferrer"
              >
                {' Подробнее'}
              </a>
            </p>
            <p className={f('warning')}>
              Нажимая кнопку Регистрация, вы принимаете
              <a
                href="https://www.facebook.com/"
                id="terms-link"
                target="_blank"
                rel="nofollow noreferrer"
              >
                {' Условия'}
              </a>
              ,
              <a
                href="/about/privacy/update"
                id="privacy-link"
                target="_blank"
                rel="nofollow"
              >
                {' Политику использования данных'}
              </a>
              {' '}
              и
              <a
                href="/policies/cookies/"
                id="cookie-use-link"
                target="_blank"
                rel="nofollow"
              >
                {' Политику в отношении файлов cookie'}
              </a>
              . Вы можете получать от нас SMS-уведомления, отказаться от
              которых
              можно в любой момент.
            </p>
            <Button text="Регистрация" type="submit" />
            <Button onClick={handleClickButton} text="У вас уже есть аккаунт?" type="link" />
          </div>
        </form>
      )}
    </Formik>
  );
}

export default Registration;

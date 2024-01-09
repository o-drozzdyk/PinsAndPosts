import { useEffect, useState } from 'react';
import './Modal.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actions as modalActions } from '../features/modal';
import { actions as mapModalActions } from '../features/mapModal';
import { actions as advertisementActions } from '../features/advertisements';
import { Advertisement } from '../types/Advertisement';
export const Modal = () => {
  const [formData, setFormData] = useState({
    title: '',
    photo: '',
    price: '',
    city: '',
    coordinates: { lat: 0, lng: 0 },
    name: '',
    phoneNumber: '',
  });

  const [isPhotoValid, setIsPhotoValid] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useAppDispatch();
  const advertisements: Advertisement[] = useAppSelector(state => state.advertisements);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isPhotoValid || !isPriceValid || !isPhoneValid) {
      setErrorMessage('Дані неправильні. Виправте помилки');
    } else {
      dispatch(advertisementActions.addItem({ ...formData, id: getNewId(advertisements), price: +formData.price }));

      setFormData({
        title: '',
        photo: '',
        price: '',
        city: '',
        coordinates: { lat: 0, lng: 0 },
        name: '',
        phoneNumber: '',
      });

      handleCancelButtonClick();
    }
  };

  const handlePhotoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setFormData(current => ({ ...current, photo: event.target.value }));
  };

  const handlePriceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setFormData(current => ({ ...current, price: event.target.value }));
  };

  const handlePhoneNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setFormData(current => ({ ...current, phoneNumber: event.target.value }));
  };

  useEffect(() => {
    const urlRegExp = /^(ftp|http|https):\/\/[^ "]+$/;
    setIsPhotoValid(urlRegExp.test(formData.photo));
  }, [formData.photo])

  useEffect(() => {
    let validPrice = true;
    for (const num of formData.price) {
      if (isNaN(+num)) {
        validPrice = false;
        break;
      }
    }
    setIsPriceValid(validPrice);
  }, [formData.price])

  useEffect(() => {
    const phoneNubmerRegExp = /^\+380\d{9}$/;
    setIsPhoneValid(phoneNubmerRegExp.test(formData.phoneNumber));
  }, [formData.phoneNumber])

  const handleCancelButtonClick = () => dispatch(modalActions.changeState(false));

  const getNewId = (data: Advertisement[]) => {
    return data.length + 1;
  }

  const handleLocationChange = (coordinates: { lat: number; lng: number }) => {
    setFormData((current) => ({ ...current, coordinates }));
  };

  const handleShowMapClick = () => {
    dispatch(mapModalActions.changeState(true));
  };

  return (
    <div className="modal">
      <h2 className="modal__text">Додати оголошення</h2>
      <form className="form" onSubmit={handleFormSubmit}>
        <label className='form__label'>
          Назва оголошення:
          <input
            type="text"
            name="title"
            placeholder="Введіть назву оголошення"
            value={formData.title}
            className="form__label-input"
            onChange={(event) => {
              setFormData(current => ({ ...current, title: event.target.value }));
              setErrorMessage('');
            }}
            required
          />
        </label>

        <label className='form__label'>
          Фото:
          <input
            type="text"
            name="photo"
            placeholder="Вставте лінк на фото"
            value={formData.photo}
            className="form__label-input"
            onChange={handlePhotoInput}
            required
          />
        </label>

        <label className='form__label'>
          Мінімальна вартість:
          <input
            type="text"
            name="price"
            placeholder="Вкажіть мінімальну вартість оренди"
            value={formData.price}
            className="form__label-input"
            onChange={handlePriceInput}
            required
          />
        </label>

        <label className='form__label'>
          Місто:
          <input
            type="text"
            name="city"
            placeholder="Вкажіть місто"
            value={formData.city}
            className="form__label-input"
            onChange={(event) => {
              setFormData(current => ({ ...current, city: event.target.value }));
              setErrorMessage('');
            }}
            required
          />
        </label>

        <label className='form__label'>
          Ім'я:
          <input
            type="text"
            name="name"
            placeholder="Введіть ім'я"
            value={formData.name}
            className="form__label-input"
            onChange={(event) => {
              setFormData(current => ({ ...current, name: event.target.value }));
              setErrorMessage('');
            }}
            required
          />
        </label>

        <label className='form__label'>
          Номер телефону:
          <input
            type="text"
            name="city"
            placeholder="Введіть номер телефону:"
            value={formData.phoneNumber}
            className="form__label-input"
            onChange={handlePhoneNumberInput}
            required
          />
        </label>

        <label className='form__label'>
          Локація:
          <button
            type='button'
            className="form__buttons-button form__buttons-button--cancel"
            onClick={handleShowMapClick}
          >
            Вибрати на мапі
          </button>
        </label>

        {/* {isMapModalShown && <MapModal />} */}

        {errorMessage && (<p className="form__error-message">{errorMessage}</p>)}

        <div className="form__buttons">
          <button
            type="button"
            className="form__buttons-button form__buttons-button--cancel"
            onClick={handleCancelButtonClick}
          >
            <p className="form__buttons-button-text">Скасувати</p>
          </button>

          <button
            type="submit"
            className="form__buttons-button form__buttons-button--submit"
          >
            <p className="form__buttons-button-text">Додати</p>

          </button>
        </div>
      </form>
    </div>
  );
};

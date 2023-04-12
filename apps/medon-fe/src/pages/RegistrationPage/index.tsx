import RegistrationForm from 'components/RegistrationForm';
import { useTranslation } from 'react-i18next';
import logo from 'assets/images/logo.svg';
import RegistrationConfirmation from 'components/RegistrationConfirmation';
import { useEffect, useState } from 'react';
import { FormData } from 'components/RegistrationForm/types';
import { ROLES } from 'utils/constants/roles';
import { useRegisterUserMutation } from 'redux/api/authApi';
import { toast } from 'react-toastify';
import { toastConfig } from 'utils/toastConfig';
import {
  Container,
  FormContainer,
  RegContainer,
  Sidebar,
  Text,
  Title,
} from './styles';

export default function RegistrationPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [registerUser, { isSuccess, error, isError }] =
    useRegisterUserMutation();
  const submitForm = (values: FormData) => {
    const requestData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      dateOfBirth: new Date(values.birthday.valueOf()),
      role: values.role,
      specialityId:
        values.role === ROLES.REMOTE && values.speciality
          ? +values.speciality
          : null,
      country: values.country,
      city: values.city,
      timeZone: values.timezone,
    };
    registerUser(requestData);
    setEmail(values.email);
  };
  useEffect(() => {
    if (isError) {
      toast.error('Registration error, try again!', toastConfig);
    }
  }, [isError, error]);
  return (
    <Container>
      <RegContainer>
        <div>
          <img src={logo} alt={`${t('logoAlt')}`} />
        </div>
        <FormContainer>
          {!isSuccess ? (
            <>
              <Title>{t('regPage.title')}</Title>
              <Text>{t('regPage.instruction')}</Text>
              <RegistrationForm submitForm={submitForm} />
            </>
          ) : (
            <RegistrationConfirmation email={email}></RegistrationConfirmation>
          )}
        </FormContainer>
      </RegContainer>
      <Sidebar></Sidebar>;
    </Container>
  );
}

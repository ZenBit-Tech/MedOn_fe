import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Input from 'components/Input';
import LinkHome from 'components/LinkHome';

import { SubmitSendEmail } from 'pages/ForgetPassword/types';
import {
  Container,
  Content,
  Footer,
  Form,
  Header,
} from 'pages/ForgetPassword/styles';

import RightArrow from 'assets/svgs/arrow/right-arrow.svg';
import Logo from 'assets/svgs/logo_medon.svg';

import { emailSchema } from 'validation/forgotPasswordSchema';
import { usePostForgetPasswordDoctorMutation } from 'redux/features/backend/api';

export default function ResetPassword() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitSendEmail>({
    resolver: yupResolver(emailSchema),
  });

  const theme = useTheme();
  const { t } = useTranslation();
  const [sendEmail, { isLoading }] = usePostForgetPasswordDoctorMutation();

  const handleSentEmail: SubmitHandler<SubmitSendEmail> = (data) => {
    sendEmail({
      email: data.email,
    })
      .unwrap()
      .then(() => {
        setIsEmailSent(true);
      })
      .catch((err) => {
        toast.error(err.data?.message);
      });
  };

  return (
    <Container>
      <Header>
        <img
          src={Logo}
          alt={t('forget-password.alt.logo') as string}
          draggable={false}
        />
      </Header>
      <Content>
        <Form onSubmit={handleSubmit(handleSentEmail)}>
          {!isEmailSent ? (
            <>
              <h1>{t('forget-password.send-email.title')}</h1>
              <h3>{t('forget-password.send-email.subtitle')}</h3>
              <Input
                placeholder={
                  t('forget-password.send-email.placeholder-email') as string
                }
                type="email"
                errorMessage={
                  errors.email?.message
                    ? (t(
                        `forget-password.validation.${errors.email?.message}`
                      ) as string)
                    : undefined
                }
                {...register('email')}
              />
              <Button
                bgcolor={theme.colors.blue_500}
                textcolor={theme.colors.white}
                isLoading={isLoading}
              >
                {t('forget-password.send-email.button')}
                <img
                  src={RightArrow}
                  alt={t('forget-password.alt.image') as string}
                />
              </Button>
            </>
          ) : (
            <>
              <h1>{t('forget-password.after-email.title')}</h1>
              <h3>{t('forget-password.after-email.subtitle')}</h3>
              <Button
                bgcolor={theme.colors.blue_500}
                textcolor={theme.colors.white}
                isLoading={isLoading}
              >
                {t('forget-password.after-email.button')}
                <img
                  src={RightArrow}
                  alt={t('forget-password.send-email.alt-image') as string}
                />
              </Button>
            </>
          )}
        </Form>
        <LinkHome
          bgcolor={theme.colors.black}
          textcolor={theme.colors.white}
          to="/"
          isfullwidth="true"
        >
          {t('forget-password.send-email.home-link')}
        </LinkHome>
      </Content>
      <Footer>
        <Link to="#">{t('forget-password.footer.linkTerm')}</Link>
        <Link to="#">{t('forget-password.footer.linkPrivacy')}</Link>
      </Footer>
    </Container>
  );
}

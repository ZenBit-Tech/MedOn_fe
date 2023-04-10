import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from 'components/Button';
import Input from 'components/Input';
import LinkHome from 'components/LinkHome';

import RightArrow from 'assets/svgs/arrow/right-arrow.svg';
import Logo from 'assets/svgs/logo_medon.svg';

import { SubmitResetPasswordForm } from 'pages/ResetPassword/types';
import {
  Container,
  Content,
  Footer,
  Form,
  Header,
} from 'pages/ResetPassword/styles';

import { passwordSchema } from 'validation/forgotPasswordSchema';

export default function ResetPassword() {
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const theme = useTheme();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitResetPasswordForm>({
    resolver: yupResolver(passwordSchema),
  });

  const handleUpdatePassword: SubmitHandler<SubmitResetPasswordForm> = (
    data
  ) => {
    // logic to send email
    setIsPasswordUpdated(true);
  };

  return (
    <Container>
      <Header>
        <img src={Logo} alt="medon logo" draggable={false} />
      </Header>
      <Content>
        <Form onSubmit={handleSubmit(handleUpdatePassword)}>
          {!isPasswordUpdated ? (
            <>
              <h1>{t('forget-password.reset-password.title')}</h1>
              <h3>{t('forget-password.reset-password.subtitle')}</h3>
              <Input
                placeholder="New Password *"
                type="password"
                errorMessage={errors.newPassword?.message}
                {...register('newPassword')}
              />
              <Input
                placeholder="Retry New Password *"
                type="password"
                errorMessage={errors.confirmNewPassword?.message}
                {...register('confirmNewPassword')}
              />
              <Button
                bgcolor={theme.colors.blue_500}
                textcolor={theme.colors.white}
              >
                {t('forget-password.reset-password.button')}
                <img src={RightArrow} alt="arrow pointing right" />
              </Button>
            </>
          ) : (
            <>
              <h1>{t('forget-password.after-password.title')}</h1>
              <h3>{t('forget-password.after-password.subtitle')}</h3>
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

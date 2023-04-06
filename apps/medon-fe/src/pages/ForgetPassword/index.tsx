import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';

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

  const handleSentEmail: SubmitHandler<SubmitSendEmail> = (data) => {
    // logic to send email
    setIsEmailSent(true);
  };

  return (
    <Container>
      <Header>
        <img src={Logo} alt="medon logo" draggable={false} />
      </Header>
      <Content>
        <Form onSubmit={handleSubmit(handleSentEmail)}>
          {!isEmailSent ? (
            <>
              <h1>{t('forget-password.send-email.title')}</h1>
              <h3>{t('forget-password.send-email.subtitle')}</h3>
              <Input
                placeholder="Email Address *"
                type="email"
                errorMessage={errors.email?.message}
                {...register('email')}
              />
              <Button
                bgcolor={theme.colors.blue_500}
                textcolor={theme.colors.white}
              >
                {t('forget-password.send-email.button')}
                <img src={RightArrow} alt="arrow pointing right" />
              </Button>
            </>
          ) : (
            <>
              <h1>{t('forget-password.after-email.title')}</h1>
              <h3>{t('forget-password.after-email.subtitle')}</h3>
              <Button
                bgcolor={theme.colors.blue_500}
                textcolor={theme.colors.white}
              >
                {t('forget-password.after-email.button')}
                <img src={RightArrow} alt="arrow pointing right" />
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

import { Button, CircularProgress } from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';

import { GoogleIcon } from '@/components/icons/GoogleIcon';
import {
  useAlert,
  useAppContext,
  useTranslations,
} from '@/contexts/AppContext';
import AuthService from '@/services/authService';
import Styles from './_Login.module.scss';
import ChatbotIcon from '@/components/icons/ChatbotIcon';

const Login = (props: {}) => {
  const t = useTranslations();
  const { setUser } = useAppContext();
  const navigate = useNavigate();
  const { setAlert } = useAlert();

  const [loading, setLoading] = useState<boolean>();

  const checkUserSession = useCallback(async () => {
    try {
      const userData = await AuthService.getCurrentUser();
      setUser(userData);
      setAlert(true, 'success', t.login.alerts.success.login);
      navigate('/chat');
    } catch (error) {
      setUser(null);
      setAlert(true, 'error', 'No active session found.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      const { auth_url } = await AuthService.getLoginUrl();
      const popup = window.open(
        auth_url,
        'google-login',
        'width=500,height=600',
      );

      const timer = setInterval(async () => {
        if (!popup || popup?.closed) {
          await checkUserSession().then(() => {
            clearInterval(timer);
          });
        }
      }, 1000);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setLoading(false);
    }
  }, [checkUserSession]);

  return (
    <div className={Styles.page__layout}>
      <div className={Styles.page__content}>
        <div className={Styles.login__card}>
          <div className={Styles.login__card_img}>
            <ChatbotIcon />
          </div>
          <div className={Styles.login__card_body}>
            <div className={Styles.login__card_title}>
              <h3>{t.login.labels.title}</h3>
            </div>
            <p className={Styles.login__card_description}>
              {t.login.labels.description}
            </p>
          </div>
          <div className={Styles.login__card_footer}>
            <Button
              disabled={loading}
              variant="outlined"
              color="primary"
              startIcon={
                loading ? (
                  <CircularProgress
                    size="1.5rem"
                    style={{ color: '#C0C0C0' }}
                  />
                ) : undefined
              }
              onClick={handleSubmit}
            >
              {!loading && <GoogleIcon />}
              {'  '}
              {loading ? t.login.labels.signingIn : t.login.labels.signIn}
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;

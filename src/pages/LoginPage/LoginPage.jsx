import LoginForm from '../../components/LoginForm/LoginForm';
import { loginThunk } from '../../redux/auth/operations';
import s from './LoginPage.module.css';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = async values => {
    try {
      await dispatch(loginThunk(values)).unwrap();
    } catch (error) {
      console.error('Error', error);
    }
  };

  const initialValues = {
    password: '',
    email: '',
  };

  return (
    <div className={s.loginPage}>
      <LoginForm onSubmit={handleSubmit} initialValues={initialValues} />
    </div>
  );
};

export default LoginPage;

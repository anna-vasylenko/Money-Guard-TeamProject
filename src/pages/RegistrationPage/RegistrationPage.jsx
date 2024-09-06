import RegistrationForm from '../../components/RegistrationForm/RegistrationForm.jsx';
// import s from './RegistrationPage.module.css';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/auth/operations.js';
// import { toast } from 'react-toastify';

const initialValues = {
  username: '',
  password: '',
  email: '',
  confirmPassword: '',
};
const RegistrationPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = ({ username, email, password }, { resetForm }) => {
    dispatch(registerThunk({ username, email, password })).unwrap();
    // .then(data => {
    //   toast.success(`Registration is success ${data.user.name}, welcome!`);
    // })
    // .catch(() => {
    //   toast.error('Invalid credentials');
    // });

    resetForm();
  };

  return (
    <RegistrationForm
      type="register"
      title="Registration"
      onSubmit={handleSubmit}
      initialValues={initialValues}
    />
  );
};

export default RegistrationPage;

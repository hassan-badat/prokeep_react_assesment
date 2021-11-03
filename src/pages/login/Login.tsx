import './login.css';
import LoginForm from '../../components/login/Form/Form';

const Login = () => {
  return (
    <div className='login__root'>
      <img src={'./prokeep_logo.png'} className='prokeep__logo' />
      <LoginForm />
    </div>
  );
};

export default Login;

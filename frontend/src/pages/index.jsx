import { useState } from 'react';
import Login from '../components/login';
import Register from '../components/register';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <h1>Você não precisa de senha, apenas um usuário e email</h1>
      <div>
        <button
          onClick={ () => { setIsLogin(!isLogin) } }
        >
          { isLogin ? 'Vá para Registro' : 'Vá para Login' }
        </button>
        { isLogin ? <Login /> : <Register /> }
      </div>
    </>
  )
}

import FirebaseAuth from '../Components/authentication/FirebaseAuth';
import '../styles/authentication.css';
import Image from 'next/image';

export default function Login() {
  return (
    <div className='auth'>
      <div className='auth-main'>
        <div className='soc-image'>
          <Image
            src='/Logo.png'
            alt='School of Code Logo'
            width={100}
            height={100}
          />
        </div>
        <h1>Platform Name Here</h1>
        <FirebaseAuth />
        {/* <button className='auth-buttons' onClick={login}>
          Login with GitHub
          <FaGithub />
        </button> */}
        <br />
        <br />
        {/* <button className='auth-buttons' onClick={signOut}>
          Sign Out
        </button> */}
      </div>
    </div>
  );
}

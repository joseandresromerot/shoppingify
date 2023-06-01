import classes from './index.module.css';
import { useRef } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

async function createUser(username, password, fullname) {
  const response = await fetch('/api/auth/signup', {
    method: "POST",
    body: JSON.stringify({username, password, fullname}),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Errooooor!");
  }

  return data;
}

const AuthPage = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const fullnameRef = useRef();

  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const fullname = !isLoginPage ? fullnameRef.current.value : "";

    //alert(`${username}:${password}:${fullname}`);

    if (isLoginPage) {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password
      });

      console.info('login result', result);

      if (!result.error) {
        router.replace("/");
      }
    } else {
      try {
        const result = await createUser(username, password, fullname);
        console.info(result);
      } catch(e) {
        console.info(e);
      }
    }
  }

  return (
    <div className={`${classes.mainContainer} ${quicksand.className}`}>
      <div className={classes.formContainer}>
        <form onSubmit={onSubmit}>
          <h2>{isLoginPage ? "Login" : "Create Account"}</h2>
          <label htmlFor='username'>Username</label>
          <input id='username' type='text' ref={usernameRef}/>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' ref={passwordRef}/>
          {!isLoginPage &&
            <>
              <label htmlFor='fullname'>Full Name</label>
              <input id='fullname' type='text' ref={fullnameRef}/>
            </>
          }
          <button>{isLoginPage ? "Login" : "Signup"}</button>
        </form>
        <button onClick={() => setIsLoginPage(!isLoginPage) }>{isLoginPage ? "Create Account" : "Back to Login"}</button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  return {
    props: { session: null }
  };
}

export default AuthPage;
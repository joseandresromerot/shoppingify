import classes from './index.module.css';
import { signIn, getSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { showMessage, hideMessage, showLoading } from '@/store/actions/messages';
import { Quicksand } from 'next/font/google';
import OutlinedTextfield from '@/components/ui/field/outlined-textfield';
import RoundedButton from '@/components/ui/button/rounded-button';
import TransparentButton from '@/components/ui/button/transparent-button';

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  async function onSubmit(event) {
    event.preventDefault();

    //alert(`${username}:${password}:${fullname}`);
    if (username.trim() === "") {
      dispatch(showMessage(
        "Enter your username",
        "Ok",
        () => {
          dispatch(hideMessage());
        },
        null,
        null
      ));
      return;
    }

    if (password.trim() === "") {
      dispatch(showMessage(
        "Enter your password",
        "Ok",
        () => {
          dispatch(hideMessage());
        },
        null,
        null
      ));
      return;
    }

    if (password.trim().length < 8) {
      dispatch(showMessage(
        "Password must have a minimum length of 8",
        "Ok",
        () => {
          dispatch(hideMessage());
        },
        null,
        null
      ));
      return;
    }

    if (isLoginPage) {
      dispatch(showLoading());

      const result = await signIn('credentials', {
        redirect: false,
        username,
        password
      });

      console.info('login result', result);

      if (!result.error) {
        dispatch(hideMessage());
        router.replace("/");
      } else {
        dispatch(hideMessage());
        dispatch(showMessage(
          result.error,
          "Ok",
          () => {
            dispatch(hideMessage());
          },
          null,
          null
        ));
      }
    } else {
      if (fullname.trim() === "") {
        dispatch(showMessage(
          "Enter your full name",
          "Ok",
          () => {
            dispatch(hideMessage());
          },
          null,
          null
        ));
        return;
      }

      try {
        dispatch(showLoading());
        const result = await createUser(username, password, fullname);
        dispatch(hideMessage());

        dispatch(showMessage(
          result.message,
          "Ok",
          () => {
            dispatch(hideMessage());
          },
          null,
          null
        ));

        if (result.success === true) {
          setUsername("");
          setPassword("");
          setFullname("");
          setIsLoginPage(true);
        }
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
          <div className={classes.title}>{isLoginPage ? "Login" : "Create Account"}</div>
          <OutlinedTextfield type='text' placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <OutlinedTextfield type='password' placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {!isLoginPage &&
              <OutlinedTextfield type='text' placeholder="Full Name" value={fullname} onChange={e => setFullname(e.target.value)} />
          }
          <RoundedButton className={classes.submitButton}>{isLoginPage ? "Login" : "Signup"}</RoundedButton>
        </form>
        <TransparentButton className={classes.secondaryButton} onClick={() => setIsLoginPage(!isLoginPage) }>{isLoginPage ? "Create Account" : "Back to Login"}</TransparentButton>
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
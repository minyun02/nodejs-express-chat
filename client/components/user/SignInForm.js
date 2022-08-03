import { useRef } from "react";
import Card from '../ui/Card';
import Text from "../ui/Text";
import classes from './SignUpForm.module.css';

function SignInForm(props) {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

  
    function submitHandler(event) {
      event.preventDefault();
  
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

  
      const signInData = {
        email: enteredEmail,
        password: enteredPassword,
      };
  
      props.onAddUser(signInData);
    }
  
    return (
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.title}>로그인</div>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='text' required id='title' ref={emailInputRef} placeholder={'이메일을 입력해주세요.'}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' required id='password' ref={passwordInputRef} placeholder={'비밀번호를 입력해주세요.'}/>
          </div>
          <Text>비밀번호 찾기</Text>
          <div className={classes.actions}>
            <button>Sign In</button>
          </div>
          <div className={classes.textWrap}>
            <a className={classes.text} href='/'>뒤로가기</a>
          </div>
        </form>
      </Card>
    );
  }
  
  export default SignInForm;
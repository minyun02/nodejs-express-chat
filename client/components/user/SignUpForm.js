import { useRef } from "react";
import Card from '../ui/Card';
import classes from './SignUpForm.module.css';

function SignUpForm(props) {
    const emailInputRef = useRef();
    const nickInputRef = useRef();
    const passwordInputRef = useRef();
    const phoneInputRef = useRef();
  
    function submitHandler(event) {
      event.preventDefault();
  
      const enteredEmail = emailInputRef.current.value;
      const enteredNick = nickInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredPhone = phoneInputRef.current.value;
  
      const signUpData = {
        email: enteredEmail,
        nick: enteredNick,
        password: enteredPassword,
        phone: enteredPhone,
      };
  
      props.onAddUser(signUpData);
    }
  
    return (
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='text' required id='title' ref={emailInputRef} placeholder={'이메일을 입력해주세요.'}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='nick'>Nickname</label>
            <input type='text' required id='image' ref={nickInputRef} placeholder={'닉네임을 입력해주세요.'}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' required id='password' ref={passwordInputRef} placeholder={'비밀번호를 입력해주세요.'}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='phone'>Phone</label>
            <input type='number' required id='phone' ref={phoneInputRef} placeholder={'휴대폰 번호를 입력해주세요. 예) 01012345678 '}/>
          </div>  
          <div className={classes.actions}>
            <button>Sign Up</button>
          </div>
        </form>
      </Card>
    );
  }
  
  export default SignUpForm;
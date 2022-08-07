import { useRef } from "react";
import Card from '../ui/Card';
import Text from "../ui/Text";
import classes from './SignUpForm.module.css';

function RoomForm(props) {
    const roomNameRef = useRef();
    const maxParticipantsRef = useRef();

  
    function submitHandler(event) {
      event.preventDefault();
  
      const newRoomName = roomNameRef.current.value;
      const newMaxParticipants = maxParticipantsRef.current.value;

  
      const createRoomData = {
        roomName: newRoomName,
        maxParticipants: newMaxParticipants,
      };
  
      props.onAddUser(createRoomData);
    }
  
    return (
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.title}>방 만들기</div>
          <div className={classes.control}>
            <label htmlFor='roomName'>이름</label>
            <input type='text' required id='roomName' ref={roomNameRef} placeholder={'방 이름을 입력해주세요.'}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='maxParticipants'>최대인원</label>
            <input type='number' required id='maxParticipants' ref={maxParticipantsRef} placeholder={'최대 인원 수를 입력해주세요.'}/>
          </div>
          <div className={classes.actions}>
            <button>save</button>
          </div>
          <div className={classes.textWrap}>
            <a className={classes.text} href='/'>뒤로가기</a>
          </div>
        </form>
      </Card>
    );
  }
  
  export default RoomForm;
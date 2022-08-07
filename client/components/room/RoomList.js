import RoomItem from './RoomItem';
import classes from './RoomList.module.css';

function Roomlist(props) {
  return (
    <ul className={classes.list}>
        <div className={classes.title}>전체 목록</div>  
      {props.roomItems.map((roomItem) => (
        <RoomItem
          key={roomItem.room_num}
          name={roomItem.room_name}
          owner={roomItem.owner}
          max_part={roomItem.max_participants}
          number_part={roomItem.number_participants}
          date={roomItem.reg_date}
        />
      ))}
    </ul>
  );
}

export default Roomlist;
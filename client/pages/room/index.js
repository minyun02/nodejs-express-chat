import RoomList from "../../components/room/RoomList";
// import Layout from "../components/layout/Layout";

function ChatList() {

    const DUMMY_ROOM = [
        {
          room_num: 1,
          room_name: 'a first chat room',
          max_participants: 4,
          number_participants: 2,
          owner: 'Jang',
          reg_date: '2022.08.07',
        },
        {
        room_num: 2,
        room_name: 'a second chat room',
        max_participants: 10,
        number_participants: 9,
        owner: 'Jang',
        reg_date: '2022.08.07',
        },
      ]

    return(
        <RoomList roomItems={DUMMY_ROOM} />
      );
}

export default ChatList;
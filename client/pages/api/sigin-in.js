import axios from 'axios';

axios.post("/sign-in", {
    password: password,
    email: email
}).then(function (response) {
    if(response.data.code == 0){
        setPopup({
            open: true,
            title: "Confirm",
            message: "로그인 성공!", 
            callback: function(){
                navigate("/");
            }
        });
    } else {
        let message = response.data.message;
        if(response.data.code == 10000){
            message = "이메일 또는 비밀번호가 올바르지 않습니다."
        }
        setPopup({
            open: true,
            title: "Error",
            message: message
        });
    }
}).catch(function (error) {
    console.log(error);
});
  
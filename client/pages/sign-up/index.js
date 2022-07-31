import SignUpForm from "../../components/user/SignUpForm";

function SignUp() {
    function addUserHandler(enteredsignUpData){
        console.log(enteredsignUpData);
    }

    return <SignUpForm onAddUser={addUserHandler} />
}

export default SignUp;
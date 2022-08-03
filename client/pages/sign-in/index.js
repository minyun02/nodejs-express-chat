import SignInForm from "../../components/user/SignInForm";

function SignIn() {
    function signInUserHandler(enteredsignInData){
        console.log(enteredsignInData);
    }

    return <SignInForm onLoginUser={signInUserHandler} />
}

export default SignIn;
<script>
    import Textfield from "../components/Textfield.svelte";
    import PasswordField from "../components/PasswordField.svelte";
    import { navigate } from "svelte-routing";
    import { isEmailValid, isPasswordValid } from "../utils";
    import { Backend } from "../backend";
    import { Nav } from "../navigation";
    import Logo from "../assets/Logo.svg"
    
    let email;
    let password;
    let passwordRepeated;

    let isSignUpPressed = false;

    function signInClicked() {
        navigate(Nav.SIGN_IN, { replace: true });
    }

    function signUpClicked() {
        const isPwdOk = isPasswordValid(password) && password === passwordRepeated
        if (isEmailValid(email) && isPwdOk) {
            Backend.signUp(email, password)
                .then(async response => {
                    if (response.ok) {
                        isSignUpPressed = true;
                    } 
                    else {
                        console.error("Failed to sign up");
                        console.error(response);
                        let error = response.text()
                        console.error(await error);
                        alert(await error);
                    }
                });
        }
    }
</script>

<form class="auth-container">
    <picture class="emblem">
        <img src="{Logo}" alt="" />
    </picture>

    {#if !isSignUpPressed}

    <Textfield
        type="text"
        labelContent={"Email"}
        bind:inputContent={email}
    />
    <PasswordField
        idIcon={"icon1"}
        idPassword={"passwordWrite"}
        labelContent={"Пароль"}
        bind:inputContent={password}
    />
    <PasswordField
        idIcon={"icon2"}
        idPassword={"passwordRepite"}
        labelContent={"Повторить пароль"}
        bind:inputContent={passwordRepeated}
    />
    
    <button class="btn__raised btn-primary" style="margin-top: 16px;" on:click|preventDefault={signUpClicked}>
        Зарегистрироваться
    </button>

    <div class="heading-with-lines">
        <span> или </span>
    </div>

    <button class="btn-secondary" on:click|preventDefault={signInClicked}>
        Войти
    </button>
    
    {:else}
        <p class="label">Чтобы завершить регистрацию, подтвердите свой аккаунт. На указанную почту отправлено письмо с дальнейшими указаниями.</p>
        <div class="btn-holder">
            <button class="btn__raised btn-primary" on:click|preventDefault={() => navigate(Nav.SIGN_IN, { replace: true })}>Вернуться</button>
        </div>
    {/if}

</form>

<style>
    .btn-holder {
        margin: 8px auto;
    }
</style>
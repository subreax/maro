<script>
    import Textfield from "../components/Textfield.svelte";
    import PasswordField from "../components/PasswordField.svelte";
    import { navigate } from "svelte-routing";
    import { isEmailValid, isPasswordValid } from "../utils";
    import { Backend } from "../backend";
    
    let email;
    let password;
    let passwordRepeated;

    function signInClicked() {
        navigate("/signin", { replace: true });
    }

    function signUpClicked() {
        const isPwdOk = isPasswordValid(password) && password === passwordRepeated
        if (isEmailValid(email) && isPwdOk) {
            Backend.register(email, password);
        }
    }
</script>

<form class="auth-container">
    <picture class="emblem">
        <img src="../assets/Logo.svg" alt="" />
    </picture>

    <Textfield
        type="text"
        labelContent={"Email или телефон"}
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
    
</form>

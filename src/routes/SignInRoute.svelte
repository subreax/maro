<script>
    import Textfield from "../components/Textfield.svelte";
    import PasswordField from "../components/PasswordField.svelte";
    import Checkbox from "../components/Checkbox.svelte";
    import { navigate, Link } from "svelte-routing";
    import { Backend } from "../backend";
    import { Nav } from "../navigation";
    import Logo from "../assets/Logo.svg"

    export let location;

    let remember;
    let login = ""
    let password = ""

    function signInClicked() {
        Backend.signIn(login, password, remember)
            .then(async isOk => {
                if (isOk) {
                    const isFirstSignIn = await Backend.isFirstSignIn();
                    console.log(`isFirstSignIn: ${isFirstSignIn}`)

                    if (isFirstSignIn) {
                        navigate(Nav.ENTER_USER_DETAILS, { replace: true });
                    }
                    else {
                        navigate(Nav.MAP, { replace: true });
                    }
                }
                else {
                    alert("Войти не удалось");
                    console.error("Failed to sign in");
                }
            });
    }

    function signUpClicked() {
        navigate(Nav.SIGN_UP)
    }
</script>

<form class="auth-container">
    <picture class="emblem">
        <img src="{Logo}" alt="" />
    </picture>

    <Textfield
        type="text"
        labelContent={"Email"}
        bind:inputContent={login}
    />
    <PasswordField
        idIcon={"icon1"}
        idPassword={"passwordWrite"}
        labelContent={"Пароль"}
        bind:inputContent={password}
    />

    <div class="row">
        <Checkbox checkboxContent="Запомнить меня" bind:status={remember} />
        <Link to={Nav.FORGOT_PWD} style="color: #E22C38; display: block; text-align: center" class="additional-button">Забыли пароль?</Link>
    </div>
    
    
    <button class="btn__raised btn-primary" on:click|preventDefault={() => signInClicked()}>
        Войти
    </button>

    <div class="heading-with-lines">
        <span> или </span>
    </div>

    <button class="btn-secondary" on:click|preventDefault={signUpClicked}>
        Зарегистрироваться
    </button>
    
    <Link to={Nav.MAP} style="color: #E22C38; display: block; text-align: center; margin-top: 16px;" class="additional-button">Продолжить как гость</Link>
</form>

<style>
    a:hover {
        text-decoration: underline;
    }
    
    .row {
        display: flex;
        justify-content: space-between;
        margin: 0 16px;
        margin-bottom: 16px;
        flex-wrap: wrap;
        gap: 16px;
    }

</style>

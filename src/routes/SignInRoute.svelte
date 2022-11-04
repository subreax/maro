<script>
    import Textfield from "../components/Textfield.svelte";
    import PasswordField from "../components/PasswordField.svelte";
    import Checkbox from "../components/Checkbox.svelte";

    let remember;
    let email;
    let password;

    function signInClicked() {
        // вход кликнут
    }

    function signUpClicked() {
        // регистрация кликнута
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

    <div class="row">
        <Checkbox checkboxContent="Запомнить меня" bind:status={remember} />
        <a href="#" style="color: #E22C38; display: block; text-align: center" class="additional-button">Забыли пароль?</a>
    </div>
    
    <button
        class="btn__raised btn-primary"
        on:click={(e) => {
            e.preventDefault();
            signInClicked();
        }}
    >
        Войти
    </button>

    <div class="heading-with-lines">
        <span> или </span>
    </div>

    <button
        class="btn-secondary"
        on:click={(e) => {
            e.preventDefault();
            signUpClicked();
        }}
    >
        Зарегистрироваться
    </button>
    
    <a href="#" style="color: #E22C38; display: block; text-align: center; margin-top: 16px;" class="additional-button">Продолжить как гость</a>
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

<script>
    // @ts-ignore
    // @ts-ignore
    import FormField from "@smui/form-field";
    import Button from "@smui/button";
    import { Label } from "@smui/common";
    import Textfield from "./components/Textfield.svelte";
    import PasswordField from "./components/PasswordField.svelte";
    import Checkbox from "./components/Checkbox.svelte";

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

<form class="container">
    <figure class="icon">
        <img src="../assets/Logo.svg" alt="" />
    </figure>
 
    <div class="fields">
        <div class="auth-field">
            <Textfield type="text" labelContent={"Email"} bind:inputContent={email}/>
        </div>
    
        <div class="auth-field">
            <PasswordField labelContent={"Пароль"} bind:inputContent={password}/>
        </div>
    
        <div class="group">
                <Checkbox checkboxContent="Запомнить меня" bind:status={remember}/>

                <a href="" class="forgot-password">Забыли пароль?</a>
        </div>
    </div>
    
    <div class="buttons">
        <Button
        variant="raised"
        class="button-shaped-round"
        on:click={(e) => {
            e.preventDefault();
            signInClicked();
        }}
    >
        <Label>Войти</Label>
    </Button>

    <div class="title">
        <span> или </span>
    </div>

    <Button
        variant="raised"
        class="button-shaped-round"
        on:click={(e) => {
            e.preventDefault();
            signUpClicked();
        }}
    >
        <Label>Регистрация</Label>
    </Button>
    </div>
    
</form>

<style>
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;

        height: 100vh;
        min-height: 700px;

        min-width: 300px;
        max-width: 500px;

        margin: 0 auto;
        padding: 0 32px;
    }

    .icon {
        margin: 0 auto;
        max-width: 160px;
        max-height: 160px;

        margin-bottom: 62px;
    }

    .auth-field {
        display: flex;
        flex-direction: column;
        margin-bottom: 40px;
        padding-right: 20px;
    }

    .group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        gap: 10px;
        padding: 0 57px 0 57px;
    }

    .forgot-password{
        text-decoration: none;
        color: #E22C38;
    }

    .buttons {
        margin-top: 40px;
    }

    .title {
        overflow: hidden;
        text-align: center;
        font-size: 20px;
    }

    .title span {
        /* Стили тега обертки для заголовков 
    ** в несколько строк */
        display: inline-block;
        vertical-align: middle;
    }

    .title:before,
    .title:after {
        content: "";
        display: inline-block;
        vertical-align: middle;
        width: 100%;
        height: 1px;
        background-color: #262626;
        position: relative;
    }

    .title::before {
        margin-left: -100%;
        left: -14px;
    }

    .title::after {
        margin-right: -100%;
        right: -14px;
    }
</style>

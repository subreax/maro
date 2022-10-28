<script>
    import Textfield from "@smui/textfield";
    import Checkbox from "@smui/checkbox";
    import FormField from "@smui/form-field";
    import Button from "@smui/button";
    import { Label } from "@smui/common";

    let remember = false;
    let email = "";
    let password = "";

    function signInClicked() {
        // вход кликнут
    }

    function signUpClicked() {
        // регистрация кликнута
    }
</script>

<form class="container">
    <figure class="icon">
        <img src="../public/vdnh_icon.jpg" alt="" />
    </figure>

    <div class="auth-field">
        <Textfield variant="outlined" bind:value={email} label="E-mail" />
    </div>

    <div class="auth-field">
        <Textfield variant="outlined" bind:value={password} label="Пароль" />
    </div>

    <div class="forgot-password">
        <Label><a href="#">Забыли пароль?</a></Label>
    </div>

    <div class="remember-me">
        <FormField>
            <Checkbox bind:checked={remember} />
            <span slot="label">Запомнить меня</span>
        </FormField>
    </div>

    <Button
        variant="raised"
        class="button-shaped-round"
        on:click={(e) => {e.preventDefault(); signInClicked(); }}>
        <Label>Войти</Label>
    </Button>

    <div>
        <h2><span>или</span></h2>
    </div>

    <Button
        variant="raised"
        class="button-shaped-round"
        on:click={(e) => { e.preventDefault(); signUpClicked(); }}>
        <Label>Регистрация</Label>
    </Button>
</form>

<style>
    * {
        margin: 0;
        padding: 0;
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
    }

    .forgot-password {
        margin-bottom: 10px;
    }

    .remember-me {
        margin-bottom: 10px;
    }

    h2 {
        margin: 20px 0 20px;
        text-align: center;
        border-bottom: 1px solid #000;
        line-height: 0.1em;

        font-weight: 400;
    }

    h2 span {
        background: #fff;
        padding: 10px;
        font-size: 1.2rem;
    }
</style>

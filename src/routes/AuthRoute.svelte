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

<form class="container">
    <figure class="emblem">
        <img src="/assets/Logo.svg" alt="" />
    </figure>

    <div class="fields">
        <div class="textfields">
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
        </div>

        <div class="additional-buttons">
            <Checkbox checkboxContent="Запомнить меня" bind:status={remember} />
            <a href="" style="color: #E22C38;" class="additional-button"
                >Забыли пароль?</a
            >
        </div>
    </div>

        <div class="buttons">
            <button
                class="btn__raised btn-primary"
                on:click={(e) => {
                    e.preventDefault();
                    signInClicked();
                }}
            >
                Войти
            </button>

            <div class="btn-guest__container">
                <a href="" style="color: #E22C38;" class="additional-button"
                    >Продолжить как гость</a
                >
            </div>

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
                Регистрация
            </button>
        </div>
</form>

<style>
    .fields {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;

        margin-top: 41px;
        gap: 30px;
    }

    .textfields {
        display: flex;
        flex-direction: column;

        gap: 35px;
    }

    .additional-buttons {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 40px;
        gap: 20px;
    }

    @media (max-width: 444px) {
        .additional-buttons {
            padding: 0px;
        }    
    }


    .buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-self: center;
        width: 370px;
        grid-row-gap: 20px;
        margin-top: 40px;
    }

    .btn-guest__container {
        display: flex;
        justify-content: center;
    }
</style>

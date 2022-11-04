<script>
    import Textfield from "../components/Textfield.svelte";
    import PasswordField from "../components/PasswordField.svelte";
    import Checkbox from "../components/Checkbox.svelte";

    let remember;
    let email;
    let password;
    let passwordRepeated;

    function signInClicked() {
        // вход кликнут
    }

    function signUpClicked() {
        // регистрация кликнута
    }
</script>

        <form class="container">
            <picture class="emblem">
                <img src="../assets/Logo.svg" alt="" />
            </picture>
        
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
                    <PasswordField
                        idIcon={"icon2"}
                        idPassword={"passwordRepite"}
                        labelContent={"Повторить пароль"}
                        bind:inputContent={passwordRepeated}
                    />
                </div>
        
                <div class="additional-buttons">
                    <Checkbox checkboxContent="Запомнить меня" bind:status={remember} />
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
                    Зарегистрироваться
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
                    Войти
                </button>
            </div>
        </form>



<style>
    .fields {
        display: flex;
        flex-direction: column;
        justify-content: center;

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
        justify-content: center;
    }

    .buttons {
        display: grid;
        justify-content: center;

        grid-row-gap: 20px;
        margin-top: 40px;
    }

    .btn-guest__container {
        display: flex;
        justify-content: center;
    }
</style>

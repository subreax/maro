<script>
    import { Backend } from "../backend";
    import { isEmailValid } from "../utils";
    import Textfield from "../components/Textfield.svelte";
    import { navigate } from "svelte-routing";

    export let location;

    let login;
    let isPasswordReset = false;

    let isEmailEntered = true;

    function resetPassword() {
        if (isEmailValid(login)) {
            Backend.resetPassword(login)
                .then((response) => {
                    if (response.ok) {
                        isPasswordReset = true;
                    } else {
                        console.log("Reset password failed");
                        console.log(response);
                    }
                });
        }
    }

    function goBack() {
        navigate("/signin", { replace: true });
    }

</script>

<form class="auth-container">
    <figure class="emblem">
        <img src="../assets/Logo.svg" alt="" />
    </figure>

    {#if !isPasswordReset} 
        <p class="label">Введите почту или номер телефона, который привязан к аккаунту</p>

        <Textfield type="text" labelContent={"Email или телефон"} bind:inputContent={login} />

        <div class="btn-holder">
            <button class="btn__raised btn-primary" 
            on:click|preventDefault={resetPassword}>
                Сбросить пароль
            </button>
        </div>
    {:else}
        <p class="label">Пароль сброшен. На указанную почту отправлено письмо с дальнейшими указаниями.</p>
        <div class="btn-holder">
            <button class="btn__raised btn-primary" 
            on:click|preventDefault={goBack}>
                Вернуться
            </button>
        </div>
    {/if}

</form>

<style>
    .label {
        text-align: center;
        font-size: 1.5rem;
        line-height: 1.5em;
        margin-bottom: 16px;

        color: #262626;
    }

    .btn-holder {
        margin: 8px auto;
    }
</style>
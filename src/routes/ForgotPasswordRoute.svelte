<script>
    import { Backend } from "../backend";
    import { isEmailValid } from "../utils";
    import Textfield from "../components/Textfield.svelte";
    import { navigate } from "svelte-routing";
    import { Nav } from "../navigation";
    import Logo from "../assets/Logo.svg"

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
        navigate(Nav.SIGN_IN, { replace: true });
    }

</script>

<form class="auth-container">
    <figure class="emblem">
        <img src="{Logo}" alt="" />
    </figure>

    {#if !isPasswordReset} 
        <p class="label">Введите почту, которая привязана к аккаунту</p>

        <Textfield type="text" labelContent={"Email"} bind:inputContent={login} />

        <div class="btn-holder">
            <button class="btn__raised btn-primary" 
            on:click|preventDefault={resetPassword}>
                Сбросить пароль
            </button>
        </div>
    {:else}
        <p class="label">Пароль сброшен. На указанную почту отправлено письмо с дальнейшими указаниями.</p>
        <div class="btn-holder">
            <button class="btn__raised btn-primary" on:click|preventDefault={goBack}>
                Вернуться
            </button>
        </div>
    {/if}
</form>

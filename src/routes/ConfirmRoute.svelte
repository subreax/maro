<script>
    import { Link, navigate } from "svelte-routing";
    import { Backend } from "../backend";
    import Textfield from "../components/Textfield.svelte";
    import Numberfield from "../components/Numberfield.svelte";
    import { parseGetParams } from "../utils"
    import { Nav } from "../navigation";
    import Logo from "../assets/Logo.svg"

    let userName;
    let userAge;

    export let location;
    $: params = parseGetParams(location.search);

    let hasErrors = true;

    function confirmRegistration() {
        Backend.confirmRegistration(params.userId, params.code)
            .then(async (response) => {
                if (response.ok) {
                    navigate(Nav.MAP, { replace: true });
                } else {
                    hasErrors = true;
                    console.log(await response.text());
                }
            });
    }

</script>

<form class="auth-container">
    <picture class="emblem">
        <img src="{Logo}" alt="" />
    </picture>

    {#if !hasErrors}
        <p class="label">
            Введите свои персональные данные
        </p>

        <Textfield 
            type="text"
            labelContent={"Ваше имя"}
            bind:inputContent={userName}
        />

        <Numberfield
            labelContent={"Ваш возраст"}
            bind:inputContent={userAge}
        />

        <button class="btn__raised btn-primary" style="margin-top: 8px;" on:click|preventDefault={confirmRegistration}>
            Подтвердить
        </button>
    {:else}
        <h2>Не удалось подтвердить аккаунт</h2>
        <Link to={Nav.SIGN_IN}>Назад</Link>
    {/if}
</form>

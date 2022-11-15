<script>
    import { Link, navigate } from "svelte-routing";
    import { Backend } from "../backend";
    import { parseGetParams } from "../utils"
    import { Nav } from "../navigation";
    import Logo from "../assets/Logo.svg"

    export let location;
    $: {
        const params = parseGetParams(location.search);
        Backend.confirmRegistration(params.userId, params.code)
            .then(async (response) => {
                if (response.ok) {
                    status = 1;
                }
                else {
                    status = 2;
                    console.error(await response.text());
                }
            });
    }

    let status = 1;
</script>

<form class="auth-container">
    <picture class="emblem">
        <img src="{Logo}" alt="" />
    </picture>

    {#if status === 1}
        <h2 class="label">Аккаунт успешно подтверждён</h2>
        <div class="btn-holder">
            <button class="btn__raised btn-primary" on:click|preventDefault={() => navigate(Nav.SIGN_IN, { replace: true })}>Войти</button>
        </div>
    {:else if status === 2}
        <h2 class="label">Не удалось подтвердить аккаунт</h2>
        <Link to={Nav.SIGN_IN}>
            Назад
        </Link>
    {/if}
</form>